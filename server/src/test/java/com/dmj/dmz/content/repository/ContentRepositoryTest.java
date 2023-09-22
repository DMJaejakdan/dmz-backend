package com.dmj.dmz.content.repository;

import com.dmj.dmz.config.QuerydslConfiguration;
import com.dmj.dmz.content.dto.request.MovieSearchConditions;
import com.dmj.dmz.content.dto.response.ContentResponse;
import com.dmj.dmz.content.entity.Content;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.util.StopWatch;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Import(QuerydslConfiguration.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Slf4j
class ContentRepositoryTest {

    @Autowired
    ContentRepository contentRepository;

    @BeforeAll
    static void toStart() {
        System.out.println("테스트 시작");
    }

    @Test
    @DisplayName("다양한 조건으로 영화 검색")
    void movieFindBySearchConditions() {
        StopWatch stopWatch = new StopWatch();
        /* given */
        MovieSearchConditions movieSearchConditions = MovieSearchConditions.builder()
                .nameKr("")
                .sDate(null)
//                .sDate(LocalDate.parse("2023-09-01"))
                .eDate(null)
//                .eDate(LocalDate.parse("2023-09-21"))
                .ratings(null/*List.of("코미디")*/)
                .genres(null/*List.of("코미디","드라마")*/)
                .plot("")
                .keywords(/*null*/List.of("romance","smile"))
                .companies(null)
                .build();
        Pageable pageable = PageRequest.of(1, 5/*, Sort.by("nameKr").descending()*/);
        /* when */
        stopWatch.start("검색");
        List<ContentResponse> results = contentRepository.movieFindWithSearchConditions(pageable, movieSearchConditions).getContent();
        stopWatch.stop();
        for (ContentResponse c : results) {
            System.out.println(c.toString());
        }
        System.out.println("걸린 시간: " + stopWatch.getTotalTimeSeconds() + "초");
    }

    @Test
    @DisplayName("fetchJoin Test")
    void findWithSearchConditionsFetchJoin() {
        StopWatch stopWatch = new StopWatch();
        /* given */
        String searchName = "";
        LocalDate sDate = LocalDate.parse("2023-09-01");
        LocalDate eDate = LocalDate.parse("2023-09-21");
        List<String> ratings = null;
        List<String> genres = null;
        /* when */
        stopWatch.start("검색");
        List<Content> results = contentRepository.findWithSearchConditionsFetchJoin(searchName, sDate, eDate, ratings, genres);
        stopWatch.stop();
        System.out.println("걸린 시간: " + stopWatch.getTotalTimeSeconds() + "초");
        log.info(results.toString());
        for (Content c : results) {
            System.out.println(c.toString());
        }
    }
}