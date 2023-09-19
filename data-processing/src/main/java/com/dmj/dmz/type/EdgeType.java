package com.dmj.dmz.type;

public enum EdgeType {
    CONTENT_ACTOR("content-person", 0),
    CONTENT_CREW("content-person", 1),
    CONTENT_CONTENT("content-content", 2),
    PERSON_PERSON("person-person", 3);

    public final String label;
    public final long index;

    EdgeType(String label, long index) {
        this.label = label;
        this.index = index;
    }
}
