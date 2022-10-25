import React from 'react';
import styled from '@emotion/styled';
import { infoType } from '../../types/product';
import {
  Rate,
  Space,
  Divider,
  Checkbox,
  Button,
  InputNumber,
  Radio,
} from 'antd';

const ProductInfoDescription = ({ info }: { info: infoType }) => {
  const {
    brand,
    title,
    review,
    price,
    discountRatio,
    earnedPrice,
    ohterSeller,
    delivery,
    appleCare,
    model,
  } = info;
  return (
    <Wrapper>
      <Space direction='vertical' size={1}>
        <HightLightText>{brand}</HightLightText>
        <ItemTitle>{title}</ItemTitle>
        <Space align='center'>
          <Rating defaultValue={3} disabled={true}></Rating>
          <HightLightText>{`${review.toLocaleString()}개 상품평`}</HightLightText>
        </Space>
      </Space>

      <InfoDivider></InfoDivider>

      <Space direction='vertical'>
        <Price>{`${price.toLocaleString()}`}</Price>
        <Space>
          <Benefit>{`최대 ${discountRatio}% 카드 즉시할인`}</Benefit>
          <Benefit>{`최대 ${earnedPrice.toLocaleString()}원 적립}`}</Benefit>
        </Space>
      </Space>

      <InfoDivider></InfoDivider>

      <Space direction='vertical'>
        <Space direction='vertical' size={1}>
          <Space>
            <BoldText>무료배송</BoldText>
            <OtherSellerText>다른 판매자 보기({ohterSeller})</OtherSellerText>
          </Space>

          <Radio.Group value={0}>
            {delivery.map(({ date, condition }, index) => (
              <Radio key={date} value={index}>
                <Space size={1}>
                  <ArrivalBoldText>{date}</ArrivalBoldText>
                  <ArrivalText>도착 보장</ArrivalText>
                  <ArrivalPlainText>({condition})</ArrivalPlainText>
                </Space>
              </Radio>
            ))}
          </Radio.Group>
        </Space>
      </Space>

      <InfoDivider></InfoDivider>

      <Checkbox>
        <Space size={1}>
          <BoldText>AppleCare+</BoldText>
          <span>{appleCare.toLocaleString()}</span>
        </Space>
        <AppleCareText>우발적인 손상에 대한 보상을 받아보세요</AppleCareText>
      </Checkbox>

      <InfoDivider></InfoDivider>

      <Space>
        <OrderInput defaultValue={1} min={1}></OrderInput>
        <OrderButton size='large'>장바구니 담기</OrderButton>
        <OrderButton size='large' type='primary'>
          {`바로구매    >`}
        </OrderButton>
      </Space>

      <Ul>
        {model.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </Ul>
    </Wrapper>
  );
};

export default ProductInfoDescription;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HightLightText = styled.span`
  color: #346aff;
  font-size: 12px;
`;

const ItemTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const Rating = styled(Rate)`
  font-size: 12px !important;
  & li {
    margin-right: 4px !important;
  }
  & svg {
    width: 12px;
    height: 12px;
  }
`;

const Price = styled.div`
  color: #ae0000;
  font-size: 20px;
  line-height: 21px;
  font-weight: bold;
`;

const Benefit = styled.span`
  padding: 0 8px;
  height: 20px;
  border-radius: 10px;
  border: solid 1px #ccc;
  font-size: 12px;
`;

const InfoDivider = styled(Divider)`
  margin: 18px 0;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const OtherSellerText = styled.span`
  background-color: #fcfcfc;
  padding: 2px 4px;
  border: 1px solid #ddd;
  color: #346aff;
  font-size: 12px;
`;

const ArrivalBoldText = styled.span`
  font-weight: bold;
  color: #00891a;
  font-size: 14px;
`;

const ArrivalText = styled.span`
  color: #00891a;
`;

const ArrivalPlainText = styled.span`
  font-size: 12px;
`;

const AppleCareText = styled.div`
  font-size: 12px;
  color: #111;
  line-height: 18px;
  margin-top: 6px;
`;

const OrderButton = styled(Button)`
  width: 191px;
  height: 42px;
`;

const OrderInput = styled(InputNumber)`
  height: 42px;

  & input {
    height: 42px;
  }
`;

const Ul = styled.ul`
  margin-top: 16px;
  padding-left: 0;
  margin-left: 16px;
`;
