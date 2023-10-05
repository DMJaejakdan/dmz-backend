import { useState } from 'react';

export function useMovieSearch() {
  const [title, setTitle] = useState<string>('');
  const [genre, setGenre] = useState<string[]>(['']);
  const [person, setPerson] = useState<string[]>(['']);
  const [keyword, setKeyword] = useState<string[]>(['']);
  const [story, setStory] = useState<string>('');
  const [timeFrom, setTimeFrom] = useState<string>('');
  const [timeTo, setTimeTo] = useState<string>('');
  const [company, setCompany] = useState<string[]>(['']);
  const [ott, setOtt] = useState<string[]>(['']);
  const [grade, setGrade] = useState<string[]>(['']);

  function searchMovie() {}
  function isValid() {}

  return {
    title,
    setTitle,
    genre,
    setGenre,
    person,
    setPerson,
    keyword,
    setKeyword,
    story,
    setStory,
    timeFrom,
    setTimeFrom,
    timeTo,
    setTimeTo,
    company,
    setCompany,
    ott,
    setOtt,
    grade,
    setGrade,
    searchMovie,
    isValid,
  };
}
