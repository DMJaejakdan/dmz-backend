package com.dmj.dmzdbtest.keyword.entity;

import com.dmj.dmzdbtest.data.response.KeywordsResultResponse;
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
    private String name;

    @Builder
    public Keyword(Long tmdbId, String name) {
        this.tmdbId = tmdbId;
        this.name = name;
    }

    public static Keyword toEntity(KeywordsResultResponse keywordsResultResponse) {
        return Keyword.builder()
                .tmdbId(keywordsResultResponse.getId())
                .name(keywordsResultResponse.getName())
                .build();
    }
}
