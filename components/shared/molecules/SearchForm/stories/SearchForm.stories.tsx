import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchForm from '../index';

export default {
  title: 'molecules/SearchForm',
  component: SearchForm,
  argTypes: {
    placeholder: {
      table: {
        defaultValue: { summary: 'Поиск...' },
      },
    },
    rounded: {
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: false },
      },
    },
    searchInputName: {
      table: {
        defaultValue: { summary: 'searchQuery' },
      },
    },
    customFields: {
      description: 'Array of fields for form',
    },
  },
  args: {
    rounded: false,
    placeholder: 'placeholder...',
    searchInputName: 'searchQuery',
  },
} as ComponentMeta<typeof SearchForm>;

const Template: ComponentStory<typeof SearchForm> = args => <SearchForm {...args} />;

export const Demo = Template.bind({});

const withCustomFields: ComponentStory<typeof SearchForm> = args => {
  const searchFormFields = [
    {
      placeholder: 'Заказ №',
      name: 'orderId',
      initialValue: '5',
      width: '60%',
    },
    {
      placeholder: 'Наименование / Код',
      name: 'productSearchQuery',
      testId: 'search-input',
      initialValue: 'initial value',
    },
  ];

  return <SearchForm {...args} customFields={searchFormFields} />;
};

export const WithCustomFields = withCustomFields.bind({});
