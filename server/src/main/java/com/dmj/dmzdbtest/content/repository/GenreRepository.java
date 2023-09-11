package com.dmj.dmzdbtest.content.repository;

import com.dmj.dmzdbtest.content.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre,Long> {
}
