package com.dmj.dmz.person.dto.response;

import com.dmj.dmz.person.entity.Person;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonDetailResponse {
    private String nameKr;
    private Integer gender;
    private String profilePath;
    private LocalDate birth;
    private LocalDate death;
    private String area;
    private List<SimpleContentResponse> simpleContentResponses;

    public PersonDetailResponse(Person person) {
        this.nameKr = person.getNameKr();
        this.gender = person.getGender();
        this.profilePath = person.getProfilePath();
        this.birth = person.getBirth();
        this.death = person.getDeath();
        this.area = person.getArea();
        if (this.area.equals("Acting")) {
            this.simpleContentResponses = person.getContentActors().stream().map(SimpleContentResponse::new).collect(Collectors.toList());
        } else {
            this.simpleContentResponses = person.getContentCrews().stream().map(SimpleContentResponse::new).collect(Collectors.toList());
        }
    }
}
