import React from 'react';
import Image from 'next/image';
import { imagesType } from '../../types/product';
import styled from '@emotion/styled';

const ProductInfoImage = ({ images }: { images: imagesType[] }) => {
  return (
    <Wrapper>
      <SideImages>
        {images.map(({ thumbnailImage, preloadImage }) => (
          <SideImage key={thumbnailImage}>
            <Image
              src={`https:${thumbnailImage}`}
              blurDataURL={`https:${preloadImage}`}
              width={48}
              height={48}
            ></Image>
          </SideImage>
        ))}
      </SideImages>

      <MainImage>
        <Image
          width={410}
          height={410}
          src={`https:${images[0].detailImage}`}
          blurDataURL={`https:${images[0].preloadImage}`}
        ></Image>
      </MainImage>
    </Wrapper>
  );
};

export default ProductInfoImage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const SideImages = styled.div`
  display: flex;
  flex-direction: column;
`;

const SideImage = styled.div`
  cursor: pointer;

  width: 50px;
  height: 50px;
  border-radius: 2px;

  &:not(:last-child) {
    margin-bottom: 4px;
  }

  &:hover {
    border: 2px solid #346aff;
  }
  box-sizing: border-box;
`;

const MainImage = styled.div`
  width: 410px;
  height: 410px;
  margin-left: 18px;
`;
