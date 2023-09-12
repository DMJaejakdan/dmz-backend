package com.dmj.dmz.content.repository;

import com.dmj.dmz.content.entity.Episode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EpisodeRepository extends JpaRepository<Episode,Long> {
}
