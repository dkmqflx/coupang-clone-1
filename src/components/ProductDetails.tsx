import React from 'react';
import Image from 'next/image';
import { useGetProductDetails } from '../quries/product';
import { detailImageType } from '../../types/product';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const ProductDetails = ({
  productId,
  vendoritemId,
  itemId,
}: {
  productId: string | undefined;
  vendoritemId: string | undefined;
  itemId: string | undefined;
}) => {
  const { data } = useGetProductDetails(productId, itemId, vendoritemId);

  if (!data) return null;

  const { essentials, details } = data;

  const detailImages = details
    ?.slice(0, 2)
    .map(
      (item: detailImageType) => item.vendorItemContentDescriptions[0].content
    );

  return (
    <Wrapper>
      <Ul>
        <Li selected={true}>상품상세</Li>
        <Li selected={false}>상품평</Li>
        <Li selected={false}>상품문의</Li>
        <Li selected={false}>배송/교환/반품 안내</Li>
      </Ul>
      <Title>필수 표기정보</Title>
      <Table>
        <colgroup>
          <col width='150px' />
          <col width='340px' />
          <col width='150px' />
          <col width='*' />
        </colgroup>

        <tbody>
          {essentials?.map(
            (_: { title: string; description: string }, index: number) =>
              index % 4 === 0 && (
                <tr key={index}>
                  <Th>{essentials[index].title}</Th>
                  <Td>{essentials[index].description} </Td>
                  <Th>{essentials[index + 1].title}</Th>
                  <Td>{essentials[index + 1].description} </Td>
                </tr>
              )
          )}
        </tbody>
      </Table>

      {detailImages?.map((url: string) => (
        <ImageContainer key={url}>
          <Image src={`https:${url}`} layout='fill' objectFit='contain'></Image>
        </ImageContainer>
      ))}
    </Wrapper>
  );
};

export default ProductDetails;

const Wrapper = styled.div`
  margin-top: 48px;
  height: 100%;
`;

const Ul = styled.ul`
  border-top: 2px solid #555;
  border-left: 1px solid #ccc;
  list-style-type: none;
  padding: 0;
`;

const Li = styled.li<{ selected: boolean }>`
  background: #fff;
  border-bottom: 1px solid #ccc;
  color: #111;

  display: inline-block;
  padding: 15px 20px 14px;
  width: 25%;
  border-right: 1px solid #ccc;
  background-color: #fafafa;
  text-align: center;
  color: #555;
  font-weight: bold;
  font-size: 16px;
  box-sizing: border-box;
  cursor: pointer;

  ${({ selected }) =>
    selected &&
    css`
      background: #fff;
      border-bottom: none;
    `}
`;

const Table = styled.table`
  width: 100%;
`;

const Th = styled.th`
  padding: 12px 16px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  background-color: #fafafa;
  color: #111;
  font-weight: 400;
  font-size: 12px;
`;

const Td = styled.td`
  white-space: normal;
  word-break: break-all;
  padding: 12px 16px;
  color: #333;
  border-bottom: 1px solid #eee;
  border-right: none;
  border-left: none;
  border-top: none;
  line-height: 17px;
  font-size: 12px;
`;

const MoreInfo = styled.p`
  width: 100%;
  padding: 12px 0;
  text-align: center;
  border-bottom: 1px solid #eee;
`;

const Title = styled.h3`
  padding-bottom: 10px;
  font-size: 14px;
  font-weight: 700;
`;

const ImageContainer = styled.div`
  width: 780px;
  height: 100%;
  position: relative;
  margin: 0 auto;
`;
