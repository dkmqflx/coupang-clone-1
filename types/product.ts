export type imageType = {
  blurDataURL: string;
  height: number;
  src: string;
  width: number;
};

export type infoType = {
  brand: string;
  title: string;
  review: number;
  price: number;
  discountRatio: number;
  earnedPrice: number;
  ohterSeller: number;
  delivery: {
    date: string;
    condition: string;
  }[];
  appleCare: number;
  model: string[];
};

export type otherProductType = {
  image: imageType;
  title: string;
  price: number;
  review: number;
  rating: number;
};
