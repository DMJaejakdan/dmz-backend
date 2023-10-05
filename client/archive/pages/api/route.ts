import { Router, useRouter } from 'next/router';

export async function AC(type: string, input: string) {
  const url = `/api/autocomplete?type=${type}&genrePre=${input}`;
  const data = await fetch(url).then(res => res.json());
  return data;
}
export async function person(input: string) {
  const url = `http://j9a602.p.ssafy.io/api/content/auto/person?personPre=${input}`;
  const data = await fetch(url).then(res => res.json());
  return data;
}
export async function keyword(input: string) {
  const url = `http://j9a602.p.ssafy.io/api/content/auto/keyword?keywordPre=${input}`;
  const data = await fetch(url).then(res => res.json());
  return data;
}
export async function company(input: string) {
  const url = `http://j9a602.p.ssafy.io/api/content/auto/company?companyPre=${input}`;
  const data = await fetch(url).then(res => res.json());
  return data;
}

export async function search(
  title: string,
  genre: string,
  person: string,
  keyword: string,
  story: string,
  time: string,
  company: string,
  ott: string,
  grade: string
) {
  const router = useRouter();
  const data = 3;
  if (data)
    router.push({
      pathname: '/result',
      query: { data },
    });
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
