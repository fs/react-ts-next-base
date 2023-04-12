import React, { FC } from 'react';

import { TCheckbox } from './types';
import { Wrapper, Label, Input } from './styled';
import { positionConfig, sizeConfig } from './config';

const Checkbox: FC<TCheckbox> = ({
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

  return (
    <Wrapper>
      <Input
        type="checkbox"
        id={name}
        checked={checked}
        onChange={readOnly ? () => {} : onChangeHandler}
        data-testid={name}
        position={positionConfig[position]}
        $size={sizeConfig}
      />
      <Label
        htmlFor={name}
        positionVariant={position}
        position={positionConfig[position]}
        $size={sizeConfig}
        checked={checked}
      >
        {label}
      </Label>
    </Wrapper>
  );
};

export default Checkbox;
