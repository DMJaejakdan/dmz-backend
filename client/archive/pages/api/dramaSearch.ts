import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    title,
    genre,
    dramaDateF,
    dramaDateT,
    dramaGenre,
    dramaPerson,
    page,
    keyword,
    story,
    channel,
    company,
  } = req.query;

  try {
    const response = await fetch(
      `http://j9a602.p.ssafy.io/api/content/search?kind=DRAMA&nameKr=${title}&genres=${genre}&sDate=${dramaDateF}&eDate=${dramaDateT}&genres=${dramaGenre}&people=${dramaPerson}&page=${page}&keywords=${keyword}&plot=${story}&companies=${company}&channels=${channel}&size=20&sort=nameKr,des`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};
