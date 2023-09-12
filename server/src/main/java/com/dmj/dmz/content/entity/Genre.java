package com.dmj.dmz.content.entity;

import com.dmj.dmz.data.response.GenreResponse;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tmdbId;

    @Column(nullable = false)
    private String name;

    @Builder
    public Genre(Long tmdbId, String name) {
        this.tmdbId = tmdbId;
        this.name = name;
    }

    public static Genre toEntity(GenreResponse genreResponse) {
        return Genre.builder()
                .tmdbId(genreResponse.getId())
                .name(genreResponse.getName())
                .build();
    }
}
