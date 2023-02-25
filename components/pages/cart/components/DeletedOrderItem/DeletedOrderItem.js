import React from 'react';

import { useDestroyOrder } from 'lib/apollo/hooks/actions/order';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';

import { DeletedItemWrapper, ProductImg, CloseButtonWrapper } from './styled';
import { deletionReasons, reasonTitles } from './constants';

const DeletedOrderItem = ({ order }) => {
  const {
    id: orderId,
    deletionReason,
    product: { name: productName },
    variant,
  } = order;
  const { variantPhotos } = variant;

  const [destroyOrder] = useDestroyOrder({ orderId });

  const reason = reasonTitles[deletionReasons[deletionReason]];

  return (
    <DeletedItemWrapper>
      <ProductImg>
        <img src={variantPhotos[0]?.imageUrl} alt={productName} />
      </ProductImg>
      <p>
        Заказ № {orderId} был удален из Корзины, так как {reason}
      </p>
      <CloseButtonWrapper>
        <Button
          variant="hollow"
          iconType="only"
          icon={<Icon name="close" $color="grey" />}
          onClick={() => destroyOrder()}
          data-testid={`destroy-order-${orderId}`}
        />
      </CloseButtonWrapper>
    </DeletedItemWrapper>
  );
};

export default DeletedOrderItem;
