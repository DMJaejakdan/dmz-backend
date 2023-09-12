package com.dmj.dmz.content.entity;

import com.dmj.dmz.data.response.MovieDetailResponse;
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

    private Integer runningTime;

    @Builder
    public MovieInfo(Content content, Long boxOffice, Integer runningTime) {
        this.content = content;
        this.boxOffice = boxOffice;
        this.runningTime = runningTime;
    }

    public static MovieInfo toEntity(Content content, MovieDetailResponse movieDetailResponse) {

        return MovieInfo.builder()
                .content(content)
                .runningTime(movieDetailResponse.getRuntime())
                .build();
    }
}
