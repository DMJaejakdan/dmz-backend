package com.dmj.dmzdbtest.person.entity;

import com.dmj.dmzdbtest.content.entity.Content;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ContentActor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;

    @ManyToOne
    @JoinColumn(name = "person_id")
    private Person person;

    @Column(nullable = false)
    private String role;

    @Builder
    public ContentActor(Content content, Person person, String role) {
        this.content = content;
        this.person = person;
        this.role = role;
    }
}
