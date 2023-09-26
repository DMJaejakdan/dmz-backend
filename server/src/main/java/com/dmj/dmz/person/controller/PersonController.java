package com.dmj.dmz.person.controller;

import com.dmj.dmz.person.Service.PersonService;
import com.dmj.dmz.person.dto.request.PersonSearchConditions;
import com.dmj.dmz.person.dto.response.PersonDetailResponse;
import com.dmj.dmz.person.dto.response.PersonResponse;
import com.dmj.dmz.util.dto.response.MultiResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/person")
public class PersonController {
    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping("/search")
    public ResponseEntity<MultiResponse<PersonResponse>> searchPeople(PersonSearchConditions personSearchConditions,
                                                                     Pageable pageable) {
        System.out.println(personSearchConditions.toString());
        return ResponseEntity.ok(personService.getPersonListResult(personSearchConditions, pageable));
    }

    @GetMapping("/{person-id}")
    public ResponseEntity<PersonDetailResponse> getPersonDetail(@PathVariable("person-id") long personId) {
        return ResponseEntity.ok(personService.getPersonDetail(personId));
    }
}
