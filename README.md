- [3회차 : 상품 페이지 - 컴포넌트 ‘잘’ 나누기](https://thoughtful-arch-8c2.notion.site/f938e50503af4e4080d20de8d70bad48)

  - 해당링크에서 문제를 확인할 수 있습니다.

- [배포 URL](https://63663d83d644a75437bc70fa--dancing-biscotti-24688b.netlify.app/products/1?vendoritemId=1&itemId=1)

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

<br/>

- react-query를 직접 사용하는 것이 아니라 API request를 위한 추상화된 모듈을 가져다 사용할 수 있도록 아래처럼 useRequest 정의해주는 방식으로 react-query의 useQuery를 격리해주었습니다.

```js
// src/hoooks/useRequest.ts

import { useQuery } from 'react-query';

type QueryOptions = {
  refetchInterval?: number,
  enabled?: boolean,
};

export const useRequest = (
  key: string | string[],
  request: () => Promise<any>,
  option?: QueryOptions
) => {
  return useQuery(key, request, { ...option });
};
```

<br/>

- 그리고 상품과 관련된 함수들을 가져다 사용할 수 있는 Product 클래스를 정의해서 모듈화시켜주었습니다.

```js
// src/services/product.service.ts

import axios from 'axios';
import Service from './service';

class Product extends Service {
  async getProductList(productId: string | undefined) {
    const { data } = await axios({
      url: `/api/products/${productId}/breadcrumb-gnbmenu`,
      method: 'get',
    });

    return data;
  }

  async getProductInfo(
    productId: string | undefined,
    vendoritemId: string | undefined
  ) {
    const { data } = await super.get(
      `/api/products/${productId}/vendoritems/${vendoritemId}`
    );

    return data;
  }

  async getOtherProduct(
    productId: string | undefined,
    itemId: string | undefined,
    vendoritemId: string | undefined
  ) {
    const { data } = await super.get(
      `/api/products/${productId}/brand-sdp/widget/brand-sdp?itemId=${itemId}&vendoritemId=${vendoritemId}`
    );

    return data;
  }

  async getProductDetails(
    productId: string | undefined,
    itemId: string | undefined,
    vendoritemId: string | undefined
  ) {
    const { data } = await super.get(
      `/api/products/${productId}/items/${itemId}/vendoritems/${vendoritemId}`
    );

    return data;
  }
}

export default new Product();
```

<br/>

- 위에서 정의한 Product class와 useRequest hook을 사용해서 필요한 상품 관련된 정보를 가져올 수 있는 query를 정의한 후 필요한 컴포넌트에서 사용할 수 있도록 했습니다.

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
```

---

<br/>

## SEO

- product 정보를 불러온 후, 해당 product 제품에 맞는 title을 보여주고 페이지에 해당하는 정보를 meta 태그에 추가해주었습니다.

```jsx
// src/components/HeadeMeta.tsx
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
```
