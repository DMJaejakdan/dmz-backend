package com.dmj.dmz.content.repository;

import com.dmj.dmz.content.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {
    boolean existsByTmdbId(Long tmdbId);

    Genre findByTmdbId(long id);
}
