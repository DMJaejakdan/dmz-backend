package com.dmj.dmz.data.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class DramaDetailResponse extends MovieDramaDetailResponse{
    private String lastAirDate;
    private List<NetworkResponse> networks;
    private ContentRatingsResponse contentRatings;
    private CreditsResponse aggregateCredits;
    private int numberOfEpisodes;
    private int numberOfSeasons;
}
