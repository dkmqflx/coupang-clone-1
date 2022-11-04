import React from 'react';
import { useGetProductBreadCrumb } from '../quries/product';
import { paramsType } from '../../types/params';
import styled from '@emotion/styled';

const ProductBreadCrumb = ({ productId }: paramsType) => {
  const { data } = useGetProductBreadCrumb(productId);

  return (
    <BreadCrumbUl>
      {data?.map((item: string) => (
        <BreadCrumbLi key={item}>{item}</BreadCrumbLi>
      ))}
    </BreadCrumbUl>
  );
};

export default ProductBreadCrumb;

const BreadCrumbUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
`;
const BreadCrumbLi = styled.li`
  font-size: 11px;
  color: #333;

  &:not(:last-child) {
    margin-right: 8px;
  }
`;
