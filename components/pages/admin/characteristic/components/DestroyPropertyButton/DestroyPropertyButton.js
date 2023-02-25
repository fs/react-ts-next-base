import React from 'react';
import useRouter from 'hooks/useRouter';
import { useModal } from '@ebay/nice-modal-react';

import { ADMIN_CHARACTERISTICS } from 'config/routes';

import { useDestroyProperty } from 'lib/apollo/hooks/actions/properties';

import Button from 'components/shared/atoms/Button';
import Tooltip from 'components/shared/atoms/Tooltip';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import { CHARACTERISTICS_TYPE } from '../../../characteristics/AdminCharacteristicsPage';
import { TooltipWrapper } from './styled';

const DestroyPropertyButton = ({ canBeDestroyed, name, id }) => {
  const { pushRoute } = useRouter();

  const onSubmitDestroy = () => {
    pushRoute({ pathname: ADMIN_CHARACTERISTICS, query: { tab: CHARACTERISTICS_TYPE.EXISTED } });
  };

  const [destroyProperty] = useDestroyProperty({ name, onSubmit: onSubmitDestroy });
  const destroyPropertyModal = useModal(SimpleModal);

  const showDestroyProperty = () =>
    destroyPropertyModal.show({
      variant: 'alert',
      roundedButton: true,
      onSubmit: async () => {
        await destroyProperty({ propertyId: id });
      },
      title: 'Удаление характеристики',
      description: (
        <>
          Вы уверены что хотите удалить характеристику <b>{name}</b>?
        </>
      ),
      acceptText: 'Подтвердить',
    });

  return (
    <TooltipWrapper>
      <Tooltip
        active={!canBeDestroyed}
        $width="20rem"
        text="Вы не можете удалить характеристику, так как она уже используется."
      >
        <Button
          onClick={showDestroyProperty}
          label="Удалить"
          $width="8.75rem"
          shape="rounded"
          size="small"
          variant="alert"
          disabled={!canBeDestroyed}
          testId="destroy-property-button"
        />
      </Tooltip>
    </TooltipWrapper>
  );
};

export default DestroyPropertyButton;
