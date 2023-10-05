package com.dmj.dmz.content.service;

import com.dmj.dmz.content.dto.request.ContentSearchConditions;
import com.dmj.dmz.content.dto.response.*;
import com.dmj.dmz.content.repository.ContentRepository;
import com.dmj.dmz.util.dto.response.MultiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
public class ContentService {
    private final ContentRepository contentRepository;

    public ContentService(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }
    public List<GenreAutoResponse> genreStartWith(String genrePre) {
        return contentRepository.genreStartWith(genrePre);
    }
    public List<PersonAutoResponse> personStartWith(String personPre) {
        return contentRepository.personStartWith(personPre);
    }
    public List<KeywordAutoResponse> keywordStartWith(String keywordPre) {
        return contentRepository.keywordStartWith(keywordPre);
    }
    public List<CompanyAutoResponse> companyStartWith(String companyPre) {
        return contentRepository.companyStartWith(companyPre);
    }
    public List<RatingResponse> getRatings() {
        return contentRepository.getRatings();
    }
    public List<ChannelAutoResponse> channelStartWith(String channelPre) {
        return contentRepository.channelStartWith(channelPre);
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
