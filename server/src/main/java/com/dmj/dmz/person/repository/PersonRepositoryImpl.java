package com.dmj.dmz.person.repository;

import com.dmj.dmz.person.entity.dto.response.PersonResponse;
import com.dmj.dmz.person.entity.dto.request.PersonSearchConditions;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.List;

import static com.dmj.dmz.person.entity.QPerson.person;
import static com.querydsl.core.group.GroupBy.groupBy;

@RequiredArgsConstructor
public class PersonRepositoryImpl implements PersonRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<PersonResponse> personFindWithSearchConditions(Pageable pageable, PersonSearchConditions personSearchConditions) {
        pageable = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), pageable.getSort());
        List<PersonResponse> personResponseList = jpaQueryFactory.select(person.id)
                .from(person)
                .where(
                        containsNameKrPerson(personSearchConditions.getNameKr()),
                        orArea(personSearchConditions.getAreas()),
                        orGender(personSearchConditions.getGenders()),
                        orAge(personSearchConditions.getAges())
                )
                .orderBy(sortPerson(pageable))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .distinct()
                .transform(
                        groupBy(person.id).list(
                                Projections.constructor(PersonResponse.class, person)
                        )
                );
        List<Long> countQuery = jpaQueryFactory.select(person.id)
                .from(person)
                .where(
                        containsNameKrPerson(personSearchConditions.getNameKr()),
                        orArea(personSearchConditions.getAreas()),
                        orGender(personSearchConditions.getGenders()),
                        orAge(personSearchConditions.getAges())
                )
                .distinct()
                .fetch();
        return new PageImpl<>(personResponseList, pageable, countQuery.size());
    }

    private BooleanExpression containsNameKrPerson(String nameKr) {
        if (!StringUtils.hasText(nameKr)) {
            return null;
        }
        return person.nameKr.contains(nameKr);
    }

    private BooleanExpression orArea(List<String> areas) {
        if (areas == null) {
            return null;
        }
        return person.area.in(areas);
    }

    private BooleanExpression orGender(List<Integer> genders) {
        if (genders == null) {
            return null;
        }
        return person.gender.in(genders);
    }

    private BooleanBuilder orAge(List<Integer> ages) {
        if (ages == null) {
            return null;
        }
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        for (int a : ages) {
            booleanBuilder.or(person.birth.between(LocalDate.now().minusYears((a * 10L) + 9), LocalDate.now().minusYears(a * 10L)));
        }

        return booleanBuilder;
    }

    private OrderSpecifier<?> sortPerson(Pageable pageable) {
        if (!pageable.getSort().isEmpty()) {
            for (Sort.Order order : pageable.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                switch (order.getProperty()) {
                    case "nameKr":
                        return new OrderSpecifier<>(direction, person.nameKr);
                    case "birth":
                        return new OrderSpecifier<>(direction, person.birth);
                }
            }
        }
        return new OrderSpecifier<>(Order.ASC, person.nameKr);
    }
}
