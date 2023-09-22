package com.dmj.dmz.keyword.entity;

import com.dmj.dmz.data.response.KeywordsResultResponse;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Keyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tmdbId;

    @Column(nullable = false)
    private String word;

    @Builder
    public Keyword(Long tmdbId, String word) {
        this.tmdbId = tmdbId;
        this.word = word;
    }

    public static Keyword toEntity(KeywordsResultResponse keywordsResultResponse) {
        return Keyword.builder()
                .tmdbId(keywordsResultResponse.getId())
                .word(keywordsResultResponse.getName())
                .build();
    }
}
