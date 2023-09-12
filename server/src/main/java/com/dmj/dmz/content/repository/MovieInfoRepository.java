package com.dmj.dmz.content.repository;

import com.dmj.dmz.content.entity.MovieInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieInfoRepository extends JpaRepository<MovieInfo, Long> {

}
