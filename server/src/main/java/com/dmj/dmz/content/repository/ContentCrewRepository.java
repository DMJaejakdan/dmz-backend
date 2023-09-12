package com.dmj.dmz.content.repository;

import com.dmj.dmz.person.entity.ContentCrew;
import com.dmj.dmz.person.entity.ContentPerson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentCrewRepository extends JpaRepository<ContentCrew,Long> {
}
