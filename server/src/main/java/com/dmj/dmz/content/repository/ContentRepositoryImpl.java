package com.dmj.dmz.content.repository;

import com.dmj.dmz.content.dto.request.ContentSearchConditions;
import com.dmj.dmz.content.dto.response.*;
import com.dmj.dmz.content.entity.Content.ContentKind;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
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
        // 페이지 0시작 설정
        pageable = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), pageable.getSort());
        OrderSpecifier<?> sort = sortContent(pageable);
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(containsNameKr(contentSearchConditions.getNameKr()))
                .and(goeDate(contentSearchConditions.getSDate()))
                .and(loeDate(contentSearchConditions.getEDate()))
                .and(eqGenre(contentSearchConditions.getGenres()))
                .and(eqRating(contentSearchConditions.getRatings()))
                .and(containsPlot(contentSearchConditions.getPlot()))
                .and(eqKeyword(contentSearchConditions.getKeywords()))
                .and(eqCompany(contentSearchConditions.getCompanies()))
                .and(andPerson(contentSearchConditions.getPeople()))
                .and(eqChannel(contentSearchConditions.getChannels()))
                .and(eqKind(contentSearchConditions.getKind()));

        JPAQuery<ContentPageDto> jpaQuery = jpaQueryFactory.select(
                        Projections.fields(ContentPageDto.class,
                                content.id,
                                content.nameKr,
                                content.releasedDate)
                )
                .from(content);
        List<ContentPageDto> contentList = joinQueryFactory(jpaQuery, contentSearchConditions)
                .where(booleanBuilder)
                .distinct()
                .orderBy(sort)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        List<Long> contentIds = contentList.stream().map(ContentPageDto::getId).collect(Collectors.toList());
        List<ContentResponse> contentResponseList = jpaQueryFactory.selectFrom(content)
                .where(content.id.in(contentIds))
                .orderBy(sort)
                .transform(
                        groupBy(content.id).list(
                                Projections.constructor(ContentResponse.class, content)
                        )
                );
        JPAQuery<Long> longJPAQuery = jpaQueryFactory.select(content.id)
                .from(content);
        List<Long> countQuery = joinQueryFactory(longJPAQuery, contentSearchConditions)
                .where(booleanBuilder)
                .distinct()
                .fetch();
        return new PageImpl<>(contentResponseList, pageable, countQuery.size());
    }

    @Override
    public List<GenreAutoResponse> genreStartWith(String genrePre) {
        return jpaQueryFactory.select(
                        Projections.fields(GenreAutoResponse.class, genre.id, genre.name)
                )
                .from(genre)
                .where(genre.name.startsWith(genrePre))
                .orderBy(genre.name.asc())
                .limit(5)
                .fetch();
    }

    @Override
    public List<PersonAutoResponse> personStartWith(String personPre) {
        return jpaQueryFactory.select(
                        Projections.fields(PersonAutoResponse.class, person.id, person.nameKr, person.birth)
                )
                .from(person)
                .where(person.nameKr.startsWith(personPre))
                .orderBy(person.nameKr.asc())
                .limit(5)
                .fetch();
    }

    @Override
    public List<KeywordAutoResponse> keywordStartWith(String keywordPre) {
        return jpaQueryFactory.select(
                        Projections.fields(KeywordAutoResponse.class, keyword.id, keyword.word)
                )
                .from(keyword)
                .where(keyword.word.startsWith(keywordPre))
                .orderBy(keyword.word.asc())
                .limit(5)
                .fetch();
    }

    @Override
    public List<CompanyAutoResponse> companyStartWith(String companyPre) {
        return jpaQueryFactory.select(
                        Projections.fields(CompanyAutoResponse.class, company.id, company.name)
                )
                .from(company)
                .where(company.name.startsWith(companyPre))
                .orderBy(company.name.asc())
                .limit(5)
                .fetch();
    }

    @Override
    public List<RatingResponse> getRatings() {
        return jpaQueryFactory.select(
                        Projections.fields(RatingResponse.class, content.rating)
                )
                .from(content)
                .orderBy(content.rating.asc())
                .distinct()
                .fetch();
    }

    @Override
    public List<ChannelAutoResponse> channelStartWith(String channelPre) {
        return jpaQueryFactory.select(
                        Projections.fields(ChannelAutoResponse.class, dramaInfo.channel)
                )
                .from(dramaInfo)
                .where(dramaInfo.channel.startsWith(channelPre))
                .orderBy(dramaInfo.channel.asc())
                .limit(5)
                .distinct()
                .fetch();
    }

    private <T> JPAQuery<T> joinQueryFactory(JPAQuery<T> jpaQuery, ContentSearchConditions contentSearchConditions) {
        if (contentSearchConditions.getGenres() != null) {
            jpaQuery.leftJoin(content.contentGenreList, contentGenre)
                    .leftJoin(contentGenre.genre, genre);
        }
        if (contentSearchConditions.getPeople() != null) {
            jpaQuery.leftJoin(content.contentCrewList, contentCrew)
                    .leftJoin(contentCrew.person, person)
                    .leftJoin(content.contentActorList, contentActor)
                    .leftJoin(contentActor.person, person);
        }
        if (contentSearchConditions.getKeywords() != null) {
            jpaQuery.leftJoin(content.contentKeywordList, contentKeyword)
                    .leftJoin(contentKeyword.keyword, keyword);
        }
        if (contentSearchConditions.getCompanies() != null) {
            jpaQuery.leftJoin(content.contentCompanyList, contentCompany)
                    .leftJoin(contentCompany.company, company);
        }
        if (contentSearchConditions.getChannels() != null) {
            jpaQuery.leftJoin(content.dramaInfo, dramaInfo);
        }
        return jpaQuery;
    }

    private BooleanExpression eqKind(final ContentKind contentKind) {
        if (contentKind == null) {
            return null;
        }
        return content.kind.eq(contentKind);
    }

    private BooleanExpression containsNameKr(final String nameKr) {
        if (!StringUtils.hasText(nameKr)) {
            return null;
        }
        return content.nameKr.contains(nameKr);
    }

    private BooleanExpression goeDate(final String sDate) {
        if (sDate == null) {
            return null;
        }
        return content.releasedDate.goe(LocalDate.parse(sDate));
    }

    private BooleanExpression loeDate(final String eDate) {
        if (eDate == null) {
            return null;
        }
        return content.releasedDate.loe(LocalDate.parse(eDate));
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

        for (String p : people) {
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

    private OrderSpecifier<?> sortContent(Pageable pageable) {
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
