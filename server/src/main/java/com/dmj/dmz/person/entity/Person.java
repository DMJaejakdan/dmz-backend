package com.dmj.dmz.person.entity;

import com.dmj.dmz.data.response.CastCrewResponse;
import com.dmj.dmz.data.response.CastResponse;
import com.dmj.dmz.data.response.PersonDetailResponse;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tmdbId;

    @Column(nullable = false)
    private String nameKr;

    @Column(nullable = false)
    private String nameEn;

    private String profilePath;

    private LocalDate birth;

    private LocalDate death;

    // 0: 남, 1: 여
    @Column(nullable = false)
    private int gender;

    @Column(nullable = false)
    private String area;

    @Builder
    public Person(Long tmdbId, String nameKr, String nameEn, String profilePath, LocalDate birth, LocalDate death, int gender, String area) {
        this.tmdbId = tmdbId;
        this.nameKr = nameKr;
        this.nameEn = nameEn;
        this.profilePath = profilePath;
        this.birth = birth;
        this.death = death;
        this.gender = gender;
        this.area = area;
    }

    public static Person toEntity(CastCrewResponse castCrewResponse, PersonDetailResponse personDetailResponse) {
        String birthDay= personDetailResponse.getBirthday();
        String deathDay = personDetailResponse.getDeathday();
        LocalDate birthLocalDate = null;
        LocalDate deathLocalDate = null;
        if (deathDay != null) {
            deathLocalDate = LocalDate.parse(deathDay);
        }
        if (birthDay != null) {
            birthLocalDate = LocalDate.parse(birthDay);
        }
        return Person.builder()
                .tmdbId(castCrewResponse.getId())
                .nameKr(castCrewResponse.getOriginalName())
                .nameEn(castCrewResponse.getName())
                .profilePath(castCrewResponse.getProfilePath())
                .birth(birthLocalDate)
                .death(deathLocalDate)
                .gender(castCrewResponse.getGender())
                .area(castCrewResponse.getKnownForDepartment())
                .build();
    }
}
