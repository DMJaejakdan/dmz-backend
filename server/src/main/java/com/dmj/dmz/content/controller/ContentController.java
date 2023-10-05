package com.dmj.dmz.content.controller;

import com.dmj.dmz.content.dto.request.ContentSearchConditions;
import com.dmj.dmz.content.dto.response.*;
import com.dmj.dmz.content.service.ContentService;
import com.dmj.dmz.data.response.GenresResponse;
import com.dmj.dmz.util.dto.response.MultiResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content")
public class ContentController {
    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping("/auto/genre")
    public ResponseEntity<List<GenreAutoResponse>> autoGenre(@RequestParam("genrePre") String genrePre) {
        return ResponseEntity.ok(contentService.genreStartWith(genrePre));
    }
    @GetMapping("/auto/person")
    public ResponseEntity<List<PersonAutoResponse>> autoPerson(@RequestParam("personPre") String personPre) {
        return ResponseEntity.ok(contentService.personStartWith(personPre));
    }
    @GetMapping("/auto/keyword")
    public ResponseEntity<List<KeywordAutoResponse>> autoKeyword(@RequestParam("keywordPre") String keywordPre) {
        return ResponseEntity.ok(contentService.keywordStartWith(keywordPre));
    }
    @GetMapping("/auto/company")
    public ResponseEntity<List<CompanyAutoResponse>> autoCompany(@RequestParam("companyPre") String companyPre) {
        return ResponseEntity.ok(contentService.companyStartWith(companyPre));
    }
    @GetMapping("/auto/channel")
    public ResponseEntity<List<ChannelAutoResponse>> autoChannel(@RequestParam("channelPre") String channelPre) {
        return ResponseEntity.ok(contentService.channelStartWith(channelPre));
    }
    // 시청 등급은 리스트 반환
    @GetMapping("/rating")
    public ResponseEntity<List<RatingResponse>> getRatings() {
        return ResponseEntity.ok(contentService.getRatings());
    }
    @GetMapping("/auto")
    public ResponseEntity<List<ContentAutoResponse>> autoComplete(@RequestParam("word") String word) {
        return ResponseEntity.ok(contentService.getContentAutoResult(word));
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
