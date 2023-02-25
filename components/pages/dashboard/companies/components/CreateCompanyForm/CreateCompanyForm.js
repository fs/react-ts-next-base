import React, { useState } from 'react';
import { useModal } from '@ebay/nice-modal-react';
import useRouter from 'hooks/useRouter';
import Link from 'next/link';
import * as Yup from 'yup';

import {
  AGREEMENT,
  CONTRACT,
  DASHBOARD_COMPANY_ADDRESSES,
  DASHBOARD_COMPANY_ORDERS,
} from 'config/routes';

import { useCreateCompany } from 'lib/apollo/hooks/actions/companies';
import { useCompanyLegalForms } from 'lib/apollo/hooks/state/legalForms';
import useCurrentUser from 'hooks/useCurrentUser';
import useNotifier from 'hooks/useNotifier';

import { EMAIL_INVALID, INVALID_FORMAT, REQUIRED_FIELD } from 'config/constants/errorsText';
import { taxationSystems } from 'config/constants/taxationSystem';
import {
  checkingAccountRegularExp,
  postcodeRegularExp,
  innRegularExp,
  kppRegularExp,
  ogrnRegularExp,
  oktmoOkpoOkatoRegularExp,
  correspondentAccountRegularExp,
  bicRegularExp,
  phoneRegularExp,
} from 'config/constants/regularExpressions';
import { CompanyDirectionEnum } from 'graphql/types';

import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import CreateCompanyFormContent from './CreateCompanyFormContent';
import { initFieldValues } from './constants';

const SOLE_PROPRIETOR = 'sole_proprietor';

const CreateCompanyForm = ({ direction, isFirst }) => {
  const [isAgreementAccepted, setIsAgreementAccepted] = useState(false);
  const [isContractAccepted, setIsContractAccepted] = useState(false);

  const { pushRoute } = useRouter();
  const { user, refetch: refetchUser } = useCurrentUser();
  const createCompanyModal = useModal(SimpleModal);

  const isSeller = direction === CompanyDirectionEnum.Seller;
  const hasGuestOrders = Number(user?.guestUserOrders?.length) >= 1;

  const onCreateCompany = ({ id: companyId }) => {
    if (hasGuestOrders && !isSeller) {
      refetchUser();
      pushRoute({
        pathname: DASHBOARD_COMPANY_ORDERS,
        query: {
          companyId,
        },
      });
    } else {
      pushRoute({
        pathname: DASHBOARD_COMPANY_ADDRESSES,
        query: {
          newCompany: true,
          isFirst,
          companyId,
        },
      });
    }
  };

  const [createCompany] = useCreateCompany({ onSubmit: onCreateCompany });
  const { legalForms, loading: loadingLegalForms } = useCompanyLegalForms();

  const { setError } = useNotifier();

  const onLegalFormChange = (option, _, setFieldValue) => {
    if (option?.value === SOLE_PROPRIETOR) {
      setFieldValue('kpp', '', false);
    }
  };
  const checkboxes = [
    {
      name: 'agreement',
      label: (
        <Link href={AGREEMENT} target="_blank" rel="noreferrer">
          Соглашение с политикой обработки персональных данных
        </Link>
      ),
      onChange: setIsAgreementAccepted,
      checked: isAgreementAccepted,
    },
    {
      name: 'contract',
      label: (
        <Link href={CONTRACT} target="_blank" rel="noreferrer">
          Агентский договор коммерческого представительства
        </Link>
      ),
      onChange: setIsContractAccepted,
      checked: isContractAccepted,
    },
  ];

  const fields = [
    {
      type: 'select',
      name: 'legalFormId',
      initialValue: initFieldValues.legalFormId,
      title: 'Выбрать организационно-правовую форму',
      placeholder: 'Выбрать организационно-правовую форму',
      validationSchema: Yup.string().required(REQUIRED_FIELD).nullable(),
      onChange: onLegalFormChange,
      disabled: loadingLegalForms,
      options: legalForms.map(legalForm => ({ value: legalForm.id, label: legalForm.name })),
    },
    isSeller && {
      type: 'select',
      name: 'taxationSystem',
      initialValue: initFieldValues.taxationSystem,
      title: 'Выбрать систему налогообложения',
      placeholder: 'Выбрать систему налогообложения',
      validationSchema: Yup.string().required(REQUIRED_FIELD).nullable(),
      options: taxationSystems,
    },
    {
      type: 'text',
      name: 'inn',
      initialValue: initFieldValues.inn,
      title: 'ИНН',
      placeholder: 'Введите ИНН для загрузки данных',
      validationSchema: Yup.string()
        .required(REQUIRED_FIELD)
        .matches(innRegularExp, INVALID_FORMAT)
        .nullable(),
    },
    {
      type: 'text',
      name: 'officialName',
      initialValue: initFieldValues.officialName,
      title: 'Официальное наименование',
      placeholder: 'Официальное наименование',
      validationSchema: Yup.string().required(REQUIRED_FIELD).nullable(),
    },
    {
      type: 'text',
      name: 'unofficialName',
      initialValue: initFieldValues.unofficialName,
      title: 'Неофициальное название',
      placeholder: 'Неофициальное название',
      validationSchema: Yup.string().required(REQUIRED_FIELD).nullable(),
    },
    {
      type: 'text',
      name: 'directorFullName',
      initialValue: initFieldValues.directorFullName,
      title: 'ФИО генерального директора',
      placeholder: 'ФИО генерального директора',
      validationSchema: Yup.string().required(REQUIRED_FIELD).nullable(),
    },
    {
      type: 'text',
      name: 'legalAddress',
      initialValue: initFieldValues.legalAddress,
      title: 'Юридический адрес',
      placeholder: 'Юридический адрес',
      width: '73%',
      validationSchema: Yup.string().required(REQUIRED_FIELD).nullable(),
    },
    {
      type: 'text',
      name: 'postcode',
      initialValue: initFieldValues.postcode,
      title: 'Индекс',
      placeholder: 'Индекс',
      width: '25%',
      validationSchema: Yup.string()
        .required(REQUIRED_FIELD)
        .matches(postcodeRegularExp, INVALID_FORMAT)
        .nullable(),
    },
    {
      type: 'text',
      name: 'kpp',
      initialValue: initFieldValues.kpp,
      title: 'КПП',
      placeholder: 'КПП',
      validationSchema: Yup.string()
        .when(['legalFormId'], (legalFormId, schema) => {
          return legalFormId !== SOLE_PROPRIETOR
            ? schema.required(REQUIRED_FIELD).matches(kppRegularExp, INVALID_FORMAT)
            : schema;
        })
        .nullable(),
    },
    {
      type: 'text',
      name: 'ogrn',
      initialValue: initFieldValues.ogrn,
      title: 'ОГРН',
      placeholder: 'ОГРН',
      validationSchema: Yup.string()
        .required(REQUIRED_FIELD)
        .matches(ogrnRegularExp, INVALID_FORMAT)
        .nullable(),
    },
    {
      type: 'text',
      name: 'oktmo',
      initialValue: initFieldValues.oktmo,
      title: 'ОКПО/ОКТМО (ОКАТО)',
      placeholder: 'ОКПО/ОКТМО (ОКАТО)',
      validationSchema: Yup.string()
        .required(REQUIRED_FIELD)
        .matches(oktmoOkpoOkatoRegularExp, INVALID_FORMAT)
        .nullable(),
    },
    {
      type: 'text',
      name: 'bankName',
      initialValue: initFieldValues.bankName,
      title: 'Банк',
      placeholder: 'Банк',
      validationSchema: Yup.string().required(REQUIRED_FIELD).nullable(),
    },
    {
      type: 'text',
      name: 'checkingAccount',
      initialValue: initFieldValues.checkingAccount,
      title: 'Расчетный счет',
      placeholder: 'Расчетный счет',
      validationSchema: Yup.string()
        .required(REQUIRED_FIELD)
        .matches(checkingAccountRegularExp, INVALID_FORMAT)
        .nullable(),
    },
    {
      type: 'text',
      name: 'correspondentAccount',
      initialValue: initFieldValues.correspondentAccount,
      title: 'Корреспондентский счет',
      placeholder: 'Корреспондентский счет',
      validationSchema: Yup.string()
        .required(REQUIRED_FIELD)
        .matches(correspondentAccountRegularExp, INVALID_FORMAT)
        .nullable(),
    },
    {
      type: 'text',
      name: 'bic',
      initialValue: initFieldValues.bic,
      title: 'БИК',
      placeholder: 'БИК',
      validationSchema: Yup.string()
        .required(REQUIRED_FIELD)
        .matches(bicRegularExp, INVALID_FORMAT)
        .nullable(),
    },
    {
      type: 'text',
      name: 'email',
      initialValue: initFieldValues.email,
      title: 'email',
      placeholder: 'email',
      validationSchema: Yup.string().email(EMAIL_INVALID).required(REQUIRED_FIELD).nullable(),
    },
    {
      type: 'text',
      name: 'phoneNumber',
      initialValue: initFieldValues.phoneNumber,
      title: 'Контактный телефон компании',
      placeholder: 'Контактный телефон компании',
      validationSchema: Yup.string()
        .required(REQUIRED_FIELD)
        .matches(phoneRegularExp, INVALID_FORMAT)
        .nullable(),
    },
  ].filter(Boolean);

  const logoField = {
    name: 'logo',
    initialValue: initFieldValues.logo,
    validationSchema: Yup.object().required(REQUIRED_FIELD).nullable(),
  };

  const companyConfirmationRecordsField = {
    name: 'companyConfirmationRecords',
    initialValue: initFieldValues.companyConfirmationRecords,
    validationSchema: Yup.array(),
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const submitValues = {
      ...values,
      companyConfirmationRecords: values.companyConfirmationRecords.map(({ attachment }) =>
        attachment.url ? { attachmentRemoteUrl: attachment.url } : { attachment },
      ),
      direction,
    };

    try {
      if (hasGuestOrders && !isSeller) {
        await createCompanyModal.show({
          onSubmit: async () => {
            await createCompany(submitValues);
          },
          title: 'Добавить компанию',
          description: 'Вы уверены, что хотите добавить эту компанию?',
        });
      } else {
        await createCompany(submitValues);
      }
    } catch (error) {
      setError(error);
    }

    setSubmitting(false);
  };

  return (
    <CreateCompanyFormContent
      fields={fields}
      checkboxes={checkboxes}
      onSubmit={onSubmit}
      isAgreementAccepted={isAgreementAccepted}
      isContractAccepted={isContractAccepted}
      logoField={logoField}
      companyConfirmationRecordsField={companyConfirmationRecordsField}
      direction={direction}
      legalForms={legalForms}
    />
  );
};

export default CreateCompanyForm;
