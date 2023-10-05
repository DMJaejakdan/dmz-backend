package com.dmj.dmz.person.dto.response;

import com.dmj.dmz.content.entity.Content;
import com.dmj.dmz.person.entity.ContentActor;
import com.dmj.dmz.person.entity.ContentCrew;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SimpleContentResponse {
    private long id;
    private String nameKr;
    private String posterPath;

    public SimpleContentResponse(ContentActor contentActor) {
        this.id = contentActor.getContent().getId();
        this.nameKr = contentActor.getContent().getNameKr();
        this.posterPath = contentActor.getContent().getPosterPath();
    }
    public SimpleContentResponse(ContentCrew contentCrew) {
        this.id = contentCrew.getContent().getId();
        this.nameKr = contentCrew.getContent().getNameKr();
        this.posterPath = contentCrew.getContent().getPosterPath();
    }
}
