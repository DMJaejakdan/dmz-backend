package com.dmj.dmz.content.entity;

import com.dmj.dmz.data.response.*;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    @Builder
    public Content(long tmdbId, String nameKr, String nameEn, ContentKind kind, String posterPath, LocalDate releasedDate, String rating, String plot) {
        this.tmdbId = tmdbId;
        this.nameKr = nameKr;
        this.nameEn = nameEn;
        this.kind = kind;
        this.posterPath = posterPath;
        this.releasedDate = releasedDate;
        this.rating = rating;
        this.plot = plot;
    }

    public static Content toEntity(String flag, MovieDramaResultResponse result, MovieDramaDetailResponse movieDramaDetailResponse) {
        DramaDetailResponse dramaDetailResponse;
        MovieDetailResponse movieDetailResponse;
        DramaResultResponse dramaResultResponse;
        MovieResultResponse movieResultResponse;
        String KRRating = "";
        String releasedDate = "";
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
            releasedDate = dramaResultResponse.getFirstAirDate();
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
            releasedDate= movieResultResponse.getReleaseDate();
            nameKR = movieResultResponse.getOriginalTitle();
            nameEn = movieResultResponse.getTitle();
        }
        return Content.builder()
                .releasedDate(LocalDate.parse(releasedDate))
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
