export const getFields = company => {
  const {
    legalForm: { name: legalFormName },
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

  return [
    {
      name: 'legalForm',
      value: legalFormName,
      title: 'Организационно-правовая форма',
    },
    {
      name: 'inn',
      value: inn,
      title: 'ИНН',
    },
    {
      name: 'officialName',
      value: officialName,
      title: 'Официальное наименование',
    },
    {
      name: 'unofficialName',
      value: unofficialName,
      title: 'Неофициальное название',
    },
    {
      name: 'directorFullName',
      value: directorFullName,
      title: 'ФИО генерального директора',
    },
    {
      name: 'legalAddress',
      value: legalAddress,
      title: 'Юридический адрес',

      width: '59%',
    },
    {
      name: 'postcode',
      value: postcode,
      title: 'Индекс',

      width: '39%',
    },
    {
      name: 'kpp',
      value: kpp,
      title: 'КПП',
    },
    {
      name: 'ogrn',
      value: ogrn,
      title: 'ОГРН',
    },
    {
      name: 'oktmo',
      value: oktmo,
      title: 'ОКПО/ОКТМО (ОКАТО)',
    },
    {
      name: 'bankName',
      value: bankName,
      title: 'Банк',
    },
    {
      name: 'checkingAccount',
      value: checkingAccount,
      title: 'Расчетный счет',
    },
    {
      name: 'correspondentAccount',
      value: correspondentAccount,
      title: 'Корреспондентский счет',
    },
    {
      name: 'bic',
      value: bic,
      title: 'БИК',
    },
    {
      name: 'email',
      value: email,
      title: 'email',
    },
    {
      name: 'phoneNumber',
      value: phoneNumber,
      title: 'Контактный телефон компании',
    },
  ];
};
