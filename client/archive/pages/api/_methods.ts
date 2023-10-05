export async function AC(type: string, input: string) {
  const url = `/api/autocomplete?type=${type}&genrePre=${input}`;
  const data = await fetch(url).then(res => res.json());
  return data;
}

export async function CS(queries: {}) {
  console.log(queries);
  const string = Object.entries(queries)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== ''
    )
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  const url = `${process.env.NEXT_PUBLIC_ROOT}/dmzarchive/api/contentSearch?${string}`;
  const data = await fetch(url).then(res => res.json());
  return data;
}
export async function PS(queries: {}) {
  const string = Object.entries(queries)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== ''
    )
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  console.log(string);
  const url = `${process.env.NEXT_PUBLIC_ROOT}/dmzarchive/api/personSearch?${string}`;
  const data = await fetch(url).then(res => res.json());
  return data;
}
export interface ContentResponse {
  data: {
    id: number;
    tmdbId: number;
    nameKr: string;
    nameEn: string;
    kind: 'DRAMA' | 'MOVIE';
    posterPath: string;
    releasedDate: string;
    rating: string;
    plot: string;
    person: any;
    genreResponseList: {
      tmdbId: number;
      name: string;
    }[];
    movieInfoResponse: any;
    dramaInfoResponse: any;
  }[];
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface Genre {
  id: number;
  name: string;
}
export interface Person {
  id: number;
  nameKr: string;
  birth: string | null;
}
export interface Keyword {
  id: number;
  word: string;
}
export interface Company {
  id: number;
  name: string;
}
export interface Channel {
  channel: string;
}
