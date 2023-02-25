import React, { useMemo } from 'react';
import { useFormikContext } from 'formik';

import { SELLER, BUYER } from 'config/constants/directions';

import Icon from 'components/shared/atoms/Icon';
import Radio from 'components/shared/atoms/Radio';
import Tooltip from 'components/shared/atoms/Tooltip';
import Counter from 'components/shared/molecules/Counter';
import { TProposalFormValues } from 'components/shared/organisms/CreateDisputeProposalForm/types';

import {
  radioReturnRequired,
  refundFields,
  freeDeliveryPriceText,
  deliveryMessage,
  titleText,
} from './constants';

import {
  RadioWrapper,
  RadioLabel,
  Subtitle,
  ReturnRequiredWrapper,
  ReturnQuantity,
  ReturnQuantityTitle,
  InputTitle,
  Warning,
} from './styled';
import AmountRefund from './components/AmountRefund';
import { TProposalFormFields } from './types';

const ProposalFormFields: React.FunctionComponent<TProposalFormFields> = ({
  order,
  variant = 'seller',
}) => {
  const { quantity, itemPrice, deliveryPrice } = order;

  const returnPayerLabel = useMemo(() => {
    switch (variant) {
      case 'admin':
        return {
          buyer: 'Возврат за счет покупателя',
          seller: 'Возврат за счет поставщика',
        };
      case 'seller':
        return {
          buyer: 'Возврат за счет покупателя',
          seller: 'Возврат за мой счет',
        };
      case 'buyer':
        return {
          buyer: 'Возврат за мой счет',
          seller: 'Возврат за счет поставщика',
        };
      default:
        console.error('Wrong variant');
        return {};
    }
  }, [variant]);

  const radioReturnPayer = [
    { label: returnPayerLabel.buyer, value: BUYER },
    {
      label: returnPayerLabel.seller,
      value: SELLER,
      disabled: deliveryPrice === 0,
    },
  ];

  const { setFieldValue, values } = useFormikContext<TProposalFormValues>();

  return (
    <>
      <ReturnRequiredWrapper>
        <Subtitle>{titleText[variant]}</Subtitle>
        <RadioWrapper>
          <RadioLabel>Необходим ли возврат товара?</RadioLabel>
          <Radio
            options={radioReturnRequired}
            name="proposal.returnRequired"
            direction="row"
            setFieldValue={setFieldValue}
            selected={values.proposal.returnRequired}
          />
        </RadioWrapper>

        {values.proposal.returnRequired && (
          <ReturnQuantity>
            <ReturnQuantityTitle>
              <span>
                Укажите количество товара, которое хотите вернуть из&nbsp;
                <strong>{quantity} шт:</strong>
              </span>
              <Tooltip
                text="Количество единиц товара на возврат не может превышать количество заказанного товара"
                $width="16rem"
                $ml={10}
              >
                <Icon name="question" $size={20} $color="grey" />
              </Tooltip>
            </ReturnQuantityTitle>

            <Counter name="proposal.returnQuantity" max={quantity} size="small" $width="8rem" />
          </ReturnQuantity>
        )}
      </ReturnRequiredWrapper>

      <AmountRefund
        refund={refundFields.product}
        maxAmount={itemPrice ? quantity * itemPrice : 0}
      />

      <RadioWrapper>
        <InputTitle>{deliveryMessage[variant]}</InputTitle>
        <Radio
          options={radioReturnPayer}
          name="proposal.returnPayer"
          direction="row"
          setFieldValue={setFieldValue}
          selected={values.proposal.returnPayer}
        />
      </RadioWrapper>

      {deliveryPrice === 0 ? (
        <Warning>
          <Icon name="exclamation-square" $size={28} $color="orange" $mr={16} />
          <div>{freeDeliveryPriceText[variant]}</div>
        </Warning>
      ) : (
        values.proposal.returnPayer === SELLER && (
          <AmountRefund refund={refundFields.delivery} maxAmount={deliveryPrice} />
        )
      )}
    </>
  );
};

export default ProposalFormFields;
