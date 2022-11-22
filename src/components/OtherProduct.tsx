import Image from 'next/image';
import React from 'react';
import { useGetOtherProduct } from '../quries/product';
import { otherProductType } from '../../types/product';
import { paramsType } from '../../types/params';
import styled from '@emotion/styled';
import { Space, Rate, Button } from 'antd';

const OtherProduct = ({ productId, vendoritemId, itemId }: paramsType) => {
  const { data } = useGetOtherProduct(productId, itemId, vendoritemId);

  if (!data) return null;

  const { brandName, claimText, logoImageUrl, itemTotal, items } = data;

  const previewItems = items?.slice(0, 4).map(
    ({
      itemId,
      imageUrl,

      ratingAverage,
      ratingCount,
      salesPrice,
      title,
    }: otherProductType) => ({
      itemId,
      imageUrl,

      ratingAverage,
      ratingCount,
      salesPrice,
      title,
    })
  );

  return (
    <div>
      <h2>{brandName}의 다른 상품들</h2>
      <ImageContainer>
        {previewItems?.map(
          ({
            itemId,
            imageUrl,
            ratingAverage,
            ratingCount,
            salesPrice,
            title,
          }: otherProductType) => (
            <Product key={itemId}>
              <Image
                src={`https:${imageUrl}`}
                blurDataURL={`https:${imageUrl}`}
                height={160}
                width={160}
              ></Image>
              <TitleText>{title}</TitleText>
              <Price>{`${salesPrice.toLocaleString()}원`}</Price>

              <Space>
                <Rating defaultValue={ratingAverage} disabled={true}></Rating>
                <ReviewCount>({ratingCount})</ReviewCount>
              </Space>
            </Product>
          )
        )}

        <Product>
          <ImageWrapper>
            <Image
              src={`https:${logoImageUrl}`}
              blurDataURL={`https:${logoImageUrl}`}
              height={140}
              width={140}
            ></Image>
          </ImageWrapper>

          <BrandInfoText>{claimText}</BrandInfoText>
          <BrandInfoText>
            총 <TotalCount>{itemTotal}</TotalCount> 개
          </BrandInfoText>
          <Button>브랜드샵 구경할까요?</Button>
        </Product>
      </ImageContainer>
    </div>
  );
};

export default OtherProduct;

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
