package com.dmj.dmzdbtest.keyword.repository;

import com.dmj.dmzdbtest.keyword.entity.ContentKeyword;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentKeywordRepository extends JpaRepository<ContentKeyword,Long> {
}
