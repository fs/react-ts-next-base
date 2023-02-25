import React from 'react';
import { useModal } from '@ebay/nice-modal-react';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

const FREE = 'free';

const RemoveDeliveryCity = ({ method, remove, index }) => {
  const removeDeliveryCityModal = useModal(SimpleModal);

  const showRemoveDeliveryCity = () =>
    removeDeliveryCityModal.show({
      onSubmit: () => {
        remove(index);
      },
      title: 'Удаление города доставки',
      description: `Вы уверены, что хотите удалить выбранный город
          ${method === FREE ? 'бесплатной' : 'платной'}
          доставки?`,
    });

  return (
    <Button
      variant="outlined-neutral"
      iconType="only"
      icon={<Icon name="close" $color="greyCC" $size={14} />}
      testId={`remove-${method}-delivery-button-${index}`}
      onClick={showRemoveDeliveryCity}
      $ml={8}
    />
  );
};

export default RemoveDeliveryCity;
