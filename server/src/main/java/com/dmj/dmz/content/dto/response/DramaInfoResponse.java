package com.dmj.dmz.content.dto.response;

import com.dmj.dmz.content.entity.Content;
import com.dmj.dmz.content.entity.DramaInfo;
import com.dmj.dmz.data.response.DramaDetailResponse;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class DramaInfoResponse {

    private LocalDate endDate;

    private String channel;

    @QueryProjection
    @Builder
    public DramaInfoResponse(DramaInfo dramaInfo) {
        this.endDate = dramaInfo.getEndDate();
        this.channel = dramaInfo.getChannel();
    }
}

