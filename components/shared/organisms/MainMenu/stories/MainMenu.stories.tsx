import React, { useRef } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import MainMenu from '../index';

export default {
  title: 'organisms/MainMenu',
  component: MainMenu,
  args: {
    toggleMenu: () => {},
  },
} as ComponentMeta<typeof MainMenu>;

const Template: ComponentStory<typeof MainMenu> = args => {
  const elementRef = useRef<HTMLDivElement>(null);

  return <MainMenu {...args} wrapperRef={elementRef} />;
};

export const Demo = Template.bind({});
