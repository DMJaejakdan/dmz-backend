package com.dmj.dmz.content.dto.response;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class PersonAutoResponse {
    private long id;
    private String nameKr;
    private LocalDate birth;
}
