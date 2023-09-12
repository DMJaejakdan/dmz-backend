package com.dmj.dmz.content.repository;

import com.dmj.dmz.person.entity.ContentPerson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentPersonRepository extends JpaRepository<ContentPerson,Long> {
}
