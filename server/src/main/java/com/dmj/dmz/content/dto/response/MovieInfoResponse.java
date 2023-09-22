package com.dmj.dmz.content.dto.response;

import com.dmj.dmz.content.entity.Content;
import com.dmj.dmz.content.entity.MovieInfo;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class MovieInfoResponse {
    private Long boxOffice;

    private Integer runningTime;

    @QueryProjection
    @Builder
    public MovieInfoResponse(MovieInfo movieInfo) {
        this.boxOffice = movieInfo.getBoxOffice();
        this.runningTime = movieInfo.getRunningTime();
    }
}
