package com.dmj.dmzdbtest.content.repository;

import com.dmj.dmzdbtest.content.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Company findByTmdbId(Long tmdbId);
}
