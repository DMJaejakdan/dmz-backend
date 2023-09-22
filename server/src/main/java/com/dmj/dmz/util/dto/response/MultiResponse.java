package com.dmj.dmz.util.dto.response;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class MultiResponse<T> {
    private final List<T> data;
    private final PageInfo pageInfo;

    public MultiResponse(Page<T> page) {
        this.data = page.getContent();
        this.pageInfo = new PageInfo(
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );
    }
}
