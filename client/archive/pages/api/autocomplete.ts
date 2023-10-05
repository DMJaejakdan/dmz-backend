import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { type, genrePre } = req.query;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ROOT}/api/content/auto/${type}?${type}Pre=${genrePre}`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};