import React from 'react';

import { useCities } from 'lib/apollo/hooks/state/cities';

import AsyncSelect from 'components/shared/atoms/Selects/AsyncSelect';

import { SelectCityWrapper, Description } from './styled';

const DeliveryCitySelect = ({
  name,
  title,
  placeholder,
  width,
  initialValue,
  description,
  index,
  readOnly,
}) => {
  const fetchCities = useCities();

  return (
    <SelectCityWrapper width={width} data-testid={name}>
      <AsyncSelect
        name={name}
        testId={name}
        initialValue={initialValue}
        title={title}
        placeholder={placeholder}
        fetchFn={fetchCities}
        $mb={20}
        readOnly={readOnly}
      />
      {description && <Description index={index}>{description}</Description>}
    </SelectCityWrapper>
  );
};

export default DeliveryCitySelect;
