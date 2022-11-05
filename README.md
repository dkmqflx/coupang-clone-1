[3회차 : 상품 페이지 - 컴포넌트 ‘잘’ 나누기](https://thoughtful-arch-8c2.notion.site/f938e50503af4e4080d20de8d70bad48)

- 해당링크에서 문제를 확인할 수 있습니다.

---

## 상품 페이지 구현

- BreadCrumb 같은 경우에는 제공되는 API가 적용하기에 깔끔하지 않은 부분이 있었기 때문에 api Routes를 통해서 필요한 데이터를 받아올 수 있도록 처리했습니다.

```js
// pages/api/products/[productId]/breadcrumb-gnbmenu.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res
      .status(200)
      .json([
        '쿠팡 홈  >',
        '가전디지털  >',
        '1인방송 전문관  >',
        '카메라  >',
        '휴대폰',
      ]);
  }
}
```

- react-query를 직접 사용하는 것이 아니라 API request를 위한 추상화된 모듈을 가져다 사용할 수 있도록 아래처럼 useRequest 정의해주는 방식으로 react-query의 useQuery를 격리해주었습니다.

```js
// src/hoooks/useRequest.ts

import {
  QueryKey,
  QueryFunction,
  UseQueryOptions,
  useQuery,
} from 'react-query';

export const useRequest = (
  key: QueryKey,
  request: QueryFunction,
  option: UseQueryOptions
): any => {
  return useQuery(key, request, { ...option });
};
```

- 아래처럼 상품과 관련된 함수들을 가져다 사용할 수 있는 Product 클래스를 정의해서 모듈화시켜주었습니다.

```js
// src/services/product.service.ts

import axios from 'axios';

class Product {
  private request;

  constructor() {
    this.request = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_HOST,
    });
  }

...

  async getProductInfo(
    productId: string | undefined,
    vendoritemId: string | undefined
  ) {
    const { data } = await this.request({
      url: `/api/products/${productId}/vendoritems/${vendoritemId}`,
      method: 'get',
    });

    return data;
  }

...


}

export default new Product();



```

- 위에서 정의한 Product class와useRequest hook을 사용해서 필요한 상품 관련된 정보를 가져올 수 있는 query를 정의한 후 필요한 컴포넌트에서 사용할 수 있도록 했습니다.

```js
// src/quries/product.ts

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

export const useGetOhterProduct = (
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
```

---

## SEO

- product 정보를 불러온 후, 해당 product 제품에 맞는 title을 보여줄 수 있도록 구현했습니다.

```jsx
// src/components/HeadeMeta.tsx

import React from 'react';
import Head from 'next/head';
import { useGetProductInfo } from '../quries/product';
import { paramsType } from '../../types/params';

const HeadMeta = ({ productId, vendoritemId }: paramsType) => {
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
```
