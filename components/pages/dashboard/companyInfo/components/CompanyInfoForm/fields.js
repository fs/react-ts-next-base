import * as Yup from 'yup';

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
import { EMAIL_INVALID, INVALID_FORMAT, REQUIRED_FIELD } from 'config/constants/errorsText';
import { taxationSystems } from 'config/constants/taxationSystem';
import { SELLER } from 'config/constants/directions';
import { phoneFormatter } from 'helpers';

const SOLE_PROPRIETOR = 'sole_proprietor';

export const getFields = ({ company = {}, legalForms = [] }) => {
  const {
    direction,
    legalForm: { id: legalFormId },
    taxationSystem,
    inn,
    officialName,
    bankName,
    bic,
    checkingAccount,
    correspondentAccount,
    directorFullName,
    email,
    kpp,
    legalAddress,
    ogrn,
    oktmo,
    phoneNumber,
    postcode,
    unofficialName,
  } = company;
  const isSeller = direction === SELLER;

  return [
    {
      name: 'legalFormId',
      fieldName: 'legalForm',
      type: 'select',
      title: 'Организационно правовая форма',
      placeholder: 'Организационно правовая форма',
      initialValue: legalFormId,
      validationSchema: Yup.string().required(REQUIRED_FIELD).nullable(),
      options: legalForms.map(legalForm => ({ value: legalForm.id, label: legalForm.name })),
    },
    isSeller && {
      name: 'taxationSystem',
      type: 'select',
      title: 'Система налогообложения',
      placeholder: 'Система налогообложения',
      initialValue: taxationSystem,
      validationSchema: Yup.string().required(REQUIRED_FIELD).nullable(),
      options: taxationSystems,
    },
    {
      name: 'inn',
      type: 'text',
      title: 'ИНН',
      placeholder: 'ИНН',
      initialValue: inn,
      validationSchema: Yup.string()
        .required(REQUIRED_FIELD)
        .matches(innRegularExp, INVALID_FORMAT)
        .nullable(),
    },
    {
      name: 'officialName',
      type: 'text',
      title: 'Официальное наименование',
      placeholder: 'Официальное наименование',
      initialValue: officialName,
      validationSchema: Yup.string().required(REQUIRED_FIELD).nullable(),
    },
    {
      name: 'unofficialName',
      type: 'text',
      title: 'Неофициальное название',
      placeholder: 'Неофициальное название',
      initialValue: unofficialName,
      validationSchema: Yup.string().required(REQUIRED_FIELD).nullable(),
    },
    {
      name: 'directorFullName',
      type: 'text',
      title: 'ФИО генерального директора',
      placeholder: 'ФИО генерального директора',
      initialValue: directorFullName,
      validationSchema: Yup.string().required(REQUIRED_FIELD).nullable(),
    },
    {
      name: 'legalAddress',
      type: 'text',
      initialValue: legalAddress,
      title: 'Юридический адрес',
      placeholder: 'Юридический адрес',
      width: 73,
      validationSchema: Yup.string().required(REQUIRED_FIELD).nullable(),
    },
    {
      name: 'postcode',
      type: 'text',
      initialValue: postcode,
      title: 'Индекс',
      placeholder: 'Индекс',
      width: 25,
      validationSchema: Yup.string()
        .required(REQUIRED_FIELD)
        .matches(postcodeRegularExp, INVALID_FORMAT)
        .nullable(),
    },
    {
      name: 'kpp',
      type: 'text',
      initialValue: kpp,
      title: 'КПП',
      placeholder: 'КПП',
      validationSchema: Yup.string().when(['legalFormId'], (value, schema) => {
        return value !== SOLE_PROPRIETOR
          ? schema.required(REQUIRED_FIELD).matches(kppRegularExp, INVALID_FORMAT).nullable()
          : schema;
      }),
    },
    {
      name: 'ogrn',
      type: 'text',
      initialValue: ogrn,
      title: 'ОГРН',
      placeholder: 'ОГРН',
      validationSchema: Yup.string()
        .required(REQUIRED_FIELD)
        .matches(ogrnRegularExp, INVALID_FORMAT)
        .nullable(),
    },
    {
      name: 'oktmo',
      type: 'text',
      initialValue: oktmo,
      title: 'ОКПО/ОКТМО (ОКАТО)',
      placeholder: 'ОКПО/ОКТМО (ОКАТО)',
      validationSchema: Yup.string()
        .required(REQUIRED_FIELD)
        .matches(oktmoOkpoOkatoRegularExp, INVALID_FORMAT)
        .nullable(),
    },
    {
      name: 'bankName',
      type: 'text',
      initialValue: bankName,
      title: 'Банк',
      placeholder: 'Банк',
      validationSchema: Yup.string().required(REQUIRED_FIELD).nullable(),
    },
    {
      name: 'checkingAccount',
      type: 'text',
      initialValue: checkingAccount,
      title: 'Расчетный счет',
      placeholder: 'Расчетный счет',
      validationSchema: Yup.string()
        .required(REQUIRED_FIELD)
        .matches(checkingAccountRegularExp, INVALID_FORMAT)
        .nullable(),
    },
    {
      name: 'correspondentAccount',
      type: 'text',
      initialValue: correspondentAccount,
      title: 'Корреспондентский счет',
      placeholder: 'Корреспондентский счет',
      validationSchema: Yup.string()
        .required(REQUIRED_FIELD)
        .matches(correspondentAccountRegularExp, INVALID_FORMAT)
        .nullable(),
    },
    {
      name: 'bic',
      type: 'text',
      initialValue: bic,
      title: 'БИК',
      placeholder: 'БИК',
      validationSchema: Yup.string()
        .required(REQUIRED_FIELD)
        .matches(bicRegularExp, INVALID_FORMAT)
        .nullable(),
    },
    {
      name: 'email',
      type: 'text',
      initialValue: email,
      title: 'email',
      placeholder: 'email',
      validationSchema: Yup.string().email(EMAIL_INVALID).required(REQUIRED_FIELD).nullable(),
    },
    {
      name: 'phoneNumber',
      type: 'text',
      initialValue: phoneFormatter(phoneNumber),
      title: 'Контактный телефон',
      placeholder: 'Контактный телефон',
      validationSchema: Yup.string()
        .required(REQUIRED_FIELD)
        .matches(phoneRegularExp, INVALID_FORMAT)
        .nullable(),
    },
  ].filter(Boolean);
};

export const getAttachmentFields = ({ company = {} }) => {
  const { logoUrl, companyConfirmationRecords } = company;

  return [
    {
      name: 'logo',
      initialValue: null,
      validationSchema: Yup.object()
        .when(['logoRemoteUrl'], (logoRemoteUrl, schema, { value: logo }) =>
          !logoRemoteUrl && !logo ? schema.required(REQUIRED_FIELD) : schema,
        )
        .nullable(),
    },
    {
      name: 'logoRemoteUrl',
      initialValue: logoUrl,
      validationSchema: Yup.string().nullable(),
    },
    {
      name: 'companyConfirmationRecords',
      initialValue: companyConfirmationRecords.length
        ? companyConfirmationRecords.map(({ attachmentUrl: url, id, originalFilename }) => ({
            attachmentRemoteUrl: url,
            attachment: { id, url, metadata: { filename: originalFilename } },
          }))
        : [],
      validationSchema: Yup.array(),
    },
  ];
};
