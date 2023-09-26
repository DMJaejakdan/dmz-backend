package com.dmj.dmz.content.dto.response;

import com.dmj.dmz.content.entity.Content;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DramaDetailResponse {
    private String nameKr;
    private List<ContentActorResponse> contentActorResponses;
    private List<ContentCrewResponse> contentCrewResponses;
    private List<String> companies;
    private List<String> keywords;
    private List<String> genres;
    private String channel;
    private LocalDate releasedDate;
    private LocalDate endDate;
    private String rating;
    private String posterPath;
    private List<EpisodeResponse> episodeResponses;

    public DramaDetailResponse(Content content) {
        this.nameKr = content.getNameKr();
        this.contentActorResponses = content.getContentActorList().stream().map(ContentActorResponse::new).collect(Collectors.toList());
        this.contentCrewResponses = content.getContentCrewList().stream().map(ContentCrewResponse::new).collect(Collectors.toList());
        this.companies = content.getContentCompanyList().stream().map(c -> c.getCompany().getName()).collect(Collectors.toList());
        this.keywords = content.getContentKeywordList().stream().map(k -> k.getKeyword().getWord()).collect(Collectors.toList());
        this.genres = content.getContentGenreList().stream().map(g -> g.getGenre().getName()).collect(Collectors.toList());
        this.channel = content.getDramaInfo().get(0).getChannel();
        this.releasedDate = content.getReleasedDate();
        this.endDate = content.getDramaInfo().get(0).getEndDate();
        this.rating = content.getRating();
        this.posterPath = content.getPosterPath();
        this.episodeResponses = content.getDramaInfo().get(0).getEpisodeList().stream().map(EpisodeResponse::new).collect(Collectors.toList());
    }
}
