package com.dmj.dmzdbtest.content.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MovieInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;

    private Long boxOffice;

    private Integer runningTile;

    @Builder
    public MovieInfo(Content content, Long boxOffice, Integer runningTile) {
        this.content = content;
        this.boxOffice = boxOffice;
        this.runningTile = runningTile;
    }
}
