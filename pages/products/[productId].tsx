import { useRouter } from 'next/router';
import ProductBreadCrumb from '../../src/components/ProductBreadCrumb';
import styled from '@emotion/styled';

export default function VendoritemPage() {
  const { query } = useRouter();
  const { productId }: { productId?: string } = query;

  return (
    <Container>
      <ProductBreadCrumb productId={productId}></ProductBreadCrumb>
    </Container>
  );
}

const Container = styled.div`
  width: 980px;
  margin: 20px auto;
  height: 100vh;
`;
