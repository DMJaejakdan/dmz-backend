package com.dmj.dmz.content.service;

import com.dmj.dmz.content.dto.request.ContentSearchConditions;
import com.dmj.dmz.content.dto.response.DramaDetailResponse;
import com.dmj.dmz.content.dto.response.MovieDetailResponse;
import com.dmj.dmz.content.dto.response.ContentResponse;
import com.dmj.dmz.content.repository.ContentRepository;
import com.dmj.dmz.util.dto.response.MultiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
public class ContentService {
    private final ContentRepository contentRepository;

    public ContentService(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    public MultiResponse<ContentResponse> getContentListResult(ContentSearchConditions contentSearchConditions, Pageable pageable) {

        return new MultiResponse<>(contentRepository.contentFindWithSearchConditions(pageable, contentSearchConditions));
    }

    @Transactional(readOnly = true)
    public MovieDetailResponse getMovieDetail(long contentId) {
        return new MovieDetailResponse(contentRepository.findById(contentId).orElseThrow());
    }

    @Transactional(readOnly = true)
    public DramaDetailResponse getDramaDetail(long contentId) {
        return new DramaDetailResponse(contentRepository.findById(contentId).orElseThrow());
    }
}
