import React from 'react';
import { useField } from 'formik';
import { numberFormat } from 'helpers';

import Icon from 'components/shared/atoms/Icon';
import Tooltip from 'components/shared/atoms/Tooltip';
import NumberInput from 'components/shared/atoms/NumberInput';

import { TAmountRefund } from '../../types';
import { Title, InputWrapper, InputTitle } from './styled';

const AmountRefund: React.FunctionComponent<TAmountRefund> = ({ refund, maxAmount }) => {
  const { name, title, tooltip, inputTitle } = refund;
  const [, , { setValue }] = useField(name);

  return (
    <>
      <Title>
        <span>
          {title}: <strong>{numberFormat(maxAmount)} руб.</strong>
        </span>
        <Tooltip text={tooltip} $width="15.5rem" $ml={10}>
          <Icon name="question" $size={20} $color="grey" />
        </Tooltip>
      </Title>
      <InputTitle>{inputTitle}</InputTitle>
      <InputWrapper>
        <NumberInput
          name={name}
          testId={name}
          placeholder={inputTitle}
          suffix=" руб."
          onChange={(value = 0) =>
            setValue(value >= maxAmount ? maxAmount : value === undefined ? 0 : value)
          }
          decimalScale={2}
        />
      </InputWrapper>
    </>
  );
};

export default AmountRefund;
