package com.dmj.dmz.content.controller;

import com.dmj.dmz.content.dto.request.ContentSearchConditions;
import com.dmj.dmz.content.dto.response.ContentResponse;
import com.dmj.dmz.content.service.ContentService;
import com.dmj.dmz.util.dto.response.MultiResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/content")
public class ContentController {
    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping("/search/movie")
    public ResponseEntity<MultiResponse<ContentResponse>> searchMovie(ContentSearchConditions contentSearchConditions,
                                                                      Pageable pageable) {
        System.out.println(contentSearchConditions.toString());
        return ResponseEntity.ok(contentService.getMovieListResult(contentSearchConditions, pageable));
    }
}
