package com.dmj.dmz.keyword.repository;

import com.dmj.dmz.keyword.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeywordRepository extends JpaRepository<Keyword, Long> {
    Keyword findByName(String name);
}
