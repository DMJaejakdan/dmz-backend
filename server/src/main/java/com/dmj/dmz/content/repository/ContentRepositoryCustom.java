package com.dmj.dmz.content.repository;

import com.dmj.dmz.content.dto.request.MovieSearchConditions;
import com.dmj.dmz.content.dto.response.ContentResponse;
import com.dmj.dmz.content.entity.Content;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface ContentRepositoryCustom {
    Page<ContentResponse> movieFindWithSearchConditions(Pageable pageable, final MovieSearchConditions movieSearchConditions);
    List<Content> findWithSearchConditionsFetchJoin(final String nameKr, final LocalDate sDate, final LocalDate eDate, final List<String> rating, final List<String> genre);
}
