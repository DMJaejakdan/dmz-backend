package com.dmj.dmz.content.controller;

import com.dmj.dmz.content.dto.request.MovieSearchConditions;
import com.dmj.dmz.content.dto.response.ContentResponse;
import com.dmj.dmz.content.service.ContentService;
import com.dmj.dmz.util.dto.response.MultiResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.data.domain.Sort.Direction.DESC;

@RestController
@RequestMapping("/api/content")
public class ContentController {
    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping("/search/movie")
    public ResponseEntity<MultiResponse<ContentResponse>> searchMovie(MovieSearchConditions movieSearchConditions,
                                                                      Pageable pageable) {
        System.out.println(movieSearchConditions.toString());
        return ResponseEntity.ok(contentService.getMovieListResult(movieSearchConditions, pageable));
    }
}
