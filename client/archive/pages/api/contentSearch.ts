import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    movieTitle = '',
    movieGenre = '',
    movieDateF = '',
    movieDateT = '',
    moviePerson = '',
    page = 1,
    keyword = '',
    story = '',
    company = '',
  } = req.query;
  const baseUrl = `${process.env.NEXT_PUBLIC_ROOT}/api/content/search`;
  const params = [];
  params.push('kind=MOVIE');
  if (movieTitle) params.push(`nameKr=${movieTitle}`);
  if (movieDateF) params.push(`sDate=${movieDateF}`);
  if (movieDateT) params.push(`eDate=${movieDateT}`);
  if (movieGenre) params.push(`genres=${movieGenre}`);
  if (moviePerson) params.push(`people=${moviePerson}`);
  if (keyword) params.push(`keywords=${keyword}`);
  if (story) params.push(`plot=${story}`);
  if (company) params.push(`companies=${company}`);
  params.push('page=1', 'size=5', 'sort=nameKr,des');

  const Url = `${baseUrl}?${params.join('&')}`;
  try {
    const response = await fetch(Url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};
