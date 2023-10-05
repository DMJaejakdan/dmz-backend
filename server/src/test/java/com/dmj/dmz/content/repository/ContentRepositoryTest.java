package com.dmj.dmz.content.repository;

import com.dmj.dmz.config.QuerydslConfiguration;
import com.dmj.dmz.content.dto.request.ContentSearchConditions;
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
    @DisplayName("다양한 조건으로 컨텐츠 검색")
    void contentFindBySearchConditions() {
        StopWatch stopWatch = new StopWatch();
        /* given */
        ContentSearchConditions contentSearchConditions = ContentSearchConditions.builder()
                .kind(Content.ContentKind.DRAMA)
                .nameKr(null)
                .sDate(null)
                .sDate("2015-09-01")
//                .eDate(null)
                .eDate("2017-09-21")
                .ratings(null/*List.of("15")*/)
                .genres(null)
//                .genres(List.of("미스터리"))
                .plot(null)
                .keywords(null/*List.of("romance","smile")*/)
                .companies(null)
                .people(null)
//                .people(List.of("Lee Je-hoon"))
                .channels(null/*List.of("tvN")*/)
                .build();
        Pageable pageable = PageRequest.of(1, 10000, Sort.by("nameKr").descending());
        /* when */
        stopWatch.start("검색");
        List<ContentResponse> results = contentRepository.contentFindWithSearchConditions(pageable, contentSearchConditions).getContent();
        stopWatch.stop();
//        for (ContentResponse c : results) {
//            System.out.println(c.toString());
//        }
        System.out.println("총 결과 수: " + results.size());
        System.out.println("걸린 시간: " + stopWatch.getTotalTimeSeconds() + "초");

        /* then */
//        assertThat(results.size()).isEqualTo(1);
//        assertThat(results.get(0).getNameKr()).isEqualTo("시그널");
    }
}