package com.dmj.dmz.content.repository;

import com.dmj.dmz.content.entity.Content;

import java.util.List;

public interface ContentRepositoryCustom {
    List<Content> findByNameKrLike(String nameKr);
}
