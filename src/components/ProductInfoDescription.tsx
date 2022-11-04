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
import Image from 'next/image';

const ProductInfoDescription = ({ info }: { info: infoType }) => {
  const {
    brand,
    itemName,
    buyableQuantity,
    ratings,
    price,
    ccid,
    cashBack,
    otherSellerCount,
    delivery,
    insurance,
    sellingInfo,
  } = info;

  return (
    <Wrapper>
      <Space direction='vertical' size={1}>
        <HightLightText>{brand}</HightLightText>
        <ItemTitle>{itemName}</ItemTitle>

        <Space align='center'>
          <Rating defaultValue={ratings.ratingAverage} disabled={true}></Rating>
          <HightLightText>{`${ratings.ratingCount.toLocaleString()}개 상품평`}</HightLightText>
        </Space>
      </Space>

      <InfoDivider></InfoDivider>

      <Space direction='vertical'>
        <Space size={2}>
          <DiscountRatio>{`${price.discountRate}%`}</DiscountRatio>
          <OriginalPrice>{`${price.originPrice}${price.priceUnit}`}</OriginalPrice>
        </Space>

        <Price>{`${price.salePrice.toLocaleString()}${price.priceUnit}`}</Price>
        <Space>
          <Benefit>
            <Image
              src={`https:${ccid.iconUrl}`}
              width={14}
              height={10}
              alt={ccid.ccidText}
            />
            <span>{`${ccid.ccidText}`}</span>
          </Benefit>

          <Benefit>
            <Image
              src={`https:${cashBack.iconUrl}`}
              width={14}
              height={10}
              alt={cashBack.iconUrl}
            />
            <span>{`최대 ${cashBack.finalCashBackAmt.toLocaleString()}원 적립`}</span>
          </Benefit>
        </Space>
      </Space>

      <InfoDivider></InfoDivider>

      <Space direction='vertical'>
        <Space direction='vertical' size={1}>
          <Space>
            <BoldText>무료배송</BoldText>
            <OtherSellerText>
              다른 판매자 보기({otherSellerCount})
            </OtherSellerText>
          </Space>

          <Radio.Group value={0}>
            {delivery.map(({ descriptions, countDown }, index) => (
              <Radio key={index} value={index}>
                <Space size={1}>
                  <ArrivalBoldText>{descriptions}</ArrivalBoldText>
                  <ArrivalText>도착 보장</ArrivalText>
                  {countDown && (
                    <ArrivalPlainText>({countDown})</ArrivalPlainText>
                  )}
                </Space>
              </Radio>
            ))}
          </Radio.Group>
        </Space>
      </Space>

      <InfoDivider></InfoDivider>

      <Checkbox>
        <Space align='center' size={2}>
          <Image
            src={`${insurance.iconUrl}`}
            width={20}
            height={20}
            alt={insurance.name}
            style={{ marginTop: '4px' }}
          />

          <BoldText>{insurance.name}</BoldText>
          <span>{insurance.price.toLocaleString()}</span>
        </Space>
        <AppleCareText>{insurance.description}</AppleCareText>
      </Checkbox>

      <InfoDivider></InfoDivider>

      <Space>
        <OrderInput defaultValue={buyableQuantity} min={1}></OrderInput>
        <OrderButton size='large'>장바구니 담기</OrderButton>
        <OrderButton size='large' type='primary'>
          {`바로구매    >`}
        </OrderButton>
      </Space>

      <Ul>
        {sellingInfo.map((item) => (
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

const DiscountRatio = styled.span`
  font-size: 14px;
  color: #111;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #888;
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
  vertical-align: middle;

  span {
    margin-left: 4px;
  }
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
