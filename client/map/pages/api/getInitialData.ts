// pages/api/getInitialMap.ts
import { getInitialGraph } from '@/map/hooks/getMapData';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { vertices, edges } = await getInitialGraph();
    res.status(200).json({ vertices, edges });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
