import axios from 'axios';
import { useQuery } from 'react-query';

const getProductList = async (productId: string | undefined) => {
  const { data } = await axios({
    url: `/api/products/${productId}/breadcrumb-gnbmenu`,
    method: 'get',
  });

  return data;
};

export const useGetProductBreadCrumb = (productId: string | undefined) => {
  return useQuery(
    [`product-breadcrumb-${productId}`],
    () => getProductList(productId),
    {
      enabled: productId !== undefined,
    }
  );
};

const getProductInfo = async (
  productId: string | undefined,
  vendoritemId: string | undefined
) => {
  const { data } = await axios({
    url: `/api/products/${productId}/vendoritems/${vendoritemId}`,
    method: 'get',
  });

  return data;
};

export const useGetProductInfo = (
  productId: string | undefined,
  vendoritemId: string | undefined
) => {
  return useQuery(
    [`product-${productId}-${vendoritemId}`],
    () => getProductInfo(productId, vendoritemId),
    {
      enabled: productId !== undefined && vendoritemId !== undefined,
    }
  );
};

const getOhterProduct = async (
  productId: string | undefined,
  itemId: string | undefined,
  vendoritemId: string | undefined
) => {
  const { data } = await axios({
    url: `/api/products/${productId}/brand-sdp/widget/brand-sdp?itemId=${itemId}&vendoritemId=${vendoritemId}`,
    method: 'get',
  });

  return data;
};

export const useGetOhterProduct = (
  productId: string | undefined,
  itemId: string | undefined,
  vendoritemId: string | undefined
) => {
  return useQuery(
    [`product-other-${productId}${itemId}-${vendoritemId}`],
    () => getOhterProduct(productId, itemId, vendoritemId),
    {
      enabled:
        productId !== undefined &&
        itemId !== undefined &&
        vendoritemId !== undefined,
    }
  );
};
