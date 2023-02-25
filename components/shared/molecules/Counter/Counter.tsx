import React from 'react';
import { useField } from 'formik';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import NumberInput from 'components/shared/atoms/NumberInput';

import { CounterWrapper } from './styled';
import { TCounter } from './types';
import { sizeConfig, borderRadiusConfig } from './config';

enum directions {
  LEFT = 'left',
  RIGHT = 'right',
}

const Counter: React.FunctionComponent<TCounter> = ({
  name,
  min = 1,
  max = 1,
  size = 'extra-small',
  shape = 'none',
  $width = '10rem',
  disabled = false,
  onChange = () => {},
  ...props
}) => {
  const [_, { value }, { setValue }] = useField(name);

  const currentValue = value === undefined || value < min ? min : value;
  const buttonSize = size === 'extra-large' ? 'large' : size;

  const onChangeCount = (count: number | undefined) => {
    setValue(count && count > max ? max : count);
  };

  const onArrowClick = (direction: string) => {
    const count = direction === directions.LEFT ? currentValue - 1 : currentValue + 1;
    setValue(count);
    onChange(count);
  };

  const onBlur = () => {
    onChange(currentValue);
    setValue(currentValue);
  };

  return (
    <CounterWrapper
      size={sizeConfig[size]}
      borderRadius={borderRadiusConfig[shape]}
      $width={$width}
      {...props}
    >
      <Button
        variant="hollow"
        size={buttonSize}
        iconType="only"
        icon={<Icon name="minus" $color="black" $size={sizeConfig[size].iconSize} />}
        onClick={() => onArrowClick(directions.LEFT)}
        disabled={currentValue <= min || disabled}
        testId={`${name}-decrement-button`}
      />
      <NumberInput
        name={name}
        testId={name}
        onChange={onChangeCount}
        onBlur={onBlur}
        disabled={disabled}
        variant="table_cell"
        textAlign="center"
      />
      <Button
        variant="hollow"
        size={buttonSize}
        iconType="only"
        icon={<Icon name="plus" $color="black" $size={sizeConfig[size].iconSize} />}
        onClick={() => onArrowClick(directions.RIGHT)}
        disabled={currentValue >= max || disabled}
        testId={`${name}-increment-button`}
      />
    </CounterWrapper>
  );
};

export default Counter;
