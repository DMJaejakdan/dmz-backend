import useSWR from 'swr';

function useAutocomplete(type: string, input: string) {
  const url = input ? `/api/genreAutocomplete?${type}Pre=${input}` : null;
  const { data, error } = useSWR(url);

  return {
    data,
    error,
  };
}

useAutocomplete;
