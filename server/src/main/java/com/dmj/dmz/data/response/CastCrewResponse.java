package com.dmj.dmz.data.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

@Getter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class CastCrewResponse {
    private boolean adult;
    private int gender;
    private long id;
    private String knownForDepartment;
    private String name;
    private String originalName;
    private double popularity;
    private String profilePath;
    private int order;
}
