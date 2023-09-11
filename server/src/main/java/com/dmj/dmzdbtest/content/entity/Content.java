package com.dmj.dmzdbtest.content.entity;

import com.dmj.dmzdbtest.data.response.ContentResultsResponse;
import com.dmj.dmzdbtest.data.response.DramaDetailResponse;
import com.dmj.dmzdbtest.data.response.DramaResultResponse;
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

    private int tmdbId;

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
    public Content(int tmdbId, String nameKr, String nameEn, ContentKind kind, String posterPath, LocalDate releasedDate, String rating, String plot) {
        this.tmdbId = tmdbId;
        this.nameKr = nameKr;
        this.nameEn = nameEn;
        this.kind = kind;
        this.posterPath = posterPath;
        this.releasedDate = releasedDate;
        this.rating = rating;
        this.plot = plot;
    }

    public static Content toEntity(DramaResultResponse result, DramaDetailResponse dramaDetailResponse) {
        List<ContentResultsResponse> crr = dramaDetailResponse.getContentRatings().getResults();
        String KRRating = "";
        for (ContentResultsResponse c:crr) {
            if (c.getIso_3166_1().equals("KR")) {
                KRRating = c.getRating();
                break;
            }
        }
        return Content.builder()
                .releasedDate(LocalDate.parse(result.getFirstAirDate()))
                .tmdbId(result.getId())
                .kind(ContentKind.DRAMA)
                .nameKr(result.getOriginalName())
                .nameEn(result.getName())
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
