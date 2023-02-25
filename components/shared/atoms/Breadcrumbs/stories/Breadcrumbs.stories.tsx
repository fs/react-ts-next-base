import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { LightWrapper, Wrapper } from './styled';
import Breadcrumbs from '../index';
import { EPosition, EVariant } from '../types';

export default {
  title: 'atoms/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
    variant: {
      control: { type: 'select' },
      table: {
        defaultValue: { summary: EVariant.PRIMARY },
      },
    },
    back: {
      description:
        'Breadcrumbs link will follow on previous url or on default url passed by url param',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: false },
      },
    },
    url: {
      description: 'URL',
      table: {
        type: { summary: 'String' },
      },
    },
    text: {
      description: 'Breadcrumbs title',
      table: {
        type: { summary: 'String' },
      },
    },
    params: {
      description: 'Url params',
      table: {
        type: { summary: 'Object' },
        defaultValue: { summary: {} },
      },
      control: {
        type: 'none',
      },
    },
    history: {
      description: 'Browsing History',
      control: {
        type: 'none',
      },
    },
    position: {
      description: 'Arrow positioning relative to text',
      control: { type: 'select' },
      table: {
        defaultValue: { summary: EPosition.LEFT },
      },
    },
  },
  args: {
    variant: EVariant.PRIMARY,
    position: EPosition.LEFT,
    text: 'Вернуться назад',
    url: '/',
    back: false,
  },
} as ComponentMeta<typeof Breadcrumbs>;

export const Demo: ComponentStory<typeof Breadcrumbs> = args => <Breadcrumbs {...args} />;

export const Variant: ComponentStory<typeof Breadcrumbs> = args => {
  return (
    <Wrapper>
      <Breadcrumbs {...args} variant={EVariant.PRIMARY} />
      <Breadcrumbs {...args} variant={EVariant.SECONDARY} />
      <LightWrapper>
        <Breadcrumbs {...args} variant={EVariant.LIGHT} />
      </LightWrapper>
    </Wrapper>
  );
};
