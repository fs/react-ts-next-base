import { SELLER } from 'config/constants/directions';
import { getTaxationSystem } from 'config/constants/taxationSystem';

export const getFields = company => {
  const {
    direction,
    legalForm: { name: legalFormName },
    taxationSystem,
    inn,
    officialName,
    unofficialName,
    directorFullName,
    legalAddress,
    postcode,
    kpp,
    ogrn,
    oktmo,
    bankName,
    checkingAccount,
    correspondentAccount,
    bic,
    email,
    phoneNumber,
  } = company;
  const isSeller = direction === SELLER;

  return [
    {
      name: 'legalForm',
      value: legalFormName,
      title: 'Организационно-правовая форма',
      initialValue: '',
    },
    isSeller && {
      name: 'taxationSystem',
      value: getTaxationSystem(taxationSystem),
      title: 'Система налогообложения',
      initialValue: '',
    },
    {
      name: 'inn',
      value: inn,
      title: 'ИНН',
      initialValue: '',
    },
    {
      name: 'officialName',
      value: officialName,
      title: 'Официальное наименование',
      initialValue: '',
    },
    {
      name: 'unofficialName',
      value: unofficialName,
      title: 'Неофициальное название',
      initialValue: '',
    },
    {
      name: 'directorFullName',
      value: directorFullName,
      title: 'ФИО генерального директора',
      initialValue: '',
    },
    {
      name: 'legalAddress',
      value: legalAddress,
      title: 'Юридический адрес',
      initialValue: '',
      width: '60%',
    },
    {
      name: 'postcode',
      value: postcode,
      title: 'Индекс',
      initialValue: '',
      width: '39%',
    },
    {
      name: 'kpp',
      value: kpp,
      title: 'КПП',
      initialValue: '',
    },
    {
      name: 'ogrn',
      value: ogrn,
      title: 'ОГРН',
      initialValue: '',
    },
    {
      name: 'oktmo',
      value: oktmo,
      title: 'ОКПО/ОКТМО (ОКАТО)',
      initialValue: '',
    },
    {
      name: 'bankName',
      value: bankName,
      title: 'Банк',
      initialValue: '',
    },
    {
      name: 'checkingAccount',
      value: checkingAccount,
      title: 'Расчетный счет',
      initialValue: '',
    },
    {
      name: 'correspondentAccount',
      value: correspondentAccount,
      title: 'Корреспондентский счет',
      initialValue: '',
    },
    {
      name: 'bic',
      value: bic,
      title: 'БИК',
      initialValue: '',
    },
    {
      name: 'email',
      value: email,
      title: 'email',
      initialValue: '',
    },
    {
      name: 'phoneNumber',
      value: phoneNumber,
      title: 'Контактный телефон компании',
      initialValue: '',
    },
  ].filter(Boolean);
};

export const getAttachmentFields = company => {
  const { logoUrl, companyConfirmationRecords } = company;

  return [
    {
      name: 'logo',
      value: logoUrl,
      initialValue: '',
    },
    {
      name: 'companyConfirmationRecords',
      value: companyConfirmationRecords.map(({ attachmentUrl: url, id, originalFilename }) => ({
        url,
        id,
        metadata: { filename: originalFilename },
      })),
      initialValue: '',
    },
  ];
};
