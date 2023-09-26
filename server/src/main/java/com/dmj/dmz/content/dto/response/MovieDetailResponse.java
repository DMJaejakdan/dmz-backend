package com.dmj.dmz.content.dto.response;

import com.dmj.dmz.content.entity.Content;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MovieDetailResponse {
    private String nameKr;
    private List<ContentActorResponse> contentActorResponses;
    private List<ContentCrewResponse> contentCrewResponses;
    private Integer runningTime;
    private List<String> companies;
    private List<String> keywords;
    private List<String> genres;
    private LocalDate releasedDate;
    private String rating;
    private Long boxOffice;
    private String posterPath;

    public MovieDetailResponse(Content content) {
        this.nameKr = content.getNameKr();
        this.contentActorResponses = content.getContentActorList().stream().map(ContentActorResponse::new).collect(Collectors.toList());
        this.contentCrewResponses = content.getContentCrewList().stream().map(ContentCrewResponse::new).collect(Collectors.toList());
        this.runningTime = content.getMovieInfo().get(0).getRunningTime();
        this.companies = content.getContentCompanyList().stream().map(c -> c.getCompany().getName()).collect(Collectors.toList());
        this.keywords = content.getContentKeywordList().stream().map(k -> k.getKeyword().getWord()).collect(Collectors.toList());
        this.genres = content.getContentGenreList().stream().map(g -> g.getGenre().getName()).collect(Collectors.toList());
        this.releasedDate = content.getReleasedDate();
        this.rating = content.getRating();
        this.boxOffice = content.getMovieInfo().get(0).getBoxOffice();
        this.posterPath = content.getPosterPath();
    }
}
