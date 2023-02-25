import React from 'react';

import { numberFormat } from 'helpers';

import Loader from 'components/shared/atoms/Loader';
import { OrderRegistrationTotal, TotalPriceWithDelivery } from './styled';

type TTotalPrice = {
  loading: boolean;
  price: number;
};

const TotalPrice = ({ loading, price }: TTotalPrice) => {
  return (
    <OrderRegistrationTotal>
      Итого к оплате:
      <TotalPriceWithDelivery>
        {loading ? (
          <Loader variant="simple" size={22} $ml={8} $mr={16} />
        ) : (
          `${numberFormat(price)} руб.`
        )}
      </TotalPriceWithDelivery>
    </OrderRegistrationTotal>
  );
};

export default TotalPrice;
