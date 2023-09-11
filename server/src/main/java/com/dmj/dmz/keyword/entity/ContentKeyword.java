package com.dmj.dmz.keyword.entity;

import com.dmj.dmz.content.entity.Content;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ContentKeyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;

    @ManyToOne
    @JoinColumn(name = "keyword_id")
    private Keyword keyword;

    @Builder
    public ContentKeyword(Content content, Keyword keyword) {
        this.content = content;
        this.keyword = keyword;
    }

    public static ContentKeyword toEntity(Content content, Keyword keyword) {
        return ContentKeyword.builder()
                .content(content)
                .keyword(keyword)
                .build();
    }
}
