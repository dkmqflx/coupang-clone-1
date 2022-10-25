import styled from '@emotion/styled';
import React from 'react';
import { useGetProductInfo } from '../quries/product';
import ProductInfoDescription from './ProductInfoDescription';
import ProductInfoImage from './ProductInfoImage';

const ProductInfo = ({
  productId,
  vendoritemId,
}: {
  productId: string | undefined;
  vendoritemId: string | undefined;
}) => {
  const { data } = useGetProductInfo(productId, vendoritemId);

  if (!data) return null;

  const {
    images: { main, side },
    info,
  } = data;

  return (
    <Wrapper>
      <ProductInfoImage main={main} side={side}></ProductInfoImage>
      <ProductInfoDescription info={info}></ProductInfoDescription>
    </Wrapper>
  );
};

export default ProductInfo;

const Wrapper = styled.div`
  display: flex;
  margin-top: 18px;
`;
