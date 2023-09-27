package com.dmj.dmz.person.dto.response;

import com.dmj.dmz.person.entity.Person;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class PersonResponse {
    private Long tmdbId;

    private String nameKr;

    private String nameEn;

    private String profilePath;

    private LocalDate birth;

    private LocalDate death;

    // 0: not set, 1: 여, 2: 남
    private int gender;

    private String area;

    @QueryProjection
    @Builder
    public PersonResponse(Person person) {
        this.tmdbId = person.getTmdbId();
        this.nameKr = person.getNameKr();
        this.nameEn = person.getNameEn();
        this.profilePath = person.getProfilePath();
        this.birth = person.getBirth();
        this.death = person.getDeath();
        this.gender = person.getGender();
        this.area = person.getArea();
    }
}
