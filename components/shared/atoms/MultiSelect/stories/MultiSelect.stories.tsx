import React from 'react';
import { useArgs } from '@storybook/client-api';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import MultiSelect from '../index';
import { LightWrapper, Wrapper } from './styled';

const options = [
  { value: 'Confirmed', label: 'Подтвержден' },
  { value: 'DisputeOpened', label: 'Открыт спор' },
  { value: 'InAssembly', label: 'В сборке' },
  { value: 'InTransit', label: 'В пути' },
  { value: 'MedagregatorIntervened', label: 'Вмешался Medagregator' },
];

export default {
  title: 'atoms/MultiSelect',
  component: MultiSelect,
  args: {
    labelAll: 'Все заказы',
    $width: '15rem',
    options,
  },
} as ComponentMeta<typeof MultiSelect>;

export const Demo: ComponentStory<typeof MultiSelect> = args => {
  const [{ selected }, updateArgs] = useArgs();
  const handleChange = (value?: string) => updateArgs({ selected: value?.split(',') });

  return <MultiSelect {...args} onChange={handleChange} selected={selected} />;
};

export const Variant: ComponentStory<typeof MultiSelect> = args => {
  const [{ selected }, updateArgs] = useArgs();
  const handleChange = (value?: string) => updateArgs({ selected: value?.split(',') });
  return (
    <>
      <LightWrapper>
        <MultiSelect {...args} variant="default" onChange={handleChange} selected={selected} />
      </LightWrapper>
      <Wrapper>
        <MultiSelect {...args} variant="light" onChange={handleChange} selected={selected} />
      </Wrapper>
    </>
  );
};
