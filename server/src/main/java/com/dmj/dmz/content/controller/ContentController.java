package com.dmj.dmz.content.controller;

import com.dmj.dmz.content.dto.request.ContentSearchConditions;
import com.dmj.dmz.content.dto.response.DramaDetailResponse;
import com.dmj.dmz.content.dto.response.MovieDetailResponse;
import com.dmj.dmz.content.dto.response.ContentResponse;
import com.dmj.dmz.content.service.ContentService;
import com.dmj.dmz.util.dto.response.MultiResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/content")
public class ContentController {
    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping("/search")
    public ResponseEntity<MultiResponse<ContentResponse>> searchContents(ContentSearchConditions contentSearchConditions,
                                                                         Pageable pageable) {
        System.out.println(contentSearchConditions.toString());
        return ResponseEntity.ok(contentService.getContentListResult(contentSearchConditions, pageable));
    }

    @GetMapping("/movie/{content-id}")
    public ResponseEntity<MovieDetailResponse> getMovieDetail(@PathVariable("content-id") long contentId) {
        return ResponseEntity.ok(contentService.getMovieDetail(contentId));
    }
    @GetMapping("/drama/{content-id}")
    public ResponseEntity<DramaDetailResponse> getDramaDetail(@PathVariable("content-id") long contentId) {
        return ResponseEntity.ok(contentService.getDramaDetail(contentId));
    }
}
