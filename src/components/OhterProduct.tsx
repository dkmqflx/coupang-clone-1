import Image from 'next/image';
import React from 'react';
import { useGetOhterProduct } from '../quries/product';
import { otherProductType } from '../../types/product';
import styled from '@emotion/styled';
import { Space, Rate, Button } from 'antd';

const OhterProduct = ({
  productId,
  vendoritemId,
  itemId,
}: {
  productId: string | undefined;
  vendoritemId: string | undefined;
  itemId: string | undefined;
}) => {
  const { data } = useGetOhterProduct(productId, itemId, vendoritemId);

  if (!data) return null;

  const { brand, items } = data;

  return (
    <div>
      <h2>Apple의 다른 상품들</h2>
      <ImageContainer>
        {items.map(
          ({ image, title, price, review, rating }: otherProductType) => (
            <Product key={title}>
              <Image
                src={image.src}
                blurDataURL={image.blurDataURL}
                height={image.height}
                width={image.width}
              ></Image>
              <TitleText>{title}</TitleText>
              <Price>{`${price.toLocaleString()}원`}</Price>
              <Space>
                <Rating defaultValue={rating} disabled={true}></Rating>
                <ReviewCount>({review})</ReviewCount>
              </Space>
            </Product>
          )
        )}

        <Product>
          <ImageWrapper>
            <Image
              src={brand.image.src}
              blurDataURL={brand.image.blurDataURL}
              height={brand.image.height}
              width={brand.image.width}
            ></Image>
          </ImageWrapper>

          <BrandInfoText>
            같은 브랜드 상품을 한곳에서 모아볼 수 있어요!
          </BrandInfoText>
          <BrandInfoText>
            총 <TotalCount>{brand.count}</TotalCount> 개
          </BrandInfoText>
          <Button>브랜드샵 구경할까요?</Button>
        </Product>
      </ImageContainer>
    </div>
  );
};

export default OhterProduct;

const Product = styled.li`
  display: flex;
  flex-direction: column;
  width: 160px;

  &:not(:first-of-type) {
    margin-left: 45px;
  }
`;

const ImageContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
`;

const ImageWrapper = styled.div`
  width: 144px;
  height: 144px;
`;

const Price = styled.div`
  color: #ae0000;
  font-size: 13px;
  line-height: 21px;
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

const TitleText = styled.div`
  font-size: 12px;
  color: #111;
  line-height: 18px;
  margin-top: 6px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReviewCount = styled.span`
  color: #888;
  font-size: 12px;
`;

const BrandInfoText = styled.span`
  margin-bottom: 10px;
  color: #212b36;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
`;

const TotalCount = styled.span`
  color: #346aff;
  font-size: 12px;
  font-weight: bold;
`;
