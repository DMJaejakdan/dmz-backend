package com.dmj.dmz.content.service;

import com.dmj.dmz.content.dto.request.MovieSearchConditions;
import com.dmj.dmz.content.dto.response.ContentResponse;
import com.dmj.dmz.content.entity.Content;
import com.dmj.dmz.content.repository.ContentRepository;
import com.dmj.dmz.util.dto.response.MultiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ContentService {
    private final ContentRepository contentRepository;

    public ContentService(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    public MultiResponse<ContentResponse> getMovieListResult(MovieSearchConditions movieSearchConditions, Pageable pageable) {

        return new MultiResponse<>(contentRepository.movieFindWithSearchConditions(pageable, movieSearchConditions));
    }
}
