import React from 'react';

import { StyledTab } from './styled';
import { TTab } from './types';
import {
  backgroundConfig,
  borderConfig,
  colorConfig,
  textSizeConfig,
  flexConfig,
  frontWeightConfig,
} from './config';

const Tab: React.FunctionComponent<TTab> = ({
  variant = 'default',
  withRightDelimiter = false,
  isActive = false,
  name,
  testId,
  onClick,
}) => {
  return (
    <StyledTab
      role="tab"
      isActive={isActive}
      onClick={onClick}
      data-testid={testId}
      data-cy={testId}
      textColor={colorConfig[variant]}
      border={borderConfig[variant]}
      textSize={textSizeConfig[variant]}
      flexPosition={flexConfig[variant]}
      fontWeight={frontWeightConfig[variant]}
      backgroundColor={backgroundConfig[variant]}
      withRightDelimiter={withRightDelimiter}
    >
      {name}
    </StyledTab>
  );
};

export default Tab;
