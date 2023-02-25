import React from 'react';
import * as Yup from 'yup';
import { INVALID_COMMENT_LENGTH, REQUIRED_FIELD } from 'config/constants/errorsText';
import { Formik, Form as FormikForm } from 'formik';

import Icon from 'components/shared/atoms/Icon';
import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';
import { ButtonsWrapper, FormWrapper } from './styled';

const EditReviewForm = ({ closeForm, action, reviewBody }) => {
  const onSubmit = async ({ body }) => {
    await action(body);
    closeForm();
  };

  const initialValues = {
    body: reviewBody,
  };
  const validationSchema = Yup.object().shape({
    body: Yup.string()
      .required(REQUIRED_FIELD)
      .max(500, ({ value }) => INVALID_COMMENT_LENGTH(500, value.length)),
  });

  const onClose = event => {
    event.preventDefault();
    closeForm();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <FormWrapper data-testid="edit-review-form">
          <FormikForm>
            <Input
              name="body"
              type="textarea"
              testId="update-review-input"
              iconType="trailing"
              icon={
                <ButtonsWrapper>
                  <Button
                    type="submit"
                    variant="confirm"
                    iconType="only"
                    icon={<Icon name="checkmark" $color="white" $size={20} />}
                    shape="rounded"
                    disabled={isSubmitting}
                    testId="submit-review-update"
                  />
                  <Button
                    variant="alert"
                    iconType="only"
                    icon={<Icon name="close" $color="white" $size={16} />}
                    shape="rounded"
                    disabled={isSubmitting}
                    onClick={onClose}
                    $ml={8}
                    $mr={8}
                    testId="close-review-update"
                  />
                </ButtonsWrapper>
              }
            />
          </FormikForm>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default EditReviewForm;
