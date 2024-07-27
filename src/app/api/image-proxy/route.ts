import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    res.status(400).json({ error: 'URL parameter is required and must be a string' });
    return;
  }
  res.status(202).send("kek")

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    const contentType = response.headers['content-type'];
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }

    res.status(200).send(response.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
