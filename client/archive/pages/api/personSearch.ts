import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, areas, page, genders, ages } = req.query;

  try {
    const response = await fetch(
      `http://j9a602.p.ssafy.io/api/person/search?nameKr=${title}&areas=${areas}&genders=${genders}&ages=${ages}&page=${page}&size=20`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};
