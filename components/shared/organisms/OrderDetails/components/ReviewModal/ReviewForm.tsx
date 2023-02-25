import React from 'react';
import { Formik, Form as FormikForm, FormikHelpers } from 'formik';

import { useCreateReview } from 'lib/apollo/hooks/actions/order';

import Icon from 'components/shared/atoms/Icon';
import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';

import RatingInput from './RatingInput';

import { ContentWrapper, ActionsWrapper, Notice, Actions, InputTitle } from './styled';
import { TReviewForm } from './types';
import { initialValues, TFormValues, validationSchema } from './fields';

const ReviewForm: React.FunctionComponent<TReviewForm> = ({ closeModal, orderId }) => {
  const [createReview] = useCreateReview();

  const onSubmit = async (values: TFormValues, { setSubmitting }: FormikHelpers<TFormValues>) => {
    setSubmitting(true);

    await createReview({ ...values, orderId });

    setSubmitting(false);
    closeModal();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {() => (
        <FormikForm>
          <ContentWrapper>
            <InputTitle>Оцените продавца по пятибальной шкале</InputTitle>
            <RatingInput name="companyRating" />

            <InputTitle>Оставьте комментарий о продавце</InputTitle>
            <Input
              type="textarea"
              name="companyBody"
              testId="company-text"
              placeholder="Ваш комментарий"
            />
          </ContentWrapper>

          <ContentWrapper>
            <InputTitle>Оцените товар по пятибальной шкале</InputTitle>
            <RatingInput name="productRating" />

            <InputTitle>Оставьте комментарий о товаре</InputTitle>
            <Input
              type="textarea"
              name="productBody"
              testId="products-text"
              placeholder="Ваш комментарий"
            />
          </ContentWrapper>

          <ActionsWrapper>
            <Notice>
              <Icon name="exclamation-square" $size={26} $mr={10} $color="orange" />
              Отзыв по данному заказу можно оставить лишь один раз, повторный вы сможете написать в
              случае если этот покупатель снова сделает у вас заказ
            </Notice>

            <Actions>
              <Button label="Отменить" variant="hollow" onClick={closeModal} />
              <Button
                label="Оставить отзыв"
                type="submit"
                testId="create-review-submit-button"
                $ml={8}
              />
            </Actions>
          </ActionsWrapper>
        </FormikForm>
      )}
    </Formik>
  );
};

export default ReviewForm;
