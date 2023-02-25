import { components, OptionProps } from 'react-select';
import React from 'react';
import { AllStatusesLabel, Check, StyledCheckbox } from './styled';
import { TOption } from './types';

const ALL = 'ALL';

const Option: React.FunctionComponent<OptionProps<TOption, boolean>> = props => {
  const { isSelected, label, data } = props;
  const isAll = data?.value === ALL;

  return (
    <components.Option {...props}>
      {isAll ? (
        <AllStatusesLabel>{label}</AllStatusesLabel>
      ) : (
        <>
          <StyledCheckbox>{isSelected && <Check />}</StyledCheckbox>
          {label}
        </>
      )}
    </components.Option>
  );
};

export default Option;
