import { numberFormat } from 'helpers';
import React from 'react';
import { ColDeliveryDate, Count, RightCol, Row, TotalCoast } from '../../styled';
import { TTotalContent } from './types';

export const TotalContent: React.FunctionComponent<TTotalContent> = ({ quantity, totalCoast }) => {
  return (
    <Row>
      <ColDeliveryDate>
        <span>
          Количество товаров:
          <Count>{quantity}</Count>
        </span>
      </ColDeliveryDate>
      <RightCol>
        <span>
          <strong>ИТОГО:</strong>
          <TotalCoast>{numberFormat(totalCoast)} руб.</TotalCoast>
        </span>
      </RightCol>
    </Row>
  );
};

export default TotalContent;
