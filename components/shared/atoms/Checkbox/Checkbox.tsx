import React from 'react';

import { TCheckbox, TStates } from './types';
import { Wrapper, Label, Input } from './styled';
import { variantConfig, positionConfig, sizeConfig } from './config';

const Checkbox: React.FunctionComponent<TCheckbox> = ({
  variant = 'default',
  position = 'left',
  name,
  label = '',
  checked = false,
  onChange = () => {},
  readOnly = false,
}) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };
  const checkedState: TStates = checked ? 'checked' : 'unchecked';

  return (
    <Wrapper>
      <Input
        type="checkbox"
        id={name}
        checked={checked}
        onChange={readOnly ? () => {} : onChangeHandler}
        data-testid={name}
        data-cy={name}
        position={positionConfig[position]}
        $size={sizeConfig}
      />
      <Label
        htmlFor={name}
        positionVariant={position}
        position={positionConfig[position]}
        state={variantConfig[variant][checkedState]}
        $size={sizeConfig}
      >
        {label}
      </Label>
    </Wrapper>
  );
};

export default Checkbox;
