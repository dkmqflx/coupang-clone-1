import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res
      .status(200)
      .json([
        '쿠팡 홈  >',
        '가전디지털  >',
        ' 1인방송 전문관  >',
        '카메라  >',
        '휴대폰',
      ]);
  }
}
