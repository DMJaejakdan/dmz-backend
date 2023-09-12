package com.dmj.dmz.data.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import java.util.List;

@Getter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class MovieDramaResultResponse {
    String backdropPath;
    List<Integer> genreIds;
    int id;
    String overview;
    double popularity;
    String posterPath;
    String originalLanguage;
}
