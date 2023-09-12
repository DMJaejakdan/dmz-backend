package com.dmj.dmz.data;

import com.dmj.dmz.content.entity.*;
import com.dmj.dmz.content.repository.*;
import com.dmj.dmz.data.response.*;
import com.dmj.dmz.keyword.entity.ContentKeyword;
import com.dmj.dmz.keyword.entity.Keyword;
import com.dmj.dmz.keyword.repository.ContentKeywordRepository;
import com.dmj.dmz.keyword.repository.KeywordRepository;
import com.dmj.dmz.person.entity.ContentActor;
import com.dmj.dmz.person.entity.ContentCrew;
import com.dmj.dmz.person.entity.Person;
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
    private final GenreRepository genreRepository;
    private final ContentGenreRepository contentGenreRepository;
    private final PersonRepository personRepository;
    private final ContentActorRepository contentActorRepository;
    private final ContentCrewRepository contentCrewRepository;
    private final EpisodeRepository episodeRepository;
    private final MovieInfoRepository movieInfoRepository;

    public DataGenerationTask(APIConfig apiConfig, ContentRepository contentRepository, DramaInfoRepository dramaInfoRepository, KeywordRepository keywordRepository, ContentKeywordRepository contentKeywordRepository, CompanyRepository companyRepository, ContentCompanyRepository contentCompanyRepository, GenreRepository genreRepository, ContentGenreRepository contentGenreRepository, PersonRepository personRepository, ContentActorRepository contentActorRepository, ContentCrewRepository contentCrewRepository, EpisodeRepository episodeRepository, MovieInfoRepository movieInfoRepository) {
        this.apiConfig = apiConfig;
        this.contentRepository = contentRepository;
        this.dramaInfoRepository = dramaInfoRepository;
        this.keywordRepository = keywordRepository;
        this.contentKeywordRepository = contentKeywordRepository;
        this.companyRepository = companyRepository;
        this.contentCompanyRepository = contentCompanyRepository;
        this.genreRepository = genreRepository;
        this.contentGenreRepository = contentGenreRepository;
        this.personRepository = personRepository;
        this.contentActorRepository = contentActorRepository;
        this.contentCrewRepository = contentCrewRepository;
        this.episodeRepository = episodeRepository;
        this.movieInfoRepository = movieInfoRepository;
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

        // TV장르 가져오기
        URI url = UriComponentsBuilder.fromUriString(baseURL)
                .path("/genre/tv/list")
                .queryParam("api_key", apikey)
                .queryParam("language", "ko")
                .build()
                .toUri();

        ResponseEntity<GenresResponse> genres = restTemplate.exchange(url, HttpMethod.GET, entity, GenresResponse.class);
        GenresResponse genreList = genres.getBody();

        assert genreList != null;
        for (GenreResponse g : genreList.getGenres()) {
            if (!genreRepository.existsByTmdbId(g.getId())) {
                genreRepository.save(Genre.toEntity(g));
            }
        }

        // 영화 장르 가져오기
        url = UriComponentsBuilder.fromUriString(baseURL)
                .path("/genre/movie/list")
                .queryParam("api_key", apikey)
                .queryParam("language", "ko")
                .build()
                .toUri();

        genres = restTemplate.exchange(url, HttpMethod.GET, entity, GenresResponse.class);
        genreList = genres.getBody();

        assert genreList != null;
        for (GenreResponse g : genreList.getGenres()) {
            if (!genreRepository.existsByTmdbId(g.getId())) {
                genreRepository.save(Genre.toEntity(g));
            }
        }

        final int dramaCode = 18;
        log.info("드라마 작업 시작");
        for (int page = 1; page <= 20; page++) {
            // 한국 드라마 리스트
            url = UriComponentsBuilder.fromUriString(baseURL)
                    .path("/discover/tv")
                    .queryParam("api_key", apikey)
                    .queryParam("include_adult", false)
                    .queryParam("include_null_first_air_dates", false)
                    .queryParam("language", "ko")
                    .queryParam("sort_by", "popularity.desc")
                    .queryParam("with_genres", dramaCode)
                    .queryParam("with_origin_country", "KR")
                    .queryParam("page", page)
                    .build()
                    .toUri();

            ResponseEntity<DramaListResponse> responseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, DramaListResponse.class);
            DramaListResponse dramaList = responseEntity.getBody();

            assert dramaList != null;
            for (DramaResultResponse result : dramaList.getResults()) {
                if (contentRepository.existsByTmdbIdAndKind(result.getId(), Content.ContentKind.DRAMA)) {
                    continue;
                }
                // 드라마 상세
                URI url2 = UriComponentsBuilder.fromUriString(baseURL)
                        .path("/tv/" + result.getId())
                        .queryParam("api_key", apikey)
                        .queryParam("append_to_response", "content_ratings,keywords,aggregate_credits")
                        .queryParam("language", "ko")
                        .build()
                        .toUri();
                ResponseEntity<DramaDetailResponse> responseEntity2 = restTemplate.exchange(url2, HttpMethod.GET, entity, DramaDetailResponse.class);
                DramaDetailResponse dramaDetail = responseEntity2.getBody();
                assert dramaDetail != null;
                Content content = Content.toEntity("D", result, dramaDetail);
                contentRepository.save(content);

                // 콘텐츠와 장르 연결
                for (int gId : result.getGenreIds()) {
                    contentGenreRepository.save(ContentGenre.toEntity(content, genreRepository.findByTmdbId(gId)));
                }

                // 드라마 정보 등록
                DramaInfo dramaInfo = dramaInfoRepository.save(DramaInfo.toEntity(content, dramaDetail));
                int totalSeason = dramaDetail.getNumberOfSeasons();

                // 각 시즌별 에피소드 등록
                for (int s = 1; s <= totalSeason; s++) {
                    URI sUrl = UriComponentsBuilder.fromUriString(baseURL)
                            .path("/tv/{series_id}/season/{season_number}")
                            .queryParam("api_key", apikey)
                            .queryParam("language", "ko")
                            .buildAndExpand(result.getId(), s)
                            .toUri();
                    ResponseEntity<SeasonResponse> seasonResponseEntity = restTemplate.exchange(sUrl, HttpMethod.GET, entity, SeasonResponse.class);
                    SeasonResponse seasonResponse = seasonResponseEntity.getBody();

                    assert seasonResponse != null;
                    for (EpisodeResponse e : seasonResponse.getEpisodes()) {
                        episodeRepository.save(Episode.toEntity(dramaInfo, e));
                    }
                }
                for (KeywordsResultResponse k : dramaDetail.getKeywords().getResults()) {
                    Keyword keyword = keywordRepository.findByName(k.getName());
                    if (keyword == null) {
                        keyword = keywordRepository.save(Keyword.toEntity(k));
                    }
                    contentKeywordRepository.save(ContentKeyword.toEntity(content, keyword));
                }
                // 회사 정보 등록
                for (ProductionCompanyResponse pcr : dramaDetail.getProductionCompanies()) {
                    Company company = companyRepository.findByTmdbId(pcr.getId());
                    if (company == null) {
                        company = companyRepository.save(Company.toEntity(pcr));
                    }
                    contentCompanyRepository.save(ContentCompany.toEntity(content, company));
                }

                // 등록 안된 cast 및 역할 등록
                for (CastResponse c : dramaDetail.getAggregateCredits().getCast()) {
                    Person person = getPerson(c, baseURL, apikey, restTemplate, entity);
                    contentActorRepository.save(ContentActor.toEntity(content, person, c));
                }
                // 등록 안된 actor 및 역할 등록
                for (CrewResponse c : dramaDetail.getAggregateCredits().getCrew()) {
                    Person person = getPerson(c, baseURL, apikey, restTemplate, entity);
                    contentCrewRepository.save(ContentCrew.toEntity(content, person, c));
                }
            }
            log.info("드라마: {}/{}", page, dramaList.getTotalPages());
        }
        // 영화 등록
        log.info("영화 작업 시작");
        for (int page = 1; page <= 0; page++) {
            // 한국 영화 리스트
            url = UriComponentsBuilder.fromUriString(baseURL)
                    .path("/discover/movie")
                    .queryParam("api_key", apikey)
                    .queryParam("include_adult", false)
                    .queryParam("include_null_first_air_dates", false)
                    .queryParam("language", "ko")
                    .queryParam("sort_by", "popularity.desc")
                    .queryParam("with_origin_country", "KR")
                    .queryParam("page", page)
                    .build()
                    .toUri();

            ResponseEntity<MovieListResponse> responseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, MovieListResponse.class);
            MovieListResponse movieList = responseEntity.getBody();

            assert movieList != null;
            for (MovieResultResponse result : movieList.getResults()) {
                if (contentRepository.existsByTmdbIdAndKind(result.getId(), Content.ContentKind.MOVIE)) {
                    continue;
                }
                // 영화 상세
                URI url2 = UriComponentsBuilder.fromUriString(baseURL)
                        .path("/movie/" + result.getId())
                        .queryParam("api_key", apikey)
                        .queryParam("append_to_response", "release_dates,keywords,credits")
                        .queryParam("language", "ko")
                        .build()
                        .toUri();
                ResponseEntity<MovieDetailResponse> responseEntity2 = restTemplate.exchange(url2, HttpMethod.GET, entity, MovieDetailResponse.class);
                MovieDetailResponse movieDetail = responseEntity2.getBody();
                assert movieDetail != null;
                Content content = Content.toEntity("M", result, movieDetail);
                contentRepository.save(content);

                // 콘텐츠와 장르 연결
                for (int gId : result.getGenreIds()) {
                    contentGenreRepository.save(ContentGenre.toEntity(content, genreRepository.findByTmdbId(gId)));
                }

                // 영화 정보 등록
                movieInfoRepository.save(MovieInfo.toEntity(content, movieDetail));

                // 키워드 등록
                for (KeywordsResultResponse k : movieDetail.getKeywords().getKeywords()) {
                    Keyword keyword = keywordRepository.findByName(k.getName());
                    if (keyword == null) {
                        keyword = keywordRepository.save(Keyword.toEntity(k));
                    }
                    contentKeywordRepository.save(ContentKeyword.toEntity(content, keyword));
                }
                // 회사 정보 등록
                for (ProductionCompanyResponse pcr : movieDetail.getProductionCompanies()) {
                    Company company = companyRepository.findByTmdbId(pcr.getId());
                    if (company == null) {
                        company = companyRepository.save(Company.toEntity(pcr));
                    }
                    contentCompanyRepository.save(ContentCompany.toEntity(content, company));
                }

                // 등록 안된 cast 및 역할 등록
                for (CastResponse c : movieDetail.getCredits().getCast()) {
                    Person person = getPerson(c, baseURL, apikey, restTemplate, entity);
                    contentActorRepository.save(ContentActor.toEntity(content, person, c));
                }
                // 등록 안된 actor 및 역할 등록
                for (CrewResponse c : movieDetail.getCredits().getCrew()) {
                    Person person = getPerson(c, baseURL, apikey, restTemplate, entity);
                    contentCrewRepository.save(ContentCrew.toEntity(content, person, c));
                }
            }
            log.info("영화: {}/{}", page, movieList.getTotalPages());
        }
    }

    private Person getPerson(CastCrewResponse c, String baseURL, String apikey, RestTemplate restTemplate, HttpEntity<String> entity) {
        long tmdbId = c.getId();
        URI personUrl = UriComponentsBuilder.fromUriString(baseURL)
                .path("/person/" + tmdbId)
                .queryParam("api_key", apikey)
                .queryParam("language", "ko")
                .build()
                .toUri();
        ResponseEntity<PersonDetailResponse> personDetailEntity = restTemplate.exchange(personUrl, HttpMethod.GET, entity, PersonDetailResponse.class);
        PersonDetailResponse personDetail = personDetailEntity.getBody();
        Person person = personRepository.findByTmdbId(tmdbId);
        if (person == null) {
            assert personDetail != null;
            person = personRepository.save(Person.toEntity(c, personDetail));
        }
        return person;
    }
}
