package com.dmj.dmz.person.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@Builder
@ToString
public class PersonSearchConditions {
    String nameKr;
    List<String> areas;
    // 0: not set, 1: 여, 2: 남
    List<Integer> genders;
    List<Integer> ages;
}
