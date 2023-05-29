import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ESize } from 'public/styles/config/size';

import Icon from 'components/shared/atoms/Icon';
import { configIcons, IconKeys } from 'components/shared/atoms/Icon/config';

import Button from '../index';
import { EIconType, EShape, TButton } from '../types';

import { ItemWrapper, Row } from './styled';

type TButtonStory = TButton & {
  bgColor?: string;
};

const renderComplexLayout = (propsArray: TButtonStory[], args: TButton) => (
  <Row>
    {propsArray.map(({ label, bgColor = 'transparent', ...props }, index) => (
      <ItemWrapper key={index} bgColor={bgColor}>
        <Button {...args} label={label || ''} {...props} />
      </ItemWrapper>
    ))}
  </Row>
);

const buttonName = 'button_name';

const icons = Object.keys(configIcons) as IconKeys[];

export default {
  title: 'atoms/Button',
  component: Button,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: Object.values(ESize),
    },
    shape: {
      control: { type: 'select' },
      options: Object.values(EShape),
    },
    iconType: {
      control: { type: 'select' },
      options: Object.values(EIconType),
    },
    icon: {
      name: 'icon',
      description: 'You can pass any Icon',
      options: icons,
      mapping: icons.reduce((acc, icon) => {
        return { ...acc, [icon]: <Icon name={icon} $color="white" /> };
      }, {}),
      control: {
        type: 'select',
      },
    },
    type: {
      control: { type: null },
    },
    testId: {
      control: { type: null },
    },
  },
  args: {
    variant: 'primary',
    disabled: false,
    isLoading: false,
    size: 'medium',
    shape: 'none',
    iconType: 'none',
    $width: 'auto',
    label: 'primary',
    link: false,
    type: 'button',
    testId: buttonName,
  },
} as ComponentMeta<typeof Button>;

const allVariants: TButtonStory[] = [
  { label: 'primary', variant: 'primary' },
  { label: 'alert', variant: 'alert' },
  { label: 'hollow', variant: 'hollow' },
];

export const Demo: ComponentStory<typeof Button> = args => <Button {...args} />;
Demo.args = {
  icon: <Icon name="plus" $color="white" />,
};

export const Variant = (args: TButton) => renderComplexLayout(allVariants, args);

export const Disabled = (args: TButton) =>
  renderComplexLayout(
    allVariants.map(config => ({ ...config, disabled: true })),
    args,
  );

export const Loading = (args: TButton) =>
  renderComplexLayout(
    allVariants.map(config => ({ ...config, isLoading: true })),
    args,
  );

const sizeProps: TButton[] = [
  { label: 'extra-small', size: 'extra-small' },
  { label: 'small', size: 'small' },
  { label: 'medium', size: 'medium' },
  { label: 'large', size: 'large' },
  { label: 'extra-large', size: 'extra-large' },
];
const sizeIconOnlyProps: TButton[] = [
  { size: 'extra-small' },
  { size: 'small' },
  { size: 'medium' },
  { size: 'large' },
  { size: 'extra-large' },
];

export const Size = (args: TButton) => (
  <>
    {renderComplexLayout(sizeProps, args)}
    {renderComplexLayout(
      sizeIconOnlyProps.map(config => ({
        ...config,
        iconType: 'only',
        icon: <Icon name="plus" $color="white" />,
      })),
      args,
    )}
  </>
);

const extraShapeProps: TButton[] = [
  {
    label: 'extra-rounded',
    variant: 'alert',
    shape: 'extra-rounded',
  },
  {
    label: 'extra-rounded',
    variant: 'alert',
    shape: 'extra-rounded',
  },
  {
    variant: 'primary',
    shape: 'extra-rounded',
    iconType: 'only',
    icon: <Icon name="plus" $color="white" />,
    size: 'extra-large',
  },
];
const shapeCircleProps: TButton[] = [
  {
    variant: 'alert',
    iconType: 'only',
    icon: <Icon name="close" $color="white" />,
    size: 'extra-small',
  },
  {
    variant: 'primary',
    iconType: 'only',
    icon: <Icon name="arrow-chevron-left" $color="white" />,
    size: 'small',
  },
  {
    variant: 'primary',
    iconType: 'only',
    icon: <Icon name="arrow-chevron-right" $color="white" />,
    size: 'small',
    disabled: true,
  },
];

export const Shape = (args: TButton) => (
  <>
    {renderComplexLayout(
      allVariants.map(config => ({ ...config, shape: 'rounded', label: 'rounded' })),
      args,
    )}
    {renderComplexLayout(extraShapeProps, args)}
    {renderComplexLayout(
      shapeCircleProps.map(config => ({ ...config, shape: 'circle' })),
      args,
    )}
  </>
);

const iconProps: TButton[] = [
  {
    label: 'leading',
    variant: 'primary',
    iconType: 'leading',
    icon: <Icon name="plus" $color="white" />,
  },
  {
    label: 'trailing',
    variant: 'primary',
    iconType: 'trailing',
    icon: <Icon name="plus" $color="white" />,
  },
  { variant: 'primary', iconType: 'only', icon: <Icon name="plus" $color="white" /> },
  { variant: 'alert', iconType: 'only', icon: <Icon name="minus" $color="white" $size={24} /> },
  { variant: 'hollow', iconType: 'only', icon: <Icon name="eye" $color="black" /> },
];

export const WithIcon = (args: TButton) => renderComplexLayout(iconProps, args);
