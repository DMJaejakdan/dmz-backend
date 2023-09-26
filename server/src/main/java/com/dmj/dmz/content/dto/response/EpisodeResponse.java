package com.dmj.dmz.content.dto.response;

import com.dmj.dmz.content.entity.Episode;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class EpisodeResponse {
    private int nth;

    private String overview;

    public EpisodeResponse(Episode episode) {
        this.nth = episode.getNth();
        this.overview = episode.getOverview();
    }
}
