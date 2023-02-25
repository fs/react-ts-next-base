import React, { useState, useMemo } from 'react';
import * as Yup from 'yup';

import { REQUIRED_FIELD } from 'config/constants/errorsText';
import { Formik, Form as FormikForm } from 'formik';

import { useSendSmsCode } from 'lib/apollo/hooks/actions/auth';
import useCurrentUser from 'hooks/useCurrentUser';

import Button from 'components/shared/atoms/Button';
import ModalWindow from 'components/shared/atoms/ModalWindow';
import SelectField from 'components/shared/atoms/Selects/SelectField';

import { numberFormat } from 'helpers';
import { operationTypes } from '../../constants';

import ModalPhoneConfirmation from '../ModalPhoneConfirmation';

import {
  Title,
  Subtitle,
  VatButtonsWrapper,
  Accounts,
  Account,
  FIeldTitle,
  Number,
  ActionsWrapper,
  WithdrawalSum,
} from './styled';

const vatTypeOptions = [
  { value: 'TAXED', label: 'НДС облагается' },
  { value: 'EXEMPTED', label: 'НДС не облагается' },
];

const vatList = [0, 10, 20];

const AccountForm = ({
  title: modalTitle,
  buttonText,
  company,
  operation,
  onCloseModal,
  balance,
}) => {
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);

  const {
    officialName,
    legalForm: { shortName: legalFormShortName },
    checkingAccount,
    id: companyId,
  } = company;

  const [sendSmsCode] = useSendSmsCode();
  const { user } = useCurrentUser();

  const onOpenModalConfirmation = () => setIsOpenConfirmation(true);

  const onSubmit = async (_, { setSubmitting }) => {
    const { phoneNumber } = user;

    setSubmitting(true);

    await sendSmsCode(phoneNumber);
    onOpenModalConfirmation();

    setSubmitting(false);
  };

  const initialValues = {
    vatType: 'TAXED',
    vat: 0,
  };

  const validationSchema = Yup.object().shape({
    vatType: Yup.string().required(REQUIRED_FIELD).nullable(),
    vat: Yup.number().required(REQUIRED_FIELD).nullable(),
  });

  const AccountCompany = useMemo(
    () => (
      <div>
        Аналитический счет компании {legalFormShortName} “{officialName}”
        <Number>{company.id}</Number>
      </div>
    ),
    [company.id],
  );

  const CheckingAccount = <Number>{checkingAccount}</Number>;

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, values, setFieldValue }) => (
        <FormikForm>
          <Title>{modalTitle}</Title>
          <Subtitle>Номер документа будет сформирован и присвоен автоматически</Subtitle>
          <FIeldTitle>Сумма перевода</FIeldTitle>
          <WithdrawalSum>{balance ? numberFormat(balance) : 0} руб.</WithdrawalSum>
          <FIeldTitle>НДС</FIeldTitle>
          <SelectField name="vatType" options={vatTypeOptions} placeholder="" $mb={20} />
          {values.vatType === 'TAXED' && (
            <VatButtonsWrapper>
              {vatList.map((value, i) => (
                <Button
                  label={`${value} %`}
                  variant={value === values.vat ? 'confirm' : 'outlined-neutral'}
                  shape="extra-rounded"
                  $width="100%"
                  onClick={() => setFieldValue('vat', value)}
                  disabled={isSubmitting}
                  key={i}
                />
              ))}
            </VatButtonsWrapper>
          )}

          <Accounts>
            <Account>
              <FIeldTitle>Счет списания</FIeldTitle>
              {operation === operationTypes.WITHDRAWAL ? AccountCompany : CheckingAccount}
            </Account>

            <Account>
              <FIeldTitle>Счет получателя</FIeldTitle>
              {operation === operationTypes.WITHDRAWAL ? CheckingAccount : AccountCompany}
            </Account>
          </Accounts>

          <ActionsWrapper>
            <Button label={buttonText} variant="confirm" type="submit" disabled={isSubmitting} />
          </ActionsWrapper>

          <ModalWindow isOpen={isOpenConfirmation} setIsOpen={setIsOpenConfirmation} padding="3rem">
            <ModalPhoneConfirmation
              companyId={companyId}
              accountValues={values}
              onCloseModal={onCloseModal}
            />
          </ModalWindow>
        </FormikForm>
      )}
    </Formik>
  );
};

export default AccountForm;
