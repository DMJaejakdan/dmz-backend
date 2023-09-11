package com.dmj.dmzdbtest.content.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ContentCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    @Builder
    public ContentCompany(Content content, Company company) {
        this.content = content;
        this.company = company;
    }

    public static ContentCompany toEntity(Content content, Company company) {
        return ContentCompany.builder()
                .content(content)
                .company(company)
                .build();
    }
}
