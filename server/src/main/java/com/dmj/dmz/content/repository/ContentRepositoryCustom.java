package com.dmj.dmz.content.repository;

import com.dmj.dmz.content.dto.request.ContentSearchConditions;
import com.dmj.dmz.content.dto.response.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ContentRepositoryCustom {
    Page<ContentResponse> contentFindWithSearchConditions(Pageable pageable, final ContentSearchConditions contentSearchConditions);
    List<GenreAutoResponse> genreStartWith(final String genrePre);
    List<PersonAutoResponse> personStartWith(final String personPre);
    List<KeywordAutoResponse> keywordStartWith(final String keywordPre);
    List<CompanyAutoResponse> companyStartWith(final String companyPre);
    List<ChannelAutoResponse> channelStartWith(final String channelPre);
    List<RatingResponse> getRatings();
}
