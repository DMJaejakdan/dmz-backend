package com.dmj.dmz.content.dto.response;

import com.dmj.dmz.content.entity.Content.ContentKind;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class ContentPageDto2 {
    private Long tmdbId;
    private String nameKr;
    private String nameEn;
    private ContentKind kind;
    private String posterPath;
    private LocalDate releasedDate;
    private String rating;
    private String plot;
    private String genre;
    private String role;
    private Long boxOffice;
    private Integer runningTime;
    private LocalDate endDate;
    private String channel;
}
