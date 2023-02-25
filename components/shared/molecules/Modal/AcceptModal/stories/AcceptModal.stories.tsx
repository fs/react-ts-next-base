import React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from 'components/shared/atoms/Button';

import AcceptModal from '../index';

export default {
  title: 'molecules/AcceptModal',
  component: AcceptModal,
  argTypes: {
    title: {
      table: {
        defaultValue: { summary: 'Пользователь создан для управления выбранными компаниями' },
      },
    },
    description: {
      table: {
        defaultValue: {
          summary:
            'Пользователю отправлено письмо, в котором находится ссылка для перехода в его Личный кабинет.',
        },
      },
    },
  },
  args: {
    title: 'Пользователь создан для управления выбранными компаниями',
    description:
      'Пользователю отправлено письмо, в котором находится ссылка для перехода в его Личный кабинет.',
  },
} as ComponentMeta<typeof AcceptModal>;

export const Demo: ComponentStory<typeof AcceptModal> = args => {
  const showModal = () => NiceModal.show(AcceptModal, args);

  return <Button label="show modal" onClick={showModal} />;
};
