package com.dmj.dmz.content.entity;

import com.dmj.dmz.data.response.*;
import com.dmj.dmz.keyword.entity.ContentKeyword;
import com.dmj.dmz.person.entity.ContentActor;
import com.dmj.dmz.person.entity.ContentCrew;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tmdbId;

    private String nameKr;

    private String nameEn;

    @Enumerated(value = EnumType.STRING)
    private ContentKind kind;

    private String posterPath;

    private LocalDate releasedDate;

    //    @Enumerated(value = EnumType.STRING)
    private String rating;

    @Column(length = 5000)
    private String plot;

    @OneToMany(mappedBy = "content")
    private List<ContentGenre> contentGenreList;

    @OneToMany(mappedBy = "content")
    private List<ContentKeyword> contentKeywordList;
    @OneToMany(mappedBy = "content")
    private List<ContentCompany> contentCompanyList;

    @OneToMany(mappedBy = "content")
    private List<ContentActor> contentActorList;

    @OneToMany(mappedBy = "content")
    private List<ContentCrew> contentCrewList;
    // 실제로 하나임
    @OneToMany(mappedBy = "content")
    private List<DramaInfo> dramaInfo;


    // 실제로는 하나임
    @OneToMany(mappedBy = "content")
    private List<MovieInfo> movieInfo;

    @Builder
    public Content(long tmdbId, String nameKr, String nameEn, ContentKind kind, String posterPath, LocalDate releasedDate, String rating, String plot, List<ContentGenre> contentGenreList, List<ContentKeyword> contentKeywordList, List<ContentCompany> contentCompanyList, List<ContentActor> contentActorList, List<ContentCrew> contentCrewList, List<DramaInfo> dramaInfo, List<MovieInfo> movieInfo) {
        this.tmdbId = tmdbId;
        this.nameKr = nameKr;
        this.nameEn = nameEn;
        this.kind = kind;
        this.posterPath = posterPath;
        this.releasedDate = releasedDate;
        this.rating = rating;
        this.plot = plot;
        this.contentGenreList = contentGenreList;
        this.contentKeywordList = contentKeywordList;
        this.contentCompanyList = contentCompanyList;
        this.contentActorList = contentActorList;
        this.contentCrewList = contentCrewList;
        this.dramaInfo = dramaInfo;
        this.movieInfo = movieInfo;
    }

    public static Content toEntity(String flag, MovieDramaResultResponse result, MovieDramaDetailResponse movieDramaDetailResponse) {
        DramaDetailResponse dramaDetailResponse;
        MovieDetailResponse movieDetailResponse;
        DramaResultResponse dramaResultResponse;
        MovieResultResponse movieResultResponse;
        String KRRating = "";
        LocalDate releasedDate = null;
        ContentKind contentKind = null;
        String nameKR = "";
        String nameEn = "";
        if (flag.equals("D")) {
            contentKind = ContentKind.DRAMA;
            dramaDetailResponse = (DramaDetailResponse) movieDramaDetailResponse;
            dramaResultResponse = (DramaResultResponse) result;
            List<ContentResultsResponse> crr = dramaDetailResponse.getContentRatings().getResults();
            for (ContentResultsResponse c : crr) {
                if (c.getIso_3166_1().equals("KR")) {
                    KRRating = c.getRating();
                    break;
                }
            }
            String s = dramaResultResponse.getFirstAirDate();
            if (s != null && !s.isEmpty())
                releasedDate = LocalDate.parse(s);
            nameKR = dramaResultResponse.getOriginalName();
            nameEn = dramaResultResponse.getName();
        } else {
            contentKind = ContentKind.MOVIE;
            movieDetailResponse = (MovieDetailResponse) movieDramaDetailResponse;
            movieResultResponse = (MovieResultResponse) result;
            List<ReleaseResponse> rr = movieDetailResponse.getReleaseDates().getResults();
            for (ReleaseResponse r : rr) {
                if (r.getIso_3166_1().equals("KR")) {
                    KRRating = r.getReleaseDates().get(0).getCertification();
                }
            }
            String s = movieResultResponse.getReleaseDate();
            if (s != null && !s.isEmpty())
                releasedDate = LocalDate.parse(s);
            nameKR = movieResultResponse.getOriginalTitle();
            nameEn = movieResultResponse.getTitle();
        }
        return Content.builder()
                .releasedDate(releasedDate)
                .tmdbId(result.getId())
                .kind(contentKind)
                .nameKr(nameKR)
                .nameEn(nameEn)
                .plot(result.getOverview())
                .posterPath(result.getPosterPath())
                .rating(KRRating)
                .build();
    }

    @Getter
    @AllArgsConstructor
    public enum ContentKind {
        MOVIE("영화"),
        DRAMA("드라마");

        private final String kind;
    }

    @Getter
    @AllArgsConstructor
    public enum ContentRating {
        FIFTEEN("15"),
        NINETEEN("19");

        private final String rating;
    }

}
