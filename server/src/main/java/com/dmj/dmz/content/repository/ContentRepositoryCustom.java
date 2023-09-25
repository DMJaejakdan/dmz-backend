package com.dmj.dmz.content.repository;

import com.dmj.dmz.content.dto.request.ContentSearchConditions;
import com.dmj.dmz.content.dto.response.ContentResponse;
import com.dmj.dmz.content.entity.Content;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ContentRepositoryCustom {
    Page<ContentResponse> contentFindWithSearchConditions(Pageable pageable, final ContentSearchConditions contentSearchConditions);
    List<Content> findWithSearchConditionsFetchJoin(final String nameKr, final String sDate, final String eDate, final List<String> rating, final List<String> genre);
}
