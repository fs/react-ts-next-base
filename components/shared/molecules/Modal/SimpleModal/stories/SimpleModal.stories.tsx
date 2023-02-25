import React from 'react';
import * as Yup from 'yup';
import NiceModal from '@ebay/nice-modal-react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { REQUIRED_FIELD } from 'config/constants/errorsText';

import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';

import SimpleModal from '../index';

const initialArgs = {
  variant: 'default',
  roundedButton: false,
  showCancel: true,
  cancelText: 'Отменить',
  acceptText: 'Подтвердить',
  title: 'Подтверждение адреса с лицензией',
  description: 'Нажимая “Подтвердить”, вы добавите адрес с лицензией компании на сайт',
  subDescription: 'Some sub description',
  onSubmit: () => {},
  onCancel: () => {},
};

export default {
  title: 'molecules/SimpleModal',
  component: SimpleModal,
  argTypes: {
    cancelText: {
      table: {
        defaultValue: { summary: 'Отменить' },
      },
    },
    acceptText: {
      table: {
        defaultValue: {
          summary: 'Подтвердить',
        },
      },
    },
  },
  args: initialArgs,
} as ComponentMeta<typeof SimpleModal>;

export const Demo: ComponentStory<typeof SimpleModal> = args => {
  const showModal = () => NiceModal.show(SimpleModal, args);

  return <Button label="show modal" onClick={showModal} />;
};

export const WithForm: ComponentStory<typeof SimpleModal> = args => {
  const showModal = () => NiceModal.show(SimpleModal, args);

  return <Button label="show modal" onClick={showModal} />;
};
WithForm.args = {
  form: {
    initialValues: { rejectionReason: '' },
    validationSchema: Yup.object().shape({
      rejectionReason: Yup.string().required(REQUIRED_FIELD),
    }),
    body: (
      <Input
        rounded
        type="textarea"
        testId="rejection-reason"
        placeholder="Добавьте поясняющий комментарий"
        name="rejectionReason"
      />
    ),
  },
};
