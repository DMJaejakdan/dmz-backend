package com.dmj.dmz.content.service;

import com.dmj.dmz.content.entity.Content;
import com.dmj.dmz.content.entity.Genre;
import com.dmj.dmz.content.repository.ContentRepository;
import com.dmj.dmz.content.repository.GenreRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ContentService {
    private final ContentRepository contentRepository;

    public ContentService(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    public void getContent(String name) {
        List<Content> contents = contentRepository.findByNameKrLike(name);
        System.out.println("검색결과");
        for (Content c : contents) {
            System.out.println(c.getNameKr()+"의 오버뷰: "+c.getPlot());
        }
    }
}
