package com.dmj.dmz.content.service;

import com.dmj.dmz.content.dto.request.ContentSearchConditions;
import com.dmj.dmz.content.dto.response.ContentResponse;
import com.dmj.dmz.content.repository.ContentRepository;
import com.dmj.dmz.util.dto.response.MultiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ContentService {
    private final ContentRepository contentRepository;

    public ContentService(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    public MultiResponse<ContentResponse> getMovieListResult(ContentSearchConditions contentSearchConditions, Pageable pageable) {

        return new MultiResponse<>(contentRepository.contentFindWithSearchConditions(pageable, contentSearchConditions));
    }
}
