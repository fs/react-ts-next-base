import React, { ReactNode } from 'react';

import Tooltip from 'components/shared/atoms/Tooltip';

import { RadioWrapper, Label } from './styled';
import { TRadio } from './types';

const Radio = <T,>({
  direction = 'column',
  options,
  name,
  selected,
  boldSelectedValue = false,
  setFieldValue = () => {},
  onChange = () => {},
  readOnly = false,
}: TRadio<T>): JSX.Element => {
  const onChangeValue = (value: T) => {
    setFieldValue(name, value);
    onChange(value);
  };

  const radioContent = (content: ReactNode, tooltip: string | undefined) => {
    return tooltip ? <Tooltip text={tooltip}>{content}</Tooltip> : <>{content}</>;
  };

  return (
    <RadioWrapper direction={direction}>
      {options.map(({ value, label, disabled, tooltip }) => {
        const checked = selected === value;
        const content = (
          <>
            <input
              disabled={disabled || readOnly}
              type="radio"
              id={`${name}_${value}`}
              checked={checked}
              onChange={() => onChangeValue(value)}
              data-testid={`${name}_${value}`}
              data-cy={`${name}_${value}`}
            />
            {label}
          </>
        );
        return (
          <Label
            boldSelectedValue={boldSelectedValue}
            isChecked={checked}
            disabled={disabled}
            key={`${value}`}
            htmlFor={`${name}_${value}`}
          >
            {radioContent(content, tooltip)}
          </Label>
        );
      })}
    </RadioWrapper>
  );
};

export default Radio;
