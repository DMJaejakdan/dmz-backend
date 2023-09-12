package com.dmj.dmz.person.entity;

import com.dmj.dmz.content.entity.Content;
import com.dmj.dmz.data.response.CrewResponse;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ContentCrew {
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
    public ContentCrew(Content content, Person person, String role) {
        this.content = content;
        this.person = person;
        this.role = role;
    }

    public static ContentCrew toEntity(Content content, Person person, CrewResponse c) {
        String role = "";
        if (content.getKind() == Content.ContentKind.DRAMA) {
            role = c.getJobs().get(0).getJob();
        } else {
            role = c.getJob();
        }
        return ContentCrew.builder()
                .content(content)
                .person(person)
                .role(role)
                .build();
    }
}
