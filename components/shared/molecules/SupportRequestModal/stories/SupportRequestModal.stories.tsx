import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from 'components/shared/atoms/Button';

import SupportRequestModal from '../SupportRequestModal';

export default {
  title: 'molecules/SupportRequestModal',
  component: SupportRequestModal,
  argTypes: {
    isGuest: {
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    isGuest: false,
  },
} as ComponentMeta<typeof SupportRequestModal>;

export const Demo: ComponentStory<typeof SupportRequestModal> = args => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setShow(!show)} label="show modal" />
      {show && <SupportRequestModal {...args} defaultVisible keepMounted id="test" />}
    </>
  );
};
