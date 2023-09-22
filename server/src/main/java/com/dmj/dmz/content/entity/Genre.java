package com.dmj.dmz.content.entity;

import com.dmj.dmz.data.response.GenreResponse;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
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
