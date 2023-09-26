package com.dmj.dmz.content.dto.response;


import com.dmj.dmz.person.entity.ContentCrew;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ContentCrewResponse {
    private String nameKr;
    private String role;
    private String profilePath;

    public ContentCrewResponse(ContentCrew contentCrew) {
        this.nameKr = contentCrew.getPerson().getNameKr();
        this.role = contentCrew.getRole();
        this.profilePath = contentCrew.getPerson().getProfilePath();
    }
}
