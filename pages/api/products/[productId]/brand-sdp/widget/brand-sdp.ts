import { NextApiRequest, NextApiResponse } from 'next';
import other1 from '/public/images/other1.jpeg';
import other2 from '/public/images/other2.jpeg';
import other3 from '/public/images/other3.jpeg';
import other4 from '/public/images/other4.jpeg';
import other5 from '/public/images/other5.jpeg';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.status(200).json({
      items: [
        {
          image: other1,
          title: 'Apple 정품 아이폰 14 자급제, 블루, 128GB',
          price: 1225000,
          review: 1015,
          rating: 5,
        },
        {
          image: other2,
          title: 'Apple 정품 아이폰 14 Pro Max 자급제, 스페이스블랙, 256GB',
          price: 1900000,
          review: 964,
          rating: 5,
        },

        {
          image: other3,
          title: 'Apple 정품 아이폰 14 자급제, 스타라이트, 128GB',
          price: 1173870,
          review: 1015,
          rating: 5,
        },
        {
          image: other4,
          title: 'Apple 정품 아이폰 14 Pro Max 자급제, 스페이스블랙, 128GB',
          price: 1750000,
          review: 964,
          rating: 5,
        },
      ],
      brand: {
        image: other5,
        count: 839,
      },
    });
  }
}
