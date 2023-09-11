package com.dmj.dmzdbtest.content.entity;

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
}
