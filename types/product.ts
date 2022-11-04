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
  image: {
    blurDataURL: string;
    height: number;
    src: string;
    width: number;
  };
  title: string;
  price: number;
  review: number;
  rating: number;
};
