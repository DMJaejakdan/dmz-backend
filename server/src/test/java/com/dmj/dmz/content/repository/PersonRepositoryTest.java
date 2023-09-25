package com.dmj.dmz.content.repository;

import com.dmj.dmz.config.QuerydslConfiguration;
import com.dmj.dmz.person.entity.dto.response.PersonResponse;
import com.dmj.dmz.person.entity.dto.request.PersonSearchConditions;
import com.dmj.dmz.person.repository.PersonRepository;
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
import org.springframework.util.StopWatch;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Import(QuerydslConfiguration.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Slf4j
class PersonRepositoryTest {

    @Autowired
    PersonRepository personRepository;

    @BeforeAll
    static void toStart() {
        System.out.println("테스트 시작");
    }

    @Test
    @DisplayName("다양한 조건으로 인물 검색")
    void personFindBySearchConditions() {
        StopWatch stopWatch = new StopWatch();
        /* given */
        PersonSearchConditions personSearchConditions = PersonSearchConditions.builder()
                .nameKr(null)
                .areas(/*null*/List.of("Acting"))
                .genders(/*null*/List.of(0))
                .ages(/*null*/List.of(0, 3))
                .build();
        Pageable pageable = PageRequest.of(1, 5/*, Sort.by("birth").descending()*/);
        /* when */
        stopWatch.start("검색");
        List<PersonResponse> results = personRepository.personFindWithSearchConditions(pageable, personSearchConditions).getContent();
        stopWatch.stop();
        for (PersonResponse c : results) {
            System.out.println(c.toString());
        }
        System.out.println("걸린 시간: " + stopWatch.getTotalTimeSeconds() + "초");

        /* then */
        for (PersonResponse p : results) {
            assertThat(p.getBirth()).satisfiesAnyOf(
                    b -> assertThat(b).isBetween(LocalDate.now().minusYears(9), LocalDate.now()),
                    b -> assertThat(b).isBetween(LocalDate.now().minusYears(39), LocalDate.now().minusYears(30))
            );
        }
    }
}