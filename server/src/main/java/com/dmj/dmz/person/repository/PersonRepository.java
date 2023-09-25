package com.dmj.dmz.person.repository;

import com.dmj.dmz.content.entity.Content;
import com.dmj.dmz.content.repository.ContentRepositoryCustom;
import com.dmj.dmz.person.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long>, PersonRepositoryCustom {
    Person findByTmdbId(long id);
}
