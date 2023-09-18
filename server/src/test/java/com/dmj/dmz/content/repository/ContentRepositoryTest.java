package com.dmj.dmz.content.repository;

import com.dmj.dmz.config.QuerydslConfiguration;
import com.dmj.dmz.content.entity.Content;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
@Import(QuerydslConfiguration.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Slf4j
class ContentRepositoryTest {

    @Autowired
    ContentRepository contentRepository;

    @Test
    @DisplayName("QueryDSL 이름으로 찾기 테스트")
    void findByName() {
        /* given */
        String searchName = "시그널";
        /* when */
        List<Content> contentList = contentRepository.findByNameKrLike(searchName);
        for (Content c : contentList) {
            log.info(c.getNameKr());
        }
        /* then */
        assertThat(contentList.size()).isGreaterThanOrEqualTo(0);
    }
}