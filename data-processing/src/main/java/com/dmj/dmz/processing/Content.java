package com.dmj.dmz.processing;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class Content {
    private Long id;
    private Set<String> genres = new HashSet<>();
    private Set<String> keywords = new HashSet<>();
}
