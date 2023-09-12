package com.dmj.dmz.person.entity;

import com.dmj.dmz.content.entity.Content;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ContentPerson {
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
    public ContentPerson(Content content, Person person) {
        this.content = content;
        this.person = person;
        this.role = person.getArea();
    }

    public static ContentPerson toEntity(Content content, Person person) {
        return ContentPerson.builder()
                .content(content)
                .person(person)
                .build();
    }
}
