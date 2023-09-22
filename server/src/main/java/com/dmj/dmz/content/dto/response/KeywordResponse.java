package com.dmj.dmz.content.dto.response;

import com.dmj.dmz.data.response.KeywordsResultResponse;
import com.dmj.dmz.keyword.entity.Keyword;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class KeywordResponse {
    private Long tmdbId;

    private String name;

    @QueryProjection
    @Builder
    public KeywordResponse(Keyword keyword) {
        this.tmdbId = keyword.getTmdbId();
        this.name = keyword.getWord();
    }
}
