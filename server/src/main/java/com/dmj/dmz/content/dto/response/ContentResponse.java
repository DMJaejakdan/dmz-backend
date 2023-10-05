package com.dmj.dmz.content.dto.response;

import com.dmj.dmz.content.entity.Content;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static com.dmj.dmz.content.entity.Content.ContentKind;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class ContentResponse {
    private Long id;

    private Long tmdbId;

    private String nameKr;

    private String nameEn;

    private ContentKind kind;

    private String posterPath;

    private LocalDate releasedDate;

    private String rating;

    private String plot;

    private String person;

    private final List<GenreResponse> genreResponseList = new ArrayList<>();

    private MovieInfoResponse movieInfoResponse;

    private DramaInfoResponse dramaInfoResponse;

    @QueryProjection
    @Builder
    public ContentResponse(Content content) {
        this.id = content.getId();
        this.tmdbId = content.getTmdbId();
        this.nameKr = content.getNameKr();
        this.nameEn = content.getNameEn();
        this.kind = content.getKind();
        this.posterPath = content.getPosterPath();
        this.releasedDate = content.getReleasedDate();
        this.rating = content.getRating();
        this.plot = content.getPlot();
        content.getContentCrewList().stream()
                .filter(cc -> (kind == ContentKind.MOVIE && cc.getRole().equals("Director")) ||
                        (kind == ContentKind.DRAMA && cc.getRole().equals("Writer")))
                .findFirst().ifPresent(directorOrWriter -> this.person = directorOrWriter.getPerson().getNameKr());
//        for (ContentCrew cc : content.getContentCrewList()) {
//            if (kind == ContentKind.MOVIE && cc.getRole().equals("Director")) {
//                this.person = cc.getPerson().getNameKr();
//            }
//            if (kind == ContentKind.DRAMA && cc.getRole().equals("Writer")) {
//                this.person = cc.getPerson().getNameKr();
//            }
//        }
        content.getContentGenreList().stream().distinct().forEach(
                genre -> this.genreResponseList.add(
                        GenreResponse.builder()
                                .contentGenre(genre)
                                .build()
                )
        );
        if (kind == ContentKind.MOVIE) {
            this.movieInfoResponse = MovieInfoResponse.builder()
                    .movieInfo(content.getMovieInfo().get(0))
                    .build();
        } else {
            this.dramaInfoResponse = DramaInfoResponse.builder()
                    .dramaInfo(content.getDramaInfo().get(0))
                    .build();
        }
    }
}
