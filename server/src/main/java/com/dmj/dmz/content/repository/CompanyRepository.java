package com.dmj.dmz.content.repository;

import com.dmj.dmz.content.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Company findByTmdbId(Long tmdbId);
}
