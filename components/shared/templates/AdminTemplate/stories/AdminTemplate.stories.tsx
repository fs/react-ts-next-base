import React from 'react';

import { useArgs } from '@storybook/client-api';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AdminTemplate from '../index';

const getTabs = (action: (a: string) => void) => [
  {
    id: '1',
    name: 'Неоформленные',
    action: () => {
      action('1');
    },
  },
  {
    id: '2',
    name: 'Заказы в процессе',
    action: () => {
      action('2');
    },
  },
  {
    id: '3',
    name: 'Завершенные',
    action: () => {
      action('3');
    },
  },
];

export default {
  title: 'Templates/AdminTemplate',
  component: AdminTemplate,
  argTypes: {},
  args: {
    showSidebar: true,
    activeId: '1',
    title: 'Заказы',
  },
} as ComponentMeta<typeof AdminTemplate>;

export const Demo: ComponentStory<typeof AdminTemplate> = args => {
  return <AdminTemplate {...args}>Content</AdminTemplate>;
};

export const TemplateWithTitle: ComponentStory<typeof AdminTemplate> = args => {
  return <AdminTemplate {...args}>Content</AdminTemplate>;
};

export const TemplateWithTabs: ComponentStory<typeof AdminTemplate> = args => {
  const [_, updateArgs] = useArgs();
  const handleChange = (value: string) => updateArgs({ activeId: value });

  return (
    <AdminTemplate tabs={getTabs(handleChange)} {...args}>
      Content
    </AdminTemplate>
  );
};
