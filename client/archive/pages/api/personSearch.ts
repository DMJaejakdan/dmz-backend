import { NextApiRequest, NextApiResponse } from 'next';

const personSearch = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, areas, page, genders, ages } = req.query;
  const params = [];
  if (title) params.push(`nameKr=${title}`);
  if (areas) params.push(`areas=${areas}`);
  if (genders) params.push(`genders=${genders}`);
  if (ages) params.push(`ages=${ages}`);
  if (page) params.push(`page=${page}`);
  params.push(`page=${page}`, 'size=20', 'sort=nameKr,des');

  const Url = `${
    process.env.NEXT_PUBLIC_ROOT
  }/dmzarchive/api/person/search?${params.join('&')}`;
  try {
    const response = await fetch(Url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};
export default personSearch;
