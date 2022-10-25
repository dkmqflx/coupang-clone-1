import { NextApiRequest, NextApiResponse } from 'next';
import main from '/public/images/main.jpeg';
import one from '/public/images/1.jpg';
import two from '/public/images/2.jpg';
import three from '/public/images/3.jpg';
import four from '/public/images/4.jpg';
import five from '/public/images/5.jpg';
import six from '/public/images/6.jpg';
import seven from '/public/images/7.jpg';
import eight from '/public/images/8.jpg';
import nine from '/public/images/9.jpg';
import ten from '/public/images/10.jpg';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    console.log(one);
    res.status(200).json({
      images: {
        main,
        side: [one, two, three, four, five, six, seven, eight, nine, ten],
      },
      info: {
        brand: 'apple',
        title: 'Apple 아이폰 13 mini 자급제',
        review: 12726,
        price: 10272000,
        discountRatio: 5,
        earnedPrice: 500000,
        ohterSeller: 2,
        delivery: [
          {
            date: '내일(토) 7/16',
            condition: '22시간 31분 내 주문 시 / 서울⋅경기 기준',
          },
          {
            date: '내일(토) 7/16 새벽 7시 전',
            condition: '오후 4시 30분 전 주문 시 / 서울⋅경기 기준',
          },
        ],
        appleCare: 179000,
        model: [
          '모델명/품번: MLK13KH/A',
          '화면크기: 13.76cm',
          '화면크기(인치): 약 5.4인치에 해당함',
          '탈착 방식: 배터리 일체형',
          'RAM용량: 4GB',
          '쿠팡상품번호: 6091199461 - 11356857104',
        ],
      },
    });
  }
}
