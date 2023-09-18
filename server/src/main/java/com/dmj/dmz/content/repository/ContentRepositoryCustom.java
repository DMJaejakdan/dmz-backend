package com.dmj.dmz.content.repository;

import com.dmj.dmz.content.entity.Content;

import java.time.LocalDate;
import java.util.List;

public interface ContentRepositoryCustom {
    List<Content> findByNameKrLike(String nameKr);

    List<Content> findWithSearchConditions(final String nameKr, final LocalDate sDate, final LocalDate eDate, final List<String> rating, final List<String> genre);
}
