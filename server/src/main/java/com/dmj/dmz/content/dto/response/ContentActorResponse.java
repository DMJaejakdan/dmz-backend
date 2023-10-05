package com.dmj.dmz.content.dto.response;


import com.dmj.dmz.person.entity.ContentActor;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ContentActorResponse {
    private Long id;
    private String nameKr;
    private String role;
    private String profilePath;

    public ContentActorResponse(ContentActor contentActor) {
        this.id = contentActor.getId();
        this.nameKr = contentActor.getPerson().getNameKr();
        this.role = contentActor.getRole();
        this.profilePath = contentActor.getPerson().getProfilePath();
    }
}
