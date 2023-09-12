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
public class PersonDetailResponse {
    private boolean adult;
    private List<String> alsoKnownAs;
    private String biography;
    private String birthday;
    private String deathday;
    private String knownForDepartment;
    private String placeOfBirth;
    private double popularity;
}
