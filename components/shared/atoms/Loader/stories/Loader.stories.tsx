import { ComponentMeta, ComponentStory } from '@storybook/react';

import { sizeConfig } from '../config';
import Loader from '../index';

export default {
  title: 'atoms/Loader',
  component: Loader,
  argTypes: {
    size: {
      control: {
        type: 'number',
      },
      table: {
        defaultValue: {
          summary: `${sizeConfig.default.spinner} - default, ${sizeConfig.simple.spinner} - simple`,
        },
      },
    },
  },
  args: {
    variant: 'default',
    size: 45,
  },
} as ComponentMeta<typeof Loader>;

export const Demo: ComponentStory<typeof Loader> = args => <Loader {...args} />;

export const Variant: ComponentStory<typeof Loader> = args => {
  return (
    <>
      <Loader {...args} variant="default" />
      <Loader {...args} variant="simple" />
    </>
  );
};
