import React from 'react';
import Select, { SingleValue } from 'react-select';
import useRouter from 'hooks/useRouter';

import { customSelectStyles, SorterWrapper } from './styled';
import { backgroundColorConfig } from './config';
import { TSorter, TOption } from './types';

const Sorter = ({ options, variant = 'default', $width }: TSorter) => {
  const { query, pushRoute } = useRouter();
  const { sortOrder } = query;

  const getSortOrder = () => options.find(({ value }) => value === sortOrder) || options[0];

  const onOptionChange = (newValue: SingleValue<TOption>) => {
    if (newValue) {
      const sortParam = newValue.value || undefined;
      pushRoute({
        query: {
          ...query,
          sortOrder: sortParam,
        },
      });
    }
  };

  return (
    <SorterWrapper $width={$width}>
      <Select
        isMulti={false}
        instanceId="instanceId"
        placeholder="Сортировать"
        value={getSortOrder()}
        options={options}
        styles={customSelectStyles({ backgroundColor: backgroundColorConfig[variant] })}
        onChange={onOptionChange}
        isSearchable={false}
      />
    </SorterWrapper>
  );
};

export default Sorter;
