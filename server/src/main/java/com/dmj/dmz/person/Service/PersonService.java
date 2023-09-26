package com.dmj.dmz.person.Service;

import com.dmj.dmz.person.dto.request.PersonSearchConditions;
import com.dmj.dmz.person.dto.response.PersonDetailResponse;
import com.dmj.dmz.person.dto.response.PersonResponse;
import com.dmj.dmz.person.repository.PersonRepository;
import com.dmj.dmz.util.dto.response.MultiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
public class PersonService {
    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public MultiResponse<PersonResponse> getPersonListResult(PersonSearchConditions personSearchConditions, Pageable pageable) {

        return new MultiResponse<>(personRepository.personFindWithSearchConditions(pageable, personSearchConditions));
    }

    @Transactional(readOnly = true)
    public PersonDetailResponse getPersonDetail(long personId) {
        return new PersonDetailResponse(personRepository.findById(personId).orElseThrow());
    }
}
