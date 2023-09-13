package com.dmj.dmz.content.repository;

import com.dmj.dmz.content.entity.Content;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.util.List;

import static com.dmj.dmz.content.entity.QContent.content;

public class ContentRepositoryImpl implements ContentRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    public ContentRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<Content> findByNameKrLike(String nameKr) {
        return jpaQueryFactory.selectFrom(content)
                .where((content.nameKr.like("%" + nameKr + "%")))
                .fetch();
    }
}
