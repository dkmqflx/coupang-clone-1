import { useRequest } from './../hooks/useRequest';
import Product from '../services/product.service';

export const useGetProductBreadCrumb = (productId: string | undefined) => {
  return useRequest(
    [`product-breadcrumb-${productId}`],
    () => Product.getProductList(productId),
    {
      enabled: productId !== undefined,
    }
  );
};

export const useGetProductInfo = (
  productId: string | undefined,
  vendoritemId: string | undefined
) => {
  return useRequest(
    [`product-${productId}-${vendoritemId}`],
    () => Product.getProductInfo(productId, vendoritemId),
    {
      enabled: productId !== undefined && vendoritemId !== undefined,
    }
  );
};

export const useGetOtherProduct = (
  productId: string | undefined,
  itemId: string | undefined,
  vendoritemId: string | undefined
) => {
  return useRequest(
    [`product-other-${productId}${itemId}-${vendoritemId}`],
    () => Product.getOtherProduct(productId, itemId, vendoritemId),
    {
      enabled:
        productId !== undefined &&
        itemId !== undefined &&
        vendoritemId !== undefined,
    }
  );
};

export const useGetProductDetails = (
  productId: string | undefined,
  itemId: string | undefined,
  vendoritemId: string | undefined
) => {
  return useRequest(
    [`product-details-${productId}${itemId}-${vendoritemId}`],
    () => Product.getProductDetails(productId, itemId, vendoritemId),
    {
      enabled:
        productId !== undefined &&
        itemId !== undefined &&
        vendoritemId !== undefined,
    }
  );
};
