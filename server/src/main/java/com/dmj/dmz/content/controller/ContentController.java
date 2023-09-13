package com.dmj.dmz.content.controller;

import com.dmj.dmz.content.service.ContentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/content")
public class ContentController {
    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping
    public void getContent(@RequestParam String name) {
        contentService.getContent(name);
    }
}
