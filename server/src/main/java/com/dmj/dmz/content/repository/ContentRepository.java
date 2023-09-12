package com.dmj.dmz.content.repository;

import com.dmj.dmz.content.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<Content, Long> {
    boolean existsByTmdbIdAndKind(long tmdbId, Content.ContentKind contentKind);
}
