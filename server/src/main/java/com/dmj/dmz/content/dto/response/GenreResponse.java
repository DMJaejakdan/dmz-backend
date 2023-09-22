package com.dmj.dmz.content.dto.response;

import com.dmj.dmz.content.entity.ContentGenre;
import com.dmj.dmz.content.entity.Genre;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class GenreResponse {
    private Long tmdbId;
    private String name;

    @Builder
    public GenreResponse(ContentGenre contentGenre) {
        this.tmdbId = contentGenre.getGenre().getTmdbId();
        this.name = contentGenre.getGenre().getName();
    }
}
