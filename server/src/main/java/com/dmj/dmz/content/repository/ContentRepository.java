package com.dmj.dmz.content.repository;

import com.dmj.dmz.content.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ContentRepository extends JpaRepository<Content, Long>,ContentRepositoryCustom {
    boolean existsByTmdbIdAndKind(long tmdbId, Content.ContentKind contentKind);
}
