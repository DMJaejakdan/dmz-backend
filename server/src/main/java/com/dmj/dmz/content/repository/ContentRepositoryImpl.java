package com.dmj.dmz.content.repository;

import com.dmj.dmz.content.entity.Content;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.List;

import static com.dmj.dmz.content.entity.QContent.content;

@RequiredArgsConstructor
public class ContentRepositoryImpl implements ContentRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Content> findByNameKrLike(String nameKr) {
        return jpaQueryFactory.selectFrom(content)
                .where((content.nameKr.contains(nameKr)))
                .fetch();
    }

    @Override
    public List<Content> findWithSearchConditions(String nameKr, LocalDate sDate, LocalDate eDate, List<String> rating, List<String> genre) {
        return jpaQueryFactory.selectFrom(content)
                .where()
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
    private BooleanExpression inGenre(final List<String> genre) {
        if (genre == null) {
            return null;
        }
        return null;
    }
}
