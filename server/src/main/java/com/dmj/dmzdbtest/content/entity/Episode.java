package com.dmj.dmzdbtest.content.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Episode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "drama_info_id")
    private DramaInfo dramaInfo;

    @Column(nullable = false)
    private int nth;

    @Column(length = 5000)
    private String overview;

    @Builder
    public Episode(DramaInfo dramaInfo, int nth, String overview) {
        this.dramaInfo = dramaInfo;
        this.nth = nth;
        this.overview = overview;
    }
}
