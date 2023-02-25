import React, { useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import ModalWindow from 'components/shared/atoms/ModalWindow';

import { buttonConfig } from './config';
import { TSimpleModal } from './types';
import { FormWrapper, ModalHeader, Description, Remark, ModalBody, ButtonsWrapper } from './styled';

const SimpleModal = NiceModal.create<TSimpleModal>(
  ({
    variant = 'default',
    title,
    description,
    subDescription,
    roundedButton = false,
    showCancel = true,
    cancelText = 'Отменить',
    acceptText = 'Подтвердить',
    onSubmit = (_: object) => {},
    onCancel = () => {},
    form = {
      initialValues: {},
    },
  }) => {
    const { initialValues, validationSchema, body } = form;
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { visible, remove, resolve } = useModal();

    const handleSubmit = async (values: object) => {
      setIsSubmitting(true);
      const data = await onSubmit(values);
      setIsSubmitting(false);
      resolve(data);
      remove();
    };

    const handleCancel = async () => {
      setIsSubmitting(true);
      await onCancel();
      setIsSubmitting(false);
      resolve();
      remove();
    };

    return (
      <ModalWindow
        isOpen={visible}
        setIsOpen={handleCancel}
        isClosable={!isSubmitting}
        $width="22.5rem"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <FormikForm>
            <FormWrapper>
              <ModalHeader data-cy="simple-modal-title" data-testid="simple-modal-title">
                {title}
              </ModalHeader>
              <Icon name="exclamation-square" $color="orange" $size={26} $mt={32} $mb={32} />
              <Description data-testid="modal-description">{description}</Description>
              {subDescription && <Remark>{subDescription}</Remark>}

              {body && <ModalBody>{body}</ModalBody>}

              <ButtonsWrapper showCancel={showCancel}>
                {showCancel && (
                  <Button
                    label={cancelText}
                    variant="hollow"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    shape={roundedButton ? 'rounded' : 'none'}
                    testId="decline-modal-button"
                  />
                )}
                <Button
                  type="submit"
                  variant={buttonConfig[variant]}
                  label={acceptText}
                  disabled={isSubmitting}
                  shape={roundedButton ? 'rounded' : 'none'}
                  testId="confirm-modal-button"
                  isLoading={isSubmitting}
                />
              </ButtonsWrapper>
            </FormWrapper>
          </FormikForm>
        </Formik>
      </ModalWindow>
    );
  },
);

export default SimpleModal;
