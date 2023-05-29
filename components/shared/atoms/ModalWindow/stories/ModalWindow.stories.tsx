import { useArgs } from '@storybook/client-api';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from 'components/shared/atoms/Button';

import ModalWindow from '../index';

export default {
  title: 'atoms/ModalWindow',
  component: ModalWindow,
  argTypes: {
    children: {
      control: {
        type: null,
      },
    },
  },
  args: {
    isOpen: false,
    position: 'center',
    isClosable: true,
    $width: 'fit-content',
    padding: '1.75rem',
    rounded: false,
    title: 'ModalWindow title',
    closeOnOverlayClick: true,
    setIsOpen: () => {},
    children: <>ModalWindow children</>,
  },
} as ComponentMeta<typeof ModalWindow>;

export const Demo: ComponentStory<typeof ModalWindow> = args => {
  const [{ isOpen }, updateArgs] = useArgs();
  const handleChange = (value: boolean) => updateArgs({ isOpen: value });

  return (
    <>
      <Button label="show modal" onClick={() => handleChange(true)} />
      <ModalWindow {...args} isOpen={isOpen} setIsOpen={handleChange} />
    </>
  );
};
