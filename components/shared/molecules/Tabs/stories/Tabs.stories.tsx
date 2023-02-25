import React from 'react';

import { useArgs } from '@storybook/client-api';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Tabs from '../index';
import { TabsWrapper } from './styled';
import { TTabs } from '../types';

const getTabs = (action: (a: number) => void) => [
  {
    id: 1,
    name: 'Новые операции',
    action: () => {
      action(1);
    },
  },
  {
    id: 2,
    name: 'Вывод средств',
    action: () => {
      action(2);
    },
  },
  {
    id: 3,
    name: 'История',
    action: () => {
      action(3);
    },
  },
];

const initialArgs = {
  variant: 'default',
  withTransition: false,
  tabs: getTabs(() => {}),
  activeId: 1,
};

export default {
  title: 'molecules/Tabs',
  component: Tabs,
  argTypes: {
    tabs: {
      description: 'Describe tabs',
      table: {
        type: { summary: 'Array' },
        defaultValue: { summary: [] },
      },
    },
    activeId: {
      description: 'Id of active tab',
      table: {
        type: { summary: 'String' },
      },
    },
    withTransition: {
      description: 'Have transition or not',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: false },
      },
    },
  },
  args: initialArgs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = args => {
  const [_, updateArgs] = useArgs();
  const handleChange = (value: number) => updateArgs({ activeId: value });

  return <Tabs {...args} tabs={getTabs(handleChange)} />;
};

export const Demo = Template.bind({});

export const Variant = (args: TTabs) => {
  const [_, updateArgs] = useArgs();
  const handleChange = (value: number) => updateArgs({ activeId: value });

  return (
    <TabsWrapper>
      <Tabs {...args} tabs={getTabs(handleChange)} variant="default" />
      <Tabs {...args} tabs={getTabs(handleChange)} variant="flat" />
      <Tabs {...args} tabs={getTabs(handleChange)} variant="link_like" />
    </TabsWrapper>
  );
};
