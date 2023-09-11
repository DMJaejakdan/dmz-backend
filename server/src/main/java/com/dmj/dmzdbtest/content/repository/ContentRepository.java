package com.dmj.dmzdbtest.content.repository;

import com.dmj.dmzdbtest.content.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<Content, Long> {

}
