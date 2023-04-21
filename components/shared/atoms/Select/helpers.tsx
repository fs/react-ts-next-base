import { components, OptionProps } from 'react-select';
import Checkbox from 'components/shared/atoms/Checkbox';

import { TOption } from './types';
import { OptionWrapper, CheckboxWrapper } from './styled';

export const MultiOption = <T,>(props: OptionProps<TOption<T>, boolean>) => {
  const { data, isSelected } = props;
  const { value, label } = data;
  return (
    <OptionWrapper>
      <components.Option {...props}>
        <CheckboxWrapper>
          <Checkbox name={`checkbox-property-${value}`} label={label} checked={isSelected} />
        </CheckboxWrapper>
      </components.Option>
    </OptionWrapper>
  );
};
