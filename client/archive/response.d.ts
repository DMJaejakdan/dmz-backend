export interface PersonDetailResponse {
  nameKr: string;
  gender: number;
  profilePath: string;
  birth: string | null;
  death: string | null;
  area: string;
  simpleContentResponses: {
    nameKr: string;
    posterPath: string;
  }[];
}
export interface DramaDetailResponse {
  nameKr: string;
  contentActorResponses: {
    id: number;
    nameKr: string;
    role: string;
    profilePath: string;
  }[];
  contentCrewResponses: {
    nameKr: string;
    role: string;
    profilePath: string;
  }[];
  companies: string[];
  keywords: string[];
  genres: string[];
  channel: string;
  releasedDate: string;
  endDate: string;
  rating: string;
  posterPath: string;
  episodeResponses: {
    nth: number;
    overview: number;
  }[];
}
export interface MovieDetailResponse {
  nameKr: string;
  contentActorResponses: {
    id: number;
    nameKr: string;
    role: string;
    profilePath: string;
  }[];
  contentCrewResponses: {
    nameKr: string;
    role: string;
    profilePath: string;
  }[];
  runningTime: number;
  companies: string[];
  keywords: string[];
  genres: string[];
  releasedDate: string;
  rating: string;
  boxOffice: string | null;
  posterPath: string;
}
