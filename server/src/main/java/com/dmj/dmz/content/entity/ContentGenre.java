package com.dmj.dmz.content.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ContentGenre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;

    @ManyToOne
    @JoinColumn(name = "genre_id")
    private Genre genre;

    @Builder
    public ContentGenre(Content content, Genre genre) {
        this.content = content;
        this.genre = genre;
    }

    public static ContentGenre toEntity(Content content, Genre genre) {
        return ContentGenre.builder()
                .content(content)
                .genre(genre)
                .build();
    }
}
