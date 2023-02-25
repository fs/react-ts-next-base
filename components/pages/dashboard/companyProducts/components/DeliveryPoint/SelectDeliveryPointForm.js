import React, { useState, useMemo } from 'react';
import { useFormikContext } from 'formik';

import Icon from 'components/shared/atoms/Icon';
import Radio from 'components/shared/atoms/Radio';
import Button from 'components/shared/atoms/Button';
import Tabs from 'components/shared/molecules/Tabs';

import {
  deliveryPointFields,
  deliveryServices,
  deliveryServicesLabel,
} from 'config/constants/createProductDelivery';
import DeliveryPointInfoRadio from './DeliveryPointInfo/DeliveryPointInfoRadio';

import { FormContent, Warning, DeliveryPointsList, RadioItem, ActionsWrapper } from './styled';

const SelectDeliveryPointForm = ({ service: initialService, onCloseModal, deliveryPointsList }) => {
  const { values, setFieldValue } = useFormikContext();
  const [selectedService, setSelectedService] = useState(initialService);

  const deliveryPoints = deliveryPointsList[selectedService] || [];
  const notSelectedDeliveryPoint =
    deliveryPointFields[Object.keys(deliveryServices).find(service => service !== selectedService)];
  const TABS = [
    {
      id: deliveryServices.DELLIN,
      name: `Выберите терминал ${deliveryServicesLabel.DELLIN}`,
      action: () => setSelectedService(deliveryServices.DELLIN),
    },
    {
      id: deliveryServices.SDEK,
      name: `Выберите терминал ${deliveryServicesLabel.SDEK}`,
      action: () => setSelectedService(deliveryServices.SDEK),
    },
  ];

  const deliveryPointsRadio = useMemo(() => {
    return [
      {
        value: false,
        label: (
          <RadioItem>
            Я не хочу сотрудничать с компанией {deliveryServicesLabel[selectedService]}
          </RadioItem>
        ),
        disabled: !values[notSelectedDeliveryPoint].deliveryPoint,
      },
      ...deliveryPoints.map(({ id, ...deliveryPoint }) => {
        return {
          value: id,
          label: <DeliveryPointInfoRadio deliveryPoint={deliveryPoint} />,
        };
      }),
    ];
  }, [selectedService]);

  return (
    <>
      <Tabs tabs={TABS} variant="flat" activeId={selectedService} withTransition />
      <FormContent>
        {deliveryPoints.length ? (
          <div>
            <Warning>
              <Icon name="exclamation-square" $size={32} $mr={20} $color="orange" />
              Вы выбираете терминал службы доставки {deliveryServicesLabel[selectedService]}. <br />
              Не забудьте выбрать терминал службы доставки &nbsp;
              {deliveryServicesLabel[values[notSelectedDeliveryPoint].service]}.
            </Warning>

            <DeliveryPointsList>
              <Radio
                options={deliveryPointsRadio}
                name={`${selectedService}_deliveryPoint`}
                direction="column"
                boldSelectedValue
                selected={values[deliveryPointFields[selectedService]].deliveryPoint?.id || false}
                onChange={value =>
                  setFieldValue(deliveryPointFields[selectedService], {
                    ...values[deliveryPointFields[selectedService]],
                    deliveryPoint: deliveryPoints.find(({ id }) => id === value) || false,
                  })
                }
              />
            </DeliveryPointsList>
          </div>
        ) : (
          <Warning>Нет доступных терминалов</Warning>
        )}

        <ActionsWrapper>
          <Button
            label="Подтвердить"
            type="button"
            testId="select-delivery-point-modal-submit-button"
            onClick={onCloseModal}
          />
        </ActionsWrapper>
      </FormContent>
    </>
  );
};

export default SelectDeliveryPointForm;
