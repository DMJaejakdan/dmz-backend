package com.dmj.dmzdbtest.data.response;

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
public class DramaResultResponse {
    String backdropPath;
    String firstAirDate;
    List<Integer> genreIds;
    int id;
    String name;
    List<String> originCountry;
    String originalLanguage;
    String originalName;
    String overview;
    double popularity;
    String posterPath;
}
