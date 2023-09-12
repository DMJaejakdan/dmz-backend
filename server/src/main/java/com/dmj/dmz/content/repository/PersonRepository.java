package com.dmj.dmz.content.repository;

import com.dmj.dmz.person.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
    Person findByTmdbId(long id);
}
