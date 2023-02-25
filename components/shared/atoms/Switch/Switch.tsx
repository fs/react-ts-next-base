import React from 'react';
import ReactSwitch from 'react-switch';
import theme from 'public/styles/theme';
import { useField } from 'formik';
import { TSwitch } from './types';

import { Wrapper } from './styled';

const Switch: React.FunctionComponent<TSwitch> = ({ name }) => {
  const [, { value }, { setValue }] = useField(name);

  const onValueChange = (val: boolean) => {
    setValue(val);
  };

  return (
    <Wrapper>
      <ReactSwitch
        checked={value}
        onChange={onValueChange}
        name={name}
        width={50}
        height={25}
        borderRadius={14}
        handleDiameter={17}
        onColor={theme.colors.white}
        offColor={theme.colors.white}
        onHandleColor={theme.colors.blue}
        offHandleColor={theme.colors.grey}
        uncheckedIcon={false}
        checkedIcon={false}
        activeBoxShadow=""
      />
    </Wrapper>
  );
};

export default Switch;
