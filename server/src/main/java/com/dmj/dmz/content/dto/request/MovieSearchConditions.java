package com.dmj.dmz.content.dto.request;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
public class MovieSearchConditions {
    String nameKr;
    LocalDate sDate;
    LocalDate eDate;
    List<String> ratings;
    List<String> genres;
    String plot;
    List<String> keywords;
    List<String> companies;
}
