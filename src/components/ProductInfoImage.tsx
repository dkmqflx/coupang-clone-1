import React from 'react';
import Image from 'next/image';
import { imageType } from '../../types/product';
import styled from '@emotion/styled';

const ProductInfoImage = ({
  main,
  side,
}: {
  main: imageType;
  side: imageType[];
}) => {
  return (
    <Wrapper>
      <SideImages>
        {side.map(({ blurDataURL, src, height, width }) => (
          <SideImage key={src}>
            <Image
              src={src}
              blurDataURL={blurDataURL}
              height={height}
              width={width}
            ></Image>
          </SideImage>
        ))}
      </SideImages>

      <MainImage>
        <Image
          width={main.width}
          height={main.height}
          src={main.src}
          blurDataURL={main.blurDataURL}
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
