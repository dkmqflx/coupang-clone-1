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
