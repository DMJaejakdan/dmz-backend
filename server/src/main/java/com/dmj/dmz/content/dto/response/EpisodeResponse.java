package com.dmj.dmz.content.dto.response;

import com.dmj.dmz.content.entity.DramaInfo;
import com.dmj.dmz.content.entity.Episode;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class EpisodeResponse {
    private int nth;

    private String overview;

    @QueryProjection
    @Builder
    public EpisodeResponse(Episode episode) {
        this.nth = episode.getNth();
        this.overview = episode.getOverview();
    }
}
