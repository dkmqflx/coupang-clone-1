export type imagesType = {
  detailImage: string;
  origin: string;
  preloadImage: string;
  thumbnailImage: string;
};

export type infoType = {
  id: number;
  brand: string;
  itemName: string;
  buyableQuantity: number;

  ratings: {
    ratingCount: number;
    ratingAverage: number;
  };

  price: {
    originPrice: string;
    salePrice: string;
    discountRate: string;
    priceUnit: string;
  };

  ccid: {
    ccidText: string;
    iconUrl: string;
  };
  cashBack: {
    finalCashBackAmt: number;
    iconUrl: string;
  };

  otherSellerCount: number;

  delivery: {
    descriptions: string;
    countDown: string;
  }[];

  insurance: {
    iconUrl: string;
    name: string;
    price: string;
    description: string;
  };

  sellingInfo: string[];
};

export type otherProductType = {
  itemId: number;
  imageUrl: string;
  ratingAverage: number;
  ratingCount: number;
  salesPrice: number;
  title: string;
};

export type detailImageType = {
  contentType: string;
  cssClass: string;

  vendorItemContentDescriptions: {
    content: string;
    cssClass: string;
    detailType: string;
    imageType: boolean;
  }[];
};
