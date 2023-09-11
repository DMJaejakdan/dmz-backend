package com.dmj.dmzdbtest.data;

import com.dmj.dmzdbtest.content.entity.Company;
import com.dmj.dmzdbtest.content.entity.Content;
import com.dmj.dmzdbtest.content.entity.ContentCompany;
import com.dmj.dmzdbtest.content.entity.DramaInfo;
import com.dmj.dmzdbtest.content.repository.CompanyRepository;
import com.dmj.dmzdbtest.content.repository.ContentCompanyRepository;
import com.dmj.dmzdbtest.content.repository.ContentRepository;
import com.dmj.dmzdbtest.content.repository.DramaInfoRepository;
import com.dmj.dmzdbtest.data.response.*;
import com.dmj.dmzdbtest.keyword.entity.ContentKeyword;
import com.dmj.dmzdbtest.keyword.entity.Keyword;
import com.dmj.dmzdbtest.keyword.repository.ContentKeywordRepository;
import com.dmj.dmzdbtest.keyword.repository.KeywordRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Collections;

@Component
@Slf4j
public class DataGenerationTask {
    private final APIConfig apiConfig;
    private final ContentRepository contentRepository;
    private final DramaInfoRepository dramaInfoRepository;
    private final KeywordRepository keywordRepository;
    private final ContentKeywordRepository contentKeywordRepository;
    private final CompanyRepository companyRepository;
    private final ContentCompanyRepository contentCompanyRepository;

    public DataGenerationTask(APIConfig apiConfig, ContentRepository contentRepository, DramaInfoRepository dramaInfoRepository, KeywordRepository keywordRepository, ContentKeywordRepository contentKeywordRepository, CompanyRepository companyRepository, ContentCompanyRepository contentCompanyRepository) {
        this.apiConfig = apiConfig;
        this.contentRepository = contentRepository;
        this.dramaInfoRepository = dramaInfoRepository;
        this.keywordRepository = keywordRepository;
        this.contentKeywordRepository = contentKeywordRepository;
        this.companyRepository = companyRepository;
        this.contentCompanyRepository = contentCompanyRepository;
    }

    public void getData() {
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setConnectTimeout(5000);
        factory.setReadTimeout(5000);

        RestTemplate restTemplate = new RestTemplate(factory);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(headers);

        String baseURL = apiConfig.getBaseURL();
        String apikey = apiConfig.getKey();

        for (int page = 1; page <= 2; page++) {
            // 한국 드라마 리스트
            URI url = UriComponentsBuilder.fromUriString(baseURL)
                    .path("/discover/tv")
                    .queryParam("api_key", apikey)
                    .queryParam("include_adult", false)
                    .queryParam("include_null_first_air_dates", false)
                    .queryParam("language", "ko")
                    .queryParam("sort_by", "popularity.desc")
                    .queryParam("with_genres", "18")
                    .queryParam("with_origin_country", "KR")
                    .queryParam("page", page)
                    .build()
                    .toUri();

            ResponseEntity<DramaListResponse> responseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, DramaListResponse.class);
            DramaListResponse dramaList = responseEntity.getBody();

            assert dramaList != null;
            for (DramaResultResponse result : dramaList.getResults()) {
                // 드라마 상세
                URI url2 = UriComponentsBuilder.fromUriString(baseURL)
                        .path("/tv/" + result.getId())
                        .queryParam("api_key", apikey)
                        .queryParam("append_to_response", "content_ratings,keywords")
                        .queryParam("language", "ko")
                        .build()
                        .toUri();
                ResponseEntity<DramaDetailResponse> responseEntity2 = restTemplate.exchange(url2, HttpMethod.GET, entity, DramaDetailResponse.class);
                DramaDetailResponse dramaDetail = responseEntity2.getBody();
                assert dramaDetail != null;
                Content content = Content.toEntity(result, dramaDetail);
                contentRepository.save(content);
                dramaInfoRepository.save(DramaInfo.toEntity(content, dramaDetail));
                for (KeywordsResultResponse k : dramaDetail.getKeywords().getResults()) {
                    Keyword keyword = keywordRepository.findByName(k.getName());
                    if (keyword == null) {
                        keyword = keywordRepository.save(Keyword.toEntity(k));
                    }
                    contentKeywordRepository.save(ContentKeyword.toEntity(content, keyword));
                }
                for (ProductionCompanyResponse pcr : dramaDetail.getProductionCompanies()) {
                    Company company = companyRepository.findByTmdbId(pcr.getId());
                    if (company == null) {
                        company = companyRepository.save(Company.toEntity(pcr));
                    }
                    contentCompanyRepository.save(ContentCompany.toEntity(content, company));
                }
            }
        }
    }
}
