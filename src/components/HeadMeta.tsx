import Head from 'next/head';
import { useGetProductInfo } from '../quries/product';
import { paramsType } from '../../types/params';

const HeadMeta = ({ productId, vendoritemId }: paramsType) => {
  const { data } = useGetProductInfo(productId, vendoritemId);

  return (
    <Head>
      <title>{`쿠팡 |  ${data ? data.itemName : ''}`}</title>
      <meta property='og:type' content='website' />
      <meta property='og:title' content={data?.itemName} />
      <meta property='og:description' content='쿠팡 상품 페이지' />
    </Head>
  );
};

export default HeadMeta;
