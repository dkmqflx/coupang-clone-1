import styled from '@emotion/styled';
import React from 'react';
import { useGetProductInfo } from '../quries/product';
import ProductInfoDescription from './ProductInfoDescription';
import ProductInfoImage from './ProductInfoImage';
import { paramsType } from '../../types/params';

const ProductInfo = ({ productId, vendoritemId }: paramsType) => {
  const { data } = useGetProductInfo(productId, vendoritemId);

  if (!data) return null;

  const {
    images,
    itemId,
    itemName,
    ratingAverage,
    ratingCount,
    otherSellerCount,
    sellingInfoVo,
    quantityBase,
    buyableQuantity,
    ccidInfo,
    cashBackSummary,
  } = data;

  const info = {
    id: itemId,
    brand: 'Apple',
    itemName,
    buyableQuantity,

    ratings: {
      ratingCount,
      ratingAverage,
    },

    price: {
      originPrice: quantityBase[0].price.originPrice,
      salePrice: quantityBase[0].price.salePrice,
      discountRate: quantityBase[0].price.discountRate,
      priceUnit: quantityBase[0].priceUnit,
    },

    ccid: {
      ccidText: ccidInfo.simpleInfo.ccidText,
      iconUrl: ccidInfo.simpleInfo.iconUrl,
    },
    cashBack: {
      finalCashBackAmt: cashBackSummary.finalCashBackAmt,
      iconUrl: cashBackSummary.cashIconUrl,
    },

    otherSellerCount,

    delivery: quantityBase[0].deliveryList.map(
      ({
        badgeUrl,
        descriptions,
        countDownMessage,
      }: {
        badgeUrl: string;
        descriptions: string;
        countDownMessage: string;
      }) => ({
        badgeUrl,
        descriptions: descriptions.replace(/<[^>]+>/g, ''),
        countDown: countDownMessage?.replace(/<[^>]+>/g, ''),
      })
    ),

    insurance: {
      iconUrl: quantityBase[0].bundleOption.options[0].icon,
      name: quantityBase[0].bundleOption.options[0].items[0].name,
      price: quantityBase[0].bundleOption.options[0].items[0].price,
      description: quantityBase[0].bundleOption.options[0].items[0].description,
    },

    sellingInfo: sellingInfoVo.sellingInfo,
  };

  return (
    <Wrapper>
      <ProductInfoImage images={images}></ProductInfoImage>
      <ProductInfoDescription info={info}></ProductInfoDescription>
    </Wrapper>
  );
};

export default ProductInfo;

const Wrapper = styled.div`
  display: flex;
  margin-top: 18px;
`;
