import axios from 'axios';

class Product {
  private request;

  constructor() {
    this.request = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_HOST,
    });
  }

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
    const { data } = await this.request({
      url: `/api/products/${productId}/vendoritems/${vendoritemId}`,
      method: 'get',
    });

    return data;
  }

  async getOtherProduct(
    productId: string | undefined,
    itemId: string | undefined,
    vendoritemId: string | undefined
  ) {
    const { data } = await this.request({
      url: `/api/products/${productId}/brand-sdp/widget/brand-sdp?itemId=${itemId}&vendoritemId=${vendoritemId}`,
      method: 'get',
    });

    return data;
  }

  async getProductDetails(
    productId: string | undefined,
    itemId: string | undefined,
    vendoritemId: string | undefined
  ) {
    const { data } = await this.request({
      url: `/api/products/${productId}/items/${itemId}/vendoritems/${vendoritemId}`,
      method: 'get',
    });

    return data;
  }
}

export default new Product();
