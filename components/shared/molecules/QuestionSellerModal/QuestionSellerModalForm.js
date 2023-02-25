import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';

import QuestionPhotos from './QuestionPhotos';

import { Title, Description, ActionsWrapper } from './styled';

const QuestionSellerModalForm = ({ form }) => {
  const { onSubmit, initialValues, validationSchema } = form;

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, values, setFieldValue }) => (
        <FormikForm>
          <Title>Задать вопрос продавцу</Title>
          <Input name="message" type="textarea" placeholder="Ваш вопрос" />
          <Description>
            К вопросу вы так же можете прикрепить любое видео и изображение
            <br /> общим весом не более 15 Мб.
          </Description>

          <QuestionPhotos setFieldValue={setFieldValue} values={values} />

          <ActionsWrapper>
            <Button
              isLoading={isSubmitting}
              label="Отправить"
              type="submit"
              disabled={isSubmitting}
            />
          </ActionsWrapper>
        </FormikForm>
      )}
    </Formik>
  );
};

export default QuestionSellerModalForm;
