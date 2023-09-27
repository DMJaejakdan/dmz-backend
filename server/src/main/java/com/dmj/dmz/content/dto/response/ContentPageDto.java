package com.dmj.dmz.content.dto.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class ContentPageDto {
    private long id;
    private String nameKr;
    private LocalDate releasedDate;
}
