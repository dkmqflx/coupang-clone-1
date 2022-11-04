import React from 'react';
import Head from 'next/head';
import { useGetProductInfo } from '../quries/product';

const HeadMeta = ({
  productId,
  vendoritemId,
}: {
  productId: string | undefined;
  vendoritemId: string | undefined;
}) => {
  const { data } = useGetProductInfo(productId, vendoritemId);

  return (
    <Head>
      <title>{`쿠팡 |  ${data?.itemName}`}</title>
      <meta property='og:type' content='website' />
      <meta property='og:title' content={data?.itemName} />
      <meta property='og:description' content='쿠팡 상품 페이지' />
    </Head>
  );
};

export default HeadMeta;
