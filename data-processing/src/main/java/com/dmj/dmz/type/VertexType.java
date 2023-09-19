package com.dmj.dmz.type;

public enum VertexType {
    CONTENT("content", 0),
    PERSON("person", 1);

    public final String label;
    public final long index;

    VertexType(String label, long index) {
        this.label = label;
        this.index = index;
    }
}
