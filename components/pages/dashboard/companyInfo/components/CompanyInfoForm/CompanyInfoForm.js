import React, { useCallback } from 'react';
import { Formik, Form as FormikForm } from 'formik';

import { SELLER } from 'config/constants/directions';

import Icon from 'components/shared/atoms/Icon';
import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';
import RejectComment from 'components/shared/atoms/RejectComment';
import SelectField from 'components/shared/atoms/Selects/SelectField';

import LogoUpload from '../LogoUpload';
import AcceptFiles from '../AcceptFiles';

import {
  CompanyInfoWrapper,
  Title,
  Description,
  CompanyInfoList,
  RejectCommentWrapper,
  InputContainer,
  FieldWrapper,
  SelectWrapper,
  LogoUploadWrapper,
  ActionsWrapper,
} from './styled';

const CompanyInfoForm = ({ form, company }) => {
  const { direction } = company;
  const { initialValues, validationSchema, onSubmit, fields } = form;

  const actions = useCallback(
    ({ resetForm, disabled, isSubmitting }) => {
      return (
        <ActionsWrapper>
          <Button
            label="Отменить"
            variant="hollow"
            $width="9rem"
            testId="cancel-button"
            onClick={() => resetForm(initialValues)}
            disabled={disabled}
          />
          <Button
            label="Отправить на проверку"
            type="submit"
            testId="submit-button"
            disabled={disabled}
            isLoading={isSubmitting}
          />
        </ActionsWrapper>
      );
    },
    [company],
  );

  return (
    <CompanyInfoWrapper>
      <Title>Данные о компании</Title>
      <Description>
        Если вы захотите отредактировать какое-то поле, кроме номера телефона и поля e-mail,
        компания отправится на повторную проверку и все ваши товары в каталоге будут скрыты от
        пользователей на время проверки вашей компании.
      </Description>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, touched, values, resetForm, setFieldValue }) => (
          <FormikForm>
            <CompanyInfoList>
              {fields.map(({ name, fieldName, title, placeholder, width, type, options }, i) => {
                const rejectionComment = values?.rejectionComments?.[fieldName || name];
                const isRejected = !!rejectionComment;
                const disabled = isSubmitting || (values.isRejectedCompany && !isRejected);

                return (
                  <FieldWrapper key={i} width={width}>
                    {isRejected && (
                      <RejectCommentWrapper>
                        <RejectComment comment={rejectionComment} />
                      </RejectCommentWrapper>
                    )}

                    <InputContainer>
                      {type === 'text' && (
                        <Input
                          variant={isRejected ? 'change' : 'default'}
                          type="text"
                          name={name}
                          testId={name}
                          title={title}
                          placeholder={placeholder}
                          disabled={disabled}
                          iconType={isRejected ? 'trailing' : 'none'}
                          icon={<Icon name="pencil" $color="orange" $size={14} $mr={12} />}
                        />
                      )}

                      {type === 'select' && (
                        <SelectWrapper isRejected={isRejected}>
                          <SelectField
                            name={name}
                            options={options}
                            title={title}
                            placeholder={placeholder}
                            disabled={disabled}
                            $mb={20}
                          />
                        </SelectWrapper>
                      )}
                    </InputContainer>
                  </FieldWrapper>
                );
              })}
            </CompanyInfoList>

            <LogoUploadWrapper>
              <LogoUpload name="logo" setFieldValue={setFieldValue} values={values} />
            </LogoUploadWrapper>

            {direction === SELLER && <AcceptFiles setFieldValue={setFieldValue} values={values} />}

            {actions({ resetForm, disabled: !Object.values(touched).length, isSubmitting })}
          </FormikForm>
        )}
      </Formik>
    </CompanyInfoWrapper>
  );
};

export default CompanyInfoForm;
