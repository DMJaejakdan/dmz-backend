package com.dmj.dmz.content.dto.request;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
public class ContentSearchConditions {
    String nameKr;
    String sDate;
    String eDate;
    List<String> ratings;
    List<String> genres;
    String plot;
    List<String> keywords;
    List<String> companies;
    List<String> people;
    List<String> channels;
}
