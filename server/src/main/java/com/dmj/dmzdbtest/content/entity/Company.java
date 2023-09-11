package com.dmj.dmzdbtest.content.entity;

import com.dmj.dmzdbtest.data.response.ProductionCompanyResponse;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private Long tmdbId;

    @Builder
    public Company(String name, Long tmdbId) {
        this.name = name;
        this.tmdbId = tmdbId;
    }
    public static Company toEntity(ProductionCompanyResponse productionCompanyResponse) {
        return Company.builder()
                .name(productionCompanyResponse.getName())
                .tmdbId(productionCompanyResponse.getId())
                .build();
    }
}
