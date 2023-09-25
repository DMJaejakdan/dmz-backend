package com.dmj.dmz.person.entity.dto.request;

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
    // 0: 남, 1: 여
    List<Integer> genders;
    List<Integer> ages;
}
