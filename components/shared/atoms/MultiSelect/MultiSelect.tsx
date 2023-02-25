import React from 'react';
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select';
import plural from 'plural-ru';
import Option from './Option';
import { customSelectStyles, SelectWrapper } from './styled';
import { TMultiSelect, TOption } from './types';
import { backgroundColorConfig } from './config';

const ALL = 'ALL';

const MultiSelect: React.FunctionComponent<TMultiSelect> = ({
  name,
  options: initialOptions = [],
  labelAll = 'Все',
  selected = [],
  onChange = () => {},
  $width = '100%',
  variant = 'default',
}) => {
  const options = [{ value: ALL, label: labelAll }, ...initialOptions];
  const placeholder =
    selected.length >= 1
      ? plural(
          selected.length,
          options.find(({ value }) => value === selected[0])?.label || '',
          `%d фильтра`,
          `%d фильтров`,
        )
      : labelAll;

  const onChangeStatuses = (
    array: MultiValue<TOption> | SingleValue<TOption>,
    params: ActionMeta<TOption>,
  ) => {
    let statusesParams;
    if (params.option?.value === ALL || (Array.isArray(array) && !array?.length)) {
      statusesParams = undefined;
    } else {
      statusesParams =
        (Array.isArray(array) && array.map(({ value }) => value).join(',')) || undefined;
    }
    onChange(statusesParams);
  };

  return (
    <SelectWrapper $width={$width}>
      <Select
        isMulti
        instanceId={`${name}Id`}
        value={options.filter(({ value }) => selected.includes(value))}
        placeholder={placeholder}
        options={options}
        styles={customSelectStyles({ backgroundColor: backgroundColorConfig[variant] })}
        onChange={onChangeStatuses}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        controlShouldRenderValue={false}
        isSearchable={false}
        components={{ Option }}
      />
    </SelectWrapper>
  );
};

export default MultiSelect;
