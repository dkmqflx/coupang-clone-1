import { useRouter } from 'next/router';
import ProductBreadCrumb from '../../src/components/ProductBreadCrumb';
import ProductInfo from '../../src/components/ProductInfo';
import OhterProduct from '../../src/components/OhterProduct';
import styled from '@emotion/styled';
import ProductDetails from '../../src/components/ProductDetails';
import HeadMeta from '../../src/components/HeadMeta';

export default function VendoritemPage() {
  const { query } = useRouter();
  const {
    productId,
    vendoritemId,
    itemId,
  }: { productId?: string; vendoritemId?: string; itemId?: string } = query;

  return (
    <Container>
      <HeadMeta productId={productId} vendoritemId={vendoritemId}></HeadMeta>
      <ProductBreadCrumb productId={productId}></ProductBreadCrumb>
      <ProductInfo
        productId={productId}
        vendoritemId={vendoritemId}
      ></ProductInfo>
      <OhterProduct
        productId={productId}
        vendoritemId={vendoritemId}
        itemId={itemId}
      ></OhterProduct>
      <ProductDetails
        productId={productId}
        vendoritemId={vendoritemId}
        itemId={itemId}
      ></ProductDetails>
    </Container>
  );
}

const Container = styled.div`
  width: 980px;
  margin: 20px auto;
  height: 100vh;
`;
