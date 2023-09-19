package com.dmj.dmz.processing;

import lombok.Data;

import java.util.Set;

@Data
public class Content {
    private Long id;
    private Set<Long> genres;
    private Set<Long> keywords;

    public Content(Long id, Set<Long> genres, Set<Long> keywords) {
        this.id = id;
        this.genres = genres;
        this.keywords = keywords;
    }
}
