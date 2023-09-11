package com.dmj.dmz.content.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Streaming {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;

    @ManyToOne
    @JoinColumn(name = "ott_id")
    private OttInfo ottInfo;

    @Column(nullable = false)
    private String url;

    @Builder
    public Streaming(Content content, OttInfo ottInfo, String url) {
        this.content = content;
        this.ottInfo = ottInfo;
        this.url = url;
    }
}
