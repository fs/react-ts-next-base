import React from 'react';

import { useOrders } from 'lib/apollo/hooks/state/orders';

import { PLACED } from 'config/constants/checkoutStatus';
import { numberFormat } from 'helpers';

import Icon from 'components/shared/atoms/Icon';
import Loader from 'components/shared/atoms/Loader';
import OrderDetails from 'components/shared/organisms/OrderDetails';

import { Header, Amount, Description, OrderDetailsWrapper, Footer } from './styled';

const ModalOrderDetailsForm = ({ company, orderId }) => {
  const {
    id: companyId,
    officialName,
    legalForm: { shortName: legalFormShortName },
  } = company;

  const { loading, orders } = useOrders({ companyId, orderId, checkoutStatus: PLACED });
  const [order] = orders;
  const { quantity, itemPrice } = order || {};

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header>
            <Amount>{numberFormat(itemPrice * quantity)} руб.</Amount>
            <Description>
              После закрытия сделки деньги будут переведены от {legalFormShortName} “{officialName}”
            </Description>
          </Header>
          <OrderDetailsWrapper>
            <OrderDetails order={order} />
          </OrderDetailsWrapper>
          <Footer>
            <Icon name="timer" $color="green" $size={22} $mr={16} />
            Если покупатель не откроет спор после получения заказа, деньги поступят не позднее
            &nbsp;
            <strong>19.06.19</strong>
          </Footer>
        </>
      )}
    </>
  );
};

export default ModalOrderDetailsForm;
