import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import DatePickerInput from '../index';

import { Container } from './styled';

export default {
  title: 'molecules/DatePickerInput',
  component: DatePickerInput,
  argTypes: {},
  args: {
    variant: 'default',
    size: 'medium',
    width: '12rem',
    name: 'date-picker',
    placeholder: 'Выберите дату',
    checkbox: 'Без срока годности',
    disabled: false,
    currentDate: new Date().toISOString(),
    minDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    maxDate: new Date(new Date().setDate(new Date().getDate() + 100)),
    clearable: true,
    readOnly: false,
    offset: [0, -40],
    error: '',
    $mt: 0,
    $mr: 0,
    $mb: 0,
    $ml: 0,
  },
  decorators: [Story => <Container>{Story()}</Container>],
} as ComponentMeta<typeof DatePickerInput>;

export const Demo: ComponentStory<typeof DatePickerInput> = args => {
  const [{ currentDate }, updateArgs] = useArgs();
  const handleChange = (value?: string | null) => updateArgs({ currentDate: value });

  return <DatePickerInput {...args} onSubmit={handleChange} currentDate={currentDate} />;
};

export const Error: ComponentStory<typeof DatePickerInput> = args => {
  const [{ currentDate }, updateArgs] = useArgs();
  const handleChange = (value?: string | null) => updateArgs({ currentDate: value });

  return (
    <DatePickerInput
      {...args}
      onSubmit={handleChange}
      currentDate={currentDate}
      error="Поле обязательно для заполнения"
    />
  );
};

export const Disabled: ComponentStory<typeof DatePickerInput> = args => {
  return <DatePickerInput {...args} disabled />;
};
