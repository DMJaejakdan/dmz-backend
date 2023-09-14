package com.dmj.dmz.content.repository;

import com.dmj.dmz.content.entity.Content;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static com.dmj.dmz.content.entity.QContent.content;

@RequiredArgsConstructor
public class ContentRepositoryImpl implements ContentRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;
    @Override
    public List<Content> findByNameKrLike(String nameKr) {
        return jpaQueryFactory.selectFrom(content)
                .where((content.nameKr.like("%" + nameKr + "%")))
                .fetch();
    }
}
