package com.dmj.dmz.person.repository;

import com.dmj.dmz.content.dto.response.PersonAutoResponse;
import com.dmj.dmz.person.dto.response.PersonResponse;
import com.dmj.dmz.person.dto.request.PersonSearchConditions;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PersonRepositoryCustom {
    Page<PersonResponse> personFindWithSearchConditions(Pageable pageable, final PersonSearchConditions personSearchConditions);
}
