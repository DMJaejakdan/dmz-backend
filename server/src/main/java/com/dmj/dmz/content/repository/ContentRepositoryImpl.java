package com.dmj.dmz.content.repository;

import com.dmj.dmz.content.dto.request.ContentSearchConditions;
import com.dmj.dmz.content.dto.response.ContentResponse;
import com.dmj.dmz.content.entity.Content;
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
import java.util.stream.Collectors;

import static com.dmj.dmz.content.entity.QCompany.company;
import static com.dmj.dmz.content.entity.QContent.content;
import static com.dmj.dmz.content.entity.QContentCompany.contentCompany;
import static com.dmj.dmz.content.entity.QContentGenre.contentGenre;
import static com.dmj.dmz.content.entity.QDramaInfo.dramaInfo;
import static com.dmj.dmz.content.entity.QGenre.genre;
import static com.dmj.dmz.content.entity.QMovieInfo.movieInfo;
import static com.dmj.dmz.keyword.entity.QContentKeyword.contentKeyword;
import static com.dmj.dmz.keyword.entity.QKeyword.keyword;
import static com.dmj.dmz.person.entity.QContentActor.contentActor;
import static com.dmj.dmz.person.entity.QContentCrew.contentCrew;
import static com.dmj.dmz.person.entity.QPerson.person;
import static com.querydsl.core.group.GroupBy.groupBy;

@RequiredArgsConstructor
public class ContentRepositoryImpl implements ContentRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<ContentResponse> contentFindWithSearchConditions(Pageable pageable, ContentSearchConditions contentSearchConditions) {
        pageable = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), pageable.getSort());
        List<Content> contentList = jpaQueryFactory.select(content)
                .from(content)
                .leftJoin(content.contentGenreList, contentGenre)
                .leftJoin(contentGenre.genre, genre)
                .leftJoin(content.contentCrewList, contentCrew)
                .leftJoin(contentCrew.person, person)
                .leftJoin(content.contentActorList,contentActor)
                .leftJoin(contentActor.person,person)
                .leftJoin(content.contentKeywordList, contentKeyword)
                .leftJoin(contentKeyword.keyword, keyword)
                .leftJoin(content.contentCompanyList, contentCompany)
                .leftJoin(contentCompany.company, company)
                .leftJoin(content.movieInfo, movieInfo)
                .leftJoin(content.dramaInfo, dramaInfo)
                .where(
                        containsNameKr(contentSearchConditions.getNameKr()),
                        goeDate(LocalDate.parse(contentSearchConditions.getSDate())),
                        loeDate(LocalDate.parse(contentSearchConditions.getEDate())),
                        eqGenre(contentSearchConditions.getGenres()),
                        eqRating(contentSearchConditions.getRatings()),
                        containsPlot(contentSearchConditions.getPlot()),
                        eqKeyword(contentSearchConditions.getKeywords()),
                        eqCompany(contentSearchConditions.getCompanies()),
                        andPerson(contentSearchConditions.getPeople())
                )
                .distinct()
                .orderBy(sortMovie(pageable))
                // 내부는 0인데 실제는 1부터 시작이라 여기만 바꿔줌
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        List<Long> contentIds = contentList.stream().map(Content::getId).collect(Collectors.toList());
        List<ContentResponse> contentResponseList = jpaQueryFactory.selectFrom(content)
                .where(content.id.in(contentIds))
                .orderBy(sortMovie(pageable))
                .transform(
                        groupBy(content.id).list(
                                Projections.constructor(ContentResponse.class, content)
                        )
                );
        List<Long> countQuery = jpaQueryFactory.select(content.id)
                .from(content)
                .leftJoin(content.contentGenreList, contentGenre)
                .leftJoin(contentGenre.genre, genre)
                .leftJoin(content.contentCrewList, contentCrew)
                .leftJoin(contentCrew.person, person)
                .leftJoin(content.contentActorList,contentActor)
                .leftJoin(contentActor.person,person)
                .leftJoin(content.contentKeywordList, contentKeyword)
                .leftJoin(contentKeyword.keyword, keyword)
                .leftJoin(content.contentCompanyList, contentCompany)
                .leftJoin(contentCompany.company, company)
                .leftJoin(content.movieInfo, movieInfo)
                .leftJoin(content.dramaInfo, dramaInfo)
                .where(
                        containsNameKr(contentSearchConditions.getNameKr()),
                        goeDate(LocalDate.parse(contentSearchConditions.getSDate())),
                        loeDate(LocalDate.parse(contentSearchConditions.getEDate())),
                        eqGenre(contentSearchConditions.getGenres()),
                        eqRating(contentSearchConditions.getRatings()),
                        containsPlot(contentSearchConditions.getPlot()),
                        eqKeyword(contentSearchConditions.getKeywords()),
                        eqCompany(contentSearchConditions.getCompanies()),
                        andPerson(contentSearchConditions.getPeople())
                )
                .distinct()
                .fetch();
        return new PageImpl<>(contentResponseList, pageable, countQuery.size());

    }

    /* 비교용 쿼리 */
    @Override
    public List<Content> findWithSearchConditionsFetchJoin(String nameKr, String sDate, String eDate, List<String> ratingList, List<String> genreList) {
        return jpaQueryFactory.selectFrom(content)
                .leftJoin(content.contentGenreList, contentGenre)
                .fetchJoin()
                .leftJoin(contentGenre.genre, genre)
                .fetchJoin()
                .where(containsNameKr(nameKr))
                .distinct()
                .fetch();
    }

    private BooleanExpression containsNameKr(final String nameKr) {
        if (!StringUtils.hasText(nameKr)) {
            return null;
        }
        return content.nameKr.contains(nameKr);
    }

    private BooleanExpression goeDate(final LocalDate sDate) {
        if (sDate == null) {
            return null;
        }
        return content.releasedDate.goe(sDate);
    }

    private BooleanExpression loeDate(final LocalDate eDate) {
        if (eDate == null) {
            return null;
        }
        return content.releasedDate.loe(eDate);
    }

    private BooleanExpression eqGenre(final List<String> genres) {
        if (genres == null) {
            return null;
        }
        return genre.name.in(genres);
    }

    private BooleanExpression eqRating(final List<String> ratings) {
        if (ratings == null) {
            return null;
        }
        return content.rating.in(ratings);
    }

    private BooleanExpression eqKeyword(final List<String> keywords) {
        if (keywords == null) {
            return null;
        }
        return keyword.word.in(keywords);
    }

    private BooleanExpression containsPlot(final String plot) {
        if (plot == null) {
            return null;
        }
        return content.plot.contains(plot);
    }

    private BooleanExpression eqCompany(final List<String> companies) {
        if (companies == null) {
            return null;
        }
        return company.name.in(companies);
    }

    private BooleanBuilder andPerson(List<String> people) {
        if (people == null) {
            return null;
        }

        BooleanBuilder booleanBuilder = new BooleanBuilder();

        for (String p: people) {
            booleanBuilder.and(person.nameKr.eq(p));
        }

        return booleanBuilder;
    }

    private BooleanExpression eqChannel(List<String> channels) {
        if (channels == null) {
            return null;
        }
        return dramaInfo.channel.in(channels);
    }

    private OrderSpecifier<?> sortMovie(Pageable pageable) {
        if (!pageable.getSort().isEmpty()) {
            for (Sort.Order order : pageable.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                switch (order.getProperty()) {
                    case "nameKr":
                        return new OrderSpecifier<>(direction, content.nameKr);
                    case "releasedDate":
                        return new OrderSpecifier<>(direction, content.releasedDate);
                }
            }
        }
        return new OrderSpecifier<>(Order.DESC, content.releasedDate);
    }
}
