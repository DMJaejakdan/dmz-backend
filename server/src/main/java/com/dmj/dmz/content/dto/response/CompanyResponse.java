package com.dmj.dmz.content.dto.response;

import com.dmj.dmz.content.entity.Company;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class CompanyResponse {
    private String name;

    private Long tmdbId;

    @QueryProjection
    @Builder
    public CompanyResponse(Company company) {
        this.name = company.getName();
        this.tmdbId = company.getTmdbId();
    }
}
