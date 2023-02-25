export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ISO8601Date: string;
  ISO8601DateTime: string;
  PhoneNumber: string;
  SquishedString: string;
};

export type AcceptCompanyLocationInput = {
  /** ID адреса компании */
  companyLocationId: Scalars['ID'];
};

export type AcceptTransferInput = {
  /** Перевод */
  transferId: Scalars['ID'];
};

export type Account = {
  __typename?: 'Account';
  /** Баланс */
  balance: Scalars['Float'];
  /** Сумма в сделке */
  pendingAmount: Scalars['Float'];
};

/** Операция по аналитическому счету */
export type AccountOperation = {
  __typename?: 'AccountOperation';
  /** Дата/время подтверждения */
  acceptedAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** Сумма */
  amount: Scalars['Float'];
  id: Scalars['ID'];
  /** Тип операции (поступление/списание) */
  operationType: AccountOperationTypeEnum;
  /** Документ-основание операции по счету */
  origin: AccountOperationOriginInterface;
  /** ID источника */
  originId: Scalars['ID'];
  /** Тип источника */
  originType: AccountOperationOriginTypeEnum;
  /** Статус */
  status: AccountOperationStatusEnum;
  /** Назначение */
  subject: AccountOperationSubjectEnum;
};

/** The connection type for AccountOperation. */
export type AccountOperationConnection = {
  __typename?: 'AccountOperationConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AccountOperationEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<AccountOperation>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AccountOperationEdge = {
  __typename?: 'AccountOperationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<AccountOperation>;
};

/** Документ-основание операции по счету */
export type AccountOperationOriginInterface = {
  id: Scalars['ID'];
};

export enum AccountOperationOriginTypeEnum {
  /** заказ */
  Order = 'ORDER',
  /** перевод */
  Transfer = 'TRANSFER',
}

export enum AccountOperationStatusEnum {
  /** принята */
  Accepted = 'ACCEPTED',
  /** отклонена */
  Declined = 'DECLINED',
  /** заморожена */
  Pending = 'PENDING',
}

export enum AccountOperationSubjectEnum {
  /** агентское вознаграждение */
  AgencyFee = 'AGENCY_FEE',
  /** пополнение счета */
  Deposit = 'DEPOSIT',
  /** спор завершен */
  DisputeFinished = 'DISPUTE_FINISHED',
  /** доставка по завершенному спору */
  FinishedDisputeDelivery = 'FINISHED_DISPUTE_DELIVERY',
  /** оплата доставки */
  ProductDelivery = 'PRODUCT_DELIVERY',
  /** оплата товара */
  ProductPayment = 'PRODUCT_PAYMENT',
  /** вывод средств со счета */
  Withdrawal = 'WITHDRAWAL',
}

export enum AccountOperationTypeEnum {
  /** списание */
  Decrease = 'DECREASE',
  /** поступление */
  Increase = 'INCREASE',
}

export type AddCompanyToBlacklistInput = {
  /** ID компании */
  companyId: Scalars['ID'];
};

export type AddProductToCartInput = {
  /** Компания-покупатель */
  companyId: Scalars['ID'];
  /** Адрес доставки. Обязателен если способ доставки 'курьер' или 'до терминала' */
  companyLocationId?: InputMaybe<Scalars['ID']>;
  /** Способ доставки */
  deliveryMethod: DeliveryMethodEnum;
  /** Терминал доставки. Обязателен если способ доставки 'до терминала' */
  deliveryPointId?: InputMaybe<Scalars['ID']>;
  /** Служба доставки. Обязательна если способ доставки 'курьер' или 'до терминала' */
  deliveryService?: InputMaybe<DeliveryServiceEnum>;
  /** Дата самовывоза. Обязательна если способ доставки 'самовывоз' */
  pickupDate?: InputMaybe<Scalars['ISO8601Date']>;
  /** Количество */
  quantity: Scalars['Int'];
  /** Вариант товара */
  variantId: Scalars['ID'];
};

export type AddProductToFavoritesInput = {
  /** ID товара */
  productId: Scalars['ID'];
};

export type AddProductToGuestCartInput = {
  /** Адрес доставки */
  cityId: Scalars['ID'];
  /** Способ доставки */
  deliveryMethod: DeliveryMethodEnum;
  /** Терминал доставки. Обязателен если способ доставки 'до терминала' */
  deliveryPointId?: InputMaybe<Scalars['ID']>;
  /** Служба доставки. Обязательна если способ доставки 'до терминала' */
  deliveryService?: InputMaybe<DeliveryServiceEnum>;
  /** Дата самовывоза. Обязательна если способ доставки 'самовывоз' */
  pickupDate?: InputMaybe<Scalars['ISO8601Date']>;
  /** Количество */
  quantity: Scalars['Int'];
  /** Вариант товара */
  variantId: Scalars['ID'];
};

export type AddProductToPriorityListInput = {
  /** ID товара */
  productId: Scalars['ID'];
};

/** Результат добавления товара в список приоритетных */
export type AddProductToPriorityListPayload = {
  __typename?: 'AddProductToPriorityListPayload';
  /** Приоритезированный товар */
  product: Product;
};

/** Информация об аутентификации текущего пользователя */
export type Authentication = {
  __typename?: 'Authentication';
  accessToken: Scalars['String'];
  me?: Maybe<CurrentUser>;
  refreshToken: Scalars['String'];
};

export type AuthorizationResult = {
  __typename?: 'AuthorizationResult';
  /** Human-readable error message */
  message?: Maybe<Scalars['String']>;
  /** Reasons of check failure */
  reasons?: Maybe<FailureReasons>;
  /** Result of applying a policy rule */
  value: Scalars['Boolean'];
};

export type BanCompanyInput = {
  /** ID блокируемой компании */
  companyId: Scalars['ID'];
  /** Причина блокировки */
  deletionMessage: Scalars['String'];
};

export type BlockUserInput = {
  /** ID блокируемого пользователя */
  userId: Scalars['ID'];
};

export type CancelDisputeInput = {
  /** id спора */
  disputeId: Scalars['ID'];
};

export type CancelReservedOrderInput = {
  /** ID заказа */
  orderId: Scalars['ID'];
};

export type Category = {
  __typename?: 'Category';
  canDestroy: AuthorizationResult;
  /** Глубина в дереве. Корневые - 0, их дети - 1, и т.д. */
  depth: Scalars['Int'];
  /** Флаг 'отображать на стартовой странице' */
  displayOnStartPage: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Родительская категория. Если null, то данная категория - корневая (верхняя) */
  parent?: Maybe<Category>;
  /** Позиция на своем уровне (для упорядочивания), начинается с 1 */
  position: Scalars['Int'];
};

export type City = {
  __typename?: 'City';
  cityType: Scalars['String'];
  fiasId: Scalars['String'];
  id: Scalars['ID'];
  kladrId: Scalars['String'];
  name: Scalars['String'];
  region: Scalars['String'];
};

/** The connection type for City. */
export type CityConnection = {
  __typename?: 'CityConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CityEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<City>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CityEdge = {
  __typename?: 'CityEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<City>;
};

/** Компания */
export type Company = ReviewableItem & {
  __typename?: 'Company';
  /** Наименование банка */
  bankName: Scalars['String'];
  /** БИК банка */
  bic: Scalars['String'];
  /** Дата внесения в черный список */
  blacklistedAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** Расчетный счет */
  checkingAccount: Scalars['String'];
  /** Подтверждающие фото и видео */
  companyConfirmationRecords: Array<ConfirmationRecord>;
  /** Участники компании */
  companyMembers: Array<CompanyMember>;
  /** Корреспондентский счет */
  correspondentAccount: Scalars['String'];
  /** Дата создания */
  createdAt: Scalars['ISO8601DateTime'];
  /** Дата удаления */
  deletedAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** Причина удаления */
  deletionReason?: Maybe<CompanyDeletionReasonEnum>;
  /** Количество доставленных заказов */
  deliveredOrdersCount?: Maybe<Scalars['Int']>;
  /** Направление: продавец / покупатель */
  direction: CompanyDirectionEnum;
  /** ФИО генерального директора */
  directorFullName: Scalars['String'];
  email: Scalars['String'];
  /** ID компании */
  id: Scalars['ID'];
  inn: Scalars['String'];
  kpp: Scalars['String'];
  /** Сотрудники компании, которые будут удалены в случае удаления компании */
  lastEmployeeMembers: Array<CompanyMember>;
  /** Юридический адрес */
  legalAddress: Scalars['String'];
  /** Организационно-правовая форма */
  legalForm: CompanyLegalForm;
  logoUrl: Scalars['String'];
  /** Флаг 'основная' для текущего пользователя */
  main: Scalars['Boolean'];
  /** Роль текущего пользователя в компании */
  myRole?: Maybe<CompanyRole>;
  /** Официальное наименование */
  officialName: Scalars['String'];
  /** ОГРН */
  ogrn: Scalars['String'];
  /** ОКТМО или ОКАТО */
  oktmo: Scalars['String'];
  /** Номер телефона, без кода страны, нормализованный: 10 цифр */
  phoneNumber: Scalars['String'];
  /** Почтовый индекс */
  postcode: Scalars['String'];
  /** Рейтинг */
  rating?: Maybe<Scalars['Float']>;
  /** Количество оставленных отзывов */
  receivedReviewsCount: Scalars['Int'];
  /** Поля заявки, на которые были запрошены изменения */
  rejectedFields: Array<CompanyRejectedField>;
  /** Количество отклонений администратором */
  rejectsCount: Scalars['Int'];
  /** Количество продуктов данной компании */
  sellableProductsCount: Scalars['Int'];
  /** Статус: проверена / непроверена */
  status: CompanyStatusEnum;
  /** Система налогообложения */
  taxationSystem?: Maybe<CompanyTaxationSystemEnum>;
  /** Неофициальное наименование */
  unofficialName: Scalars['String'];
  /** Дедлайн проверки заявки */
  verificationDeadlineAt?: Maybe<Scalars['ISO8601DateTime']>;
};

export type CompanyConfirmationRecordInput = {
  /**
   * Информация о файле, загруженном с помощью direct upload, игнорируется если задан `attachmentRemoteUrl`
   *
   */
  attachment?: InputMaybe<Uploader>;
  /** Ссылка на загружаемый файл */
  attachmentRemoteUrl?: InputMaybe<Scalars['String']>;
};

/** The connection type for Company. */
export type CompanyConnection = {
  __typename?: 'CompanyConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CompanyEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Company>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export enum CompanyDeletionReasonEnum {
  /** Banned */
  Banned = 'BANNED',
  /** Удалена клиентом */
  DeletedByClient = 'DELETED_BY_CLIENT',
  /** Руководитель заблокирован */
  OwnerBlocked = 'OWNER_BLOCKED',
}

export enum CompanyDirectionEnum {
  /** Покупатель */
  Buyer = 'BUYER',
  /** Продавец */
  Seller = 'SELLER',
}

/** An edge in a connection. */
export type CompanyEdge = {
  __typename?: 'CompanyEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Company>;
};

export type CompanyFieldCommentInput = {
  /** Комментарий к полю */
  comment: Scalars['String'];
  /** Название поля */
  name: CompanyFieldEnum;
};

export enum CompanyFieldEnum {
  /** Банк */
  BankName = 'BANK_NAME',
  /** БИК */
  Bic = 'BIC',
  /** Расчетный счет */
  CheckingAccount = 'CHECKING_ACCOUNT',
  /** Подтверждающие фото и видео */
  CompanyConfirmationRecords = 'COMPANY_CONFIRMATION_RECORDS',
  /** Корреспондентский счет */
  CorrespondentAccount = 'CORRESPONDENT_ACCOUNT',
  /** ФИО генерального директора */
  DirectorFullName = 'DIRECTOR_FULL_NAME',
  /** email */
  Email = 'EMAIL',
  /** ИНН */
  Inn = 'INN',
  /** КПП */
  Kpp = 'KPP',
  /** Юридический адрес */
  LegalAddress = 'LEGAL_ADDRESS',
  /** Организационно-правовая форма */
  LegalForm = 'LEGAL_FORM',
  /** Логотип компании */
  Logo = 'LOGO',
  /** Официальное наименование */
  OfficialName = 'OFFICIAL_NAME',
  /** ОГРН */
  Ogrn = 'OGRN',
  /** ОКПО/ОКТМО (ОКАТО) */
  Oktmo = 'OKTMO',
  /** Контактный телефон */
  PhoneNumber = 'PHONE_NUMBER',
  /** Индекс */
  Postcode = 'POSTCODE',
  /** Taxation system */
  TaxationSystem = 'TAXATION_SYSTEM',
  /** Неофициальное название */
  UnofficialName = 'UNOFFICIAL_NAME',
}

export type CompanyInput = {
  /** Наименование банка */
  bankName: Scalars['SquishedString'];
  /** БИК банка */
  bic: Scalars['String'];
  /** Расчетный счет компании */
  checkingAccount: Scalars['String'];
  /** Подтверждающие фото и видео */
  companyConfirmationRecords?: InputMaybe<Array<CompanyConfirmationRecordInput>>;
  /** Корреспондентский счет компании */
  correspondentAccount: Scalars['String'];
  /** Направление компании: продавец / покупатель */
  direction: CompanyDirectionEnum;
  /** ФИО генерального директора */
  directorFullName: Scalars['SquishedString'];
  /** E-mail компании */
  email: Scalars['String'];
  /** ИНН компании */
  inn: Scalars['String'];
  /** КПП компании */
  kpp?: InputMaybe<Scalars['String']>;
  /** Юридический адрес компании */
  legalAddress: Scalars['SquishedString'];
  /** Организационно-правовая форма, см. query `companyLegalForms` */
  legalFormId: Scalars['ID'];
  /** Логотип компании */
  logo?: InputMaybe<Uploader>;
  /** Официальное наименование компании */
  officialName: Scalars['SquishedString'];
  /** ОГРН компании */
  ogrn: Scalars['String'];
  /** ОКТМО или ОКАТО компании */
  oktmo: Scalars['String'];
  /** Номер телефона. Может содержать цифры, плюс, минус, скобки и пробелы */
  phoneNumber: Scalars['PhoneNumber'];
  /** Почтовый индекс компании */
  postcode: Scalars['String'];
  /** Система налогообложения компании */
  taxationSystem?: InputMaybe<CompanyTaxationSystemEnum>;
  /** Неофициальное наименование компании */
  unofficialName: Scalars['SquishedString'];
};

export type CompanyLegalForm = {
  __typename?: 'CompanyLegalForm';
  id: Scalars['ID'];
  name: Scalars['String'];
  shortName: Scalars['String'];
};

export type CompanyLicensePhoto = {
  __typename?: 'CompanyLicensePhoto';
  id: Scalars['ID'];
  imageUrl: Scalars['String'];
};

export type CompanyLicensePhotoInput = {
  /**
   * Информация о файле, загруженном с помощью direct upload, игнорируется если задан `imageRemoteUrl`
   *
   */
  image?: InputMaybe<Uploader>;
  /** Ссылка на загружаемый файл */
  imageRemoteUrl?: InputMaybe<Scalars['String']>;
};

export type CompanyLocation = {
  __typename?: 'CompanyLocation';
  address?: Maybe<Scalars['String']>;
  canBeDestroyed: Scalars['Boolean'];
  canBeUpdated: Scalars['Boolean'];
  canReject: AuthorizationResult;
  city: City;
  comment?: Maybe<Scalars['String']>;
  company: Company;
  companyLicenses: Array<CompanyLocationLicense>;
  id: Scalars['ID'];
  /** Флаг 'основной' */
  main: Scalars['Boolean'];
  /** Номер телефона, без кода страны, нормализованный: 10 цифр */
  phoneNumber?: Maybe<Scalars['String']>;
  /** Почтовый индекс */
  postcode?: Maybe<Scalars['String']>;
  /** Причина отказа в подтверждении адреса компании */
  rejectionReason?: Maybe<Scalars['String']>;
  /** Статус */
  status: CompanyLocationStatusEnum;
  /** Дедлайн проверки */
  verificationDeadlineAt?: Maybe<Scalars['ISO8601DateTime']>;
};

/** The connection type for CompanyLocation. */
export type CompanyLocationConnection = {
  __typename?: 'CompanyLocationConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CompanyLocationEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<CompanyLocation>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CompanyLocationEdge = {
  __typename?: 'CompanyLocationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<CompanyLocation>;
};

export type CompanyLocationInput = {
  /** Адрес компании */
  address: Scalars['String'];
  /** ID города */
  cityId: Scalars['ID'];
  /** Комментарий к адресу */
  comment?: InputMaybe<Scalars['String']>;
  /** Лицензии для адреса */
  companyLicenses?: InputMaybe<Array<CompanyLocationLicenseInput>>;
  /** Номер телефона. Может содержать цифры, плюс, минус, скобки и пробелы */
  phoneNumber: Scalars['PhoneNumber'];
  /** Почтовый индекс адреса */
  postcode: Scalars['String'];
};

export type CompanyLocationLicense = {
  __typename?: 'CompanyLocationLicense';
  /** Фотографии лицензии */
  companyLicensePhotos?: Maybe<Array<CompanyLicensePhoto>>;
  id: Scalars['ID'];
  number: Scalars['String'];
};

export type CompanyLocationLicenseInput = {
  /** Фотографии лицензии */
  companyLicensePhotos?: InputMaybe<Array<CompanyLicensePhotoInput>>;
  /** Флаг 'удалить эту лицензию' */
  destroy?: InputMaybe<Scalars['Boolean']>;
  /**
   * ID лицензии.
   * Если не указан - то будет создана новая лицензия.
   * Если указан - будет сохранена существующая.
   *
   */
  id?: InputMaybe<Scalars['ID']>;
  /** Номер лицензии */
  number: Scalars['String'];
};

export enum CompanyLocationStatusEnum {
  /** непроверенный */
  NotVerified = 'NOT_VERIFIED',
  /** Rejected */
  Rejected = 'REJECTED',
  /** проверенный */
  Verified = 'VERIFIED',
}

/** Участник компании */
export type CompanyMember = {
  __typename?: 'CompanyMember';
  company: Company;
  id: Scalars['ID'];
  role: CompanyRole;
  user: User;
};

export type CompanyMemberInput = {
  /** Список компаний, к которым у сотрудника есть доступ */
  companyIds: Array<Scalars['ID']>;
  /** E-mail сотрудника */
  email: Scalars['String'];
};

export enum CompanyOrderEnum {
  /** по убыванию рейтинга */
  Rating = 'RATING',
}

/** Поле заявки, на которое было запрошено изменение */
export type CompanyRejectedField = {
  __typename?: 'CompanyRejectedField';
  /** Комментарий */
  comment: Scalars['String'];
  /** Название поля */
  name: CompanyFieldEnum;
};

/** Отзыв на компанию-продавца с комментарием и оценкой */
export type CompanyReview = {
  __typename?: 'CompanyReview';
  /** Компания покупатель */
  buyer: Company;
  /** Комментарий к отзыву о компании-продавце */
  companyBody: Scalars['String'];
  /** Оценка компании-продавца по пятибальной шкале */
  companyRating: Scalars['Int'];
  /** Дата создания отзыва */
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  /** Компания продавец */
  seller: Company;
};

/** The connection type for CompanyReview. */
export type CompanyReviewConnection = {
  __typename?: 'CompanyReviewConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CompanyReviewEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<CompanyReview>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CompanyReviewEdge = {
  __typename?: 'CompanyReviewEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<CompanyReview>;
};

export enum CompanyReviewOrderEnum {
  /** Рейтинг компании по возрастанию */
  CompanyRatingAsc = 'COMPANY_RATING_ASC',
  /** Рейтинг компании по убыванию */
  CompanyRatingDesc = 'COMPANY_RATING_DESC',
  /** По дате (с начала) */
  CreatedAtAsc = 'CREATED_AT_ASC',
  /** По дате (с конца) */
  CreatedAtDesc = 'CREATED_AT_DESC',
}

export type CompanyRole = {
  __typename?: 'CompanyRole';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export enum CompanyStatusEnum {
  /** В черном списке */
  Blacklisted = 'BLACKLISTED',
  /** Не проверена */
  NotVerified = 'NOT_VERIFIED',
  /** Проверка отклонена */
  Rejected = 'REJECTED',
  /** Проверена */
  Verified = 'VERIFIED',
}

export enum CompanyTaxationSystemEnum {
  /** Общая система налогообложения */
  Osn = 'OSN',
  /** Упрощенная система налогообложения */
  Usn = 'USN',
}

export enum ConditionEnum {
  New = 'NEW',
  Used = 'USED',
}

export type ConfirmCompanyInput = {
  /** Компания */
  companyId: Scalars['ID'];
};

export type ConfirmOrderPaymentInput = {
  /** Заказ */
  orderId: Scalars['ID'];
};

export type ConfirmProductInput = {
  /** Товар */
  productId: Scalars['ID'];
};

export type ConfirmReservedOrderInput = {
  /** ID Заказа */
  orderId: Scalars['ID'];
};

export type ConfirmReturnedShipmentInput = {
  /** ID формы по отправке товара */
  returnedShipmentId: Scalars['ID'];
};

export type ConfirmationRecord = {
  __typename?: 'ConfirmationRecord';
  attachmentUrl: Scalars['String'];
  id: Scalars['ID'];
  originalFilename?: Maybe<Scalars['String']>;
};

export type Country = {
  __typename?: 'Country';
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** The connection type for Country. */
export type CountryConnection = {
  __typename?: 'CountryConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CountryEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Country>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CountryEdge = {
  __typename?: 'CountryEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Country>;
};

export type CourierDeliveryMethod = {
  __typename?: 'CourierDeliveryMethod';
  /** Доступность доставки курьером */
  available: Scalars['Boolean'];
  /** Максимальная дата доставки */
  endDate?: Maybe<Scalars['ISO8601Date']>;
  /** Ошибка при обращении к api сервиса доставки */
  error?: Maybe<ExternalError>;
  /** Стоимость доставки */
  price?: Maybe<Scalars['Float']>;
  /** Сервис доставки */
  service: CourierServiceEnum;
  /** Минимальная дата доставки */
  startDate?: Maybe<Scalars['ISO8601Date']>;
};

export enum CourierServiceEnum {
  /** Деловые Линии */
  Dellin = 'DELLIN',
  /** СДЭК */
  Sdek = 'SDEK',
  /** Служба доставки продавца */
  Seller = 'SELLER',
}

export type CreateAdminInput = {
  /** E-mail администратора */
  email: Scalars['String'];
  /** Имя администратора */
  firstName: Scalars['SquishedString'];
  /** Фамилия администратора */
  lastName: Scalars['SquishedString'];
  /** Отчество администратора */
  middleName?: InputMaybe<Scalars['SquishedString']>;
  /** Номер телефона. Может содержать цифры, плюс, минус, скобки и пробелы */
  phoneNumber: Scalars['PhoneNumber'];
};

export type CreateCategoryInput = {
  /** Название категории. */
  name: Scalars['SquishedString'];
  /** ID родительской категории. Для создания корневой категории этот параметр не нужен. */
  parentId?: InputMaybe<Scalars['ID']>;
};

export type CreateCompanyLocationsInput = {
  /** ID компании */
  companyId: Scalars['ID'];
  /** Адреса компании */
  companyLocations: Array<CompanyLocationInput>;
};

export type CreateCustomerQuestionInput = {
  /** Вложения к вопросу */
  attachments?: InputMaybe<Array<CustomerQuestionAttachmentInput>>;
  /** ID компании */
  companyId: Scalars['ID'];
  /** Текст вопроса */
  message: Scalars['String'];
};

export type CreateDictionaryPropertyInput = {
  /** Категории, к которым будет привязана создаваемая характеристика */
  categoryIds?: InputMaybe<Array<Scalars['ID']>>;
  /** Значения */
  dictionaryPropertyOptions?: InputMaybe<Array<CreateDictionaryPropertyOptionInput>>;
  /** Отображаемое название (для пользователей) */
  displayName: Scalars['SquishedString'];
  /** Уникальное название (для администраторов) */
  name: Scalars['SquishedString'];
};

export type CreateDictionaryPropertyOptionInput = {
  /** Значение */
  name: Scalars['SquishedString'];
};

export type CreateDisputeInput = {
  /** Загруженные фото и видео */
  attachments?: InputMaybe<Array<DisputeAttachmentInput>>;
  /** Комментарий к спору */
  comment?: InputMaybe<Scalars['SquishedString']>;
  /** Доставлен ли товар */
  productDelivered: Scalars['Boolean'];
  /** Причина спора */
  reason: DisputeReasonEnum;
};

export type CreateDisputeProposalInput = {
  /** Комментарий к предложению */
  comment?: InputMaybe<Scalars['SquishedString']>;
  /** Сумма возврата средств за доставку */
  deliveryReturnAmount?: InputMaybe<Scalars['Float']>;
  /** Сумма возврата средств за товар */
  productReturnAmount: Scalars['Float'];
  /** За чей счет возврат? */
  returnPayer?: InputMaybe<DisputeProposalReturnPayerEnum>;
  /** Кол-во товара для возврата */
  returnQuantity?: InputMaybe<Scalars['Int']>;
  /** Необходим возврат товара */
  returnRequired: Scalars['Boolean'];
};

export type CreateIntegerPropertyInput = {
  /** Категории, к которым будет привязана создаваемая характеристика */
  categoryIds?: InputMaybe<Array<Scalars['ID']>>;
  /** Отображаемое название (для пользователей) */
  displayName: Scalars['SquishedString'];
  /** Уникальное название (для администраторов) */
  name: Scalars['SquishedString'];
  /** Единица измерения или суффикс значения */
  unit?: InputMaybe<Scalars['SquishedString']>;
};

export type CreateProductDraftInput = {
  /** Категория товара, см. query `categories`. Следует указывать наиболее глубоко выбранную категорию */
  categoryId: Scalars['ID'];
  /** ID компании */
  companyId: Scalars['ID'];
  /** Состояние товара */
  condition: ConditionEnum;
  /** Страна-производитель, см. query `countries` */
  countryId: Scalars['ID'];
  /** Описание товара */
  description?: InputMaybe<Scalars['SquishedString']>;
  /** Производитель товара */
  manufacturer: Scalars['SquishedString'];
  /** Название товара */
  name: Scalars['SquishedString'];
};

export type CreateProductFromTemplateInput = {
  /** ID шаблона товара */
  productId: Scalars['ID'];
};

export type CreateReturnedShipmentInput = {
  /** Прикреплённые файлы */
  attachments: Array<ReturnedShipmentAttachmentInput>;
  /** ID спора */
  disputeId: Scalars['ID'];
  /** Максимальная дата доставки */
  endDate: Scalars['ISO8601Date'];
  /** Минимальная дата доставки */
  startDate: Scalars['ISO8601Date'];
};

export type CreateReviewInput = {
  /** Отзыв о компании-продавце */
  companyBody: Scalars['String'];
  /** Оценка компании-продавца по пятибальной шкале */
  companyRating: Scalars['Int'];
  /** Id заказа, к которому оставляется отзыв */
  orderId: Scalars['ID'];
  /** Отзыв о товаре */
  productBody: Scalars['String'];
  /** Оценка товара по пятибальной шкале */
  productRating: Scalars['Int'];
};

export type CreateStringPropertyInput = {
  /** Категории, к которым будет привязана создаваемая характеристика */
  categoryIds?: InputMaybe<Array<Scalars['ID']>>;
  /** Отображаемое название (для пользователей) */
  displayName: Scalars['SquishedString'];
  /** Уникальное название (для администраторов) */
  name: Scalars['SquishedString'];
};

export type CreateWithdrawalInput = {
  /** Компания */
  companyId: Scalars['ID'];
  /** Код из SMS-сообщения */
  smsCode: Scalars['String'];
  /** Размер НДС. Необязателен когда тип НДС 'не облагается' */
  vat?: InputMaybe<Scalars['Int']>;
  /** Тип НДС */
  vatType: TransferVatTypeEnum;
};

/** Текущий пользователь */
export type CurrentUser = {
  __typename?: 'CurrentUser';
  avatarUrl?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  /** Настройка 'Согласен на рассылку от агрегатора' для email */
  emailMailingEnabled: Scalars['Boolean'];
  /** Настройка 'Не присылать уведомления по моим сделкам и спорам' для email */
  emailNotificationsDisabled: Scalars['Boolean'];
  firstName?: Maybe<Scalars['String']>;
  /** Заказы пользователя-гостя */
  guestUserOrders?: Maybe<Array<GuestUserOrder>>;
  /** Индикатор наличия компаний у пользователя */
  hasCompanies: Scalars['Boolean'];
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  mainCompany?: Maybe<Company>;
  /** Добавленные пункты меню */
  menuItems: Array<UserMenuItem>;
  middleName?: Maybe<Scalars['String']>;
  /** Настройка 'Согласен на рассылку от агрегатора' для телефона */
  phoneMailingEnabled: Scalars['Boolean'];
  /** Настройка 'Не присылать уведомления по моим сделкам и спорам' для телефона */
  phoneNotificationsDisabled: Scalars['Boolean'];
  /** Номер телефона, без кода страны, нормализованный: только 10 цифр */
  phoneNumber?: Maybe<Scalars['String']>;
  /** Глобальная роль пользователя: босс/сотрудник */
  role?: Maybe<CompanyRole>;
  /** Роль пользователя в системе: суперадмин/админ/клиент/гость */
  systemRole: SystemRoleEnum;
};

export enum CustomerProductOrderEnum {
  /** сначала приоритетные */
  PriorityDesc = 'PRIORITY_DESC',
}

export type CustomerQuestion = {
  __typename?: 'CustomerQuestion';
  /** Вложения к вопросу */
  attachments?: Maybe<Array<CustomerQuestionAttachment>>;
  company: Company;
  /** ID вопроса */
  id: Scalars['ID'];
  /** Текст вопроса */
  message: Scalars['String'];
  user: User;
};

export type CustomerQuestionAttachment = {
  __typename?: 'CustomerQuestionAttachment';
  attachmentUrl: Scalars['String'];
  id: Scalars['ID'];
  originalFilename?: Maybe<Scalars['String']>;
};

export type CustomerQuestionAttachmentInput = {
  /** Вложение к вопросу */
  attachment: Uploader;
};

export type DadataOrganization = {
  __typename?: 'DadataOrganization';
  address?: Maybe<Scalars['String']>;
  directorFullName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  inn?: Maybe<Scalars['String']>;
  kpp?: Maybe<Scalars['String']>;
  legalFormName?: Maybe<Scalars['String']>;
  legalFormShortName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ogrn?: Maybe<Scalars['String']>;
  oktmo?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  shortName?: Maybe<Scalars['String']>;
};

export type DateRangeFilterInput = {
  /** Дата окончания */
  endDate?: InputMaybe<Scalars['ISO8601Date']>;
  /** Дата начала */
  startDate?: InputMaybe<Scalars['ISO8601Date']>;
};

export type DeliveryCondition = {
  __typename?: 'DeliveryCondition';
  /** Комментарий к параметрам доставки */
  comment?: Maybe<Scalars['String']>;
  /** Класс опасности (номер в справочнике): 1.1, 1.2 и т.д. */
  hazardClass?: Maybe<Scalars['String']>;
  /** ID параметра доставки */
  id: Scalars['ID'];
  /** Страховка груза обязательна */
  insuranceRequired: Scalars['Boolean'];
};

export type DeliveryConditionInput = {
  /** Комментарий к параметрам доставки */
  comment?: InputMaybe<Scalars['String']>;
  /** Класс опасности (номер в справочнике): 1.1, 1.2 и т.д. */
  hazardClass?: InputMaybe<Scalars['String']>;
  /** Обязательна ли страховка груза */
  insuranceRequired: Scalars['Boolean'];
};

export enum DeliveryMethodEnum {
  /** Курьер */
  Courier = 'COURIER',
  /** До терминала */
  DeliveryPoint = 'DELIVERY_POINT',
  /** Самовывоз */
  Pickup = 'PICKUP',
}

export type DeliveryMethods = {
  __typename?: 'DeliveryMethods';
  /** Сервисы доставки курьером до адреса */
  courier: Array<CourierDeliveryMethod>;
  /** Сервисы доставки до терминала */
  deliveryPoint: Array<PointDeliveryMethod>;
  /** Самовывоз */
  pickup: PickupDeliveryMethod;
};

export type DeliveryPoint = {
  __typename?: 'DeliveryPoint';
  address?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  openingHours?: Maybe<Array<OpeningHours>>;
  phones?: Maybe<Array<Scalars['String']>>;
};

export enum DeliveryPointDirectionEnum {
  /** Все */
  All = 'ALL',
  /** Выдача груза */
  Issuing = 'ISSUING',
  /** Прием груза */
  Taking = 'TAKING',
}

export enum DeliveryServiceEnum {
  /** Деловые Линии */
  Dellin = 'DELLIN',
  /** СДЭК */
  Sdek = 'SDEK',
  /** Служба доставки продавца */
  Seller = 'SELLER',
}

export type DellinFreightKind = {
  __typename?: 'DellinFreightKind';
  /** Флаг 'действующий' */
  active: Scalars['Boolean'];
  id: Scalars['ID'];
  /** Название */
  name: Scalars['String'];
};

/** The connection type for DellinFreightKind. */
export type DellinFreightKindConnection = {
  __typename?: 'DellinFreightKindConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<DellinFreightKindEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<DellinFreightKind>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type DellinFreightKindEdge = {
  __typename?: 'DellinFreightKindEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<DellinFreightKind>;
};

/** Результат удаления своего аккаунта */
export type DestroyAccountPayload = {
  __typename?: 'DestroyAccountPayload';
  message: Scalars['String'];
  /** Удаленный пользователь */
  user: CurrentUser;
};

export type DestroyAdminInput = {
  /** ID удаляемого пользователя */
  userId: Scalars['ID'];
};

export type DestroyCategoryInput = {
  /** ID удаляемой категории */
  categoryId: Scalars['ID'];
};

/** Результат удаления категории */
export type DestroyCategoryPayload = {
  __typename?: 'DestroyCategoryPayload';
  /** Удаленная категория */
  category: Category;
  message: Scalars['String'];
};

export type DestroyCompanyInput = {
  /** ID компании */
  companyId: Scalars['ID'];
};

export type DestroyCompanyLocationInput = {
  /** Идентификатор адреса компании, который нужно удалить */
  companyLocationId: Scalars['ID'];
};

export type DestroyCompanyMemberInput = {
  /** Список компаний, к которым нужно забрать доступ сотрудника */
  companyIds: Array<Scalars['ID']>;
  /** ID сотрудника */
  userId: Scalars['ID'];
};

export type DestroyCustomerCompanyLocationInput = {
  /** Идентификатор адреса компании, который нужно удалить */
  companyLocationId: Scalars['ID'];
};

export type DestroyOrderInput = {
  /** ID заказа */
  orderId: Scalars['ID'];
};

export type DestroyProductInput = {
  /** ID товара */
  productId: Scalars['ID'];
};

export type DestroyPropertyInput = {
  /** ID характеристики */
  propertyId: Scalars['ID'];
};

export type DetailedMessage = {
  __typename?: 'DetailedMessage';
  detail: Scalars['String'];
  message: Scalars['String'];
};

/** Справочная характеристика */
export type DictionaryProperty = PropertyInterface & {
  __typename?: 'DictionaryProperty';
  canDestroy: AuthorizationResult;
  /** Полное дерево категории */
  categoryPath: Array<Category>;
  /** Отображаемое название (для пользователей) */
  displayName: Scalars['String'];
  /** ID характеристики */
  id: Scalars['ID'];
  /** Уникальное название (для администраторов) */
  name: Scalars['String'];
};

export type DictionaryPropertyFilterInput = {
  /** ID вариантов */
  dictionaryPropertyOptionIds: Array<Scalars['ID']>;
  /** ID характеристики */
  propertyId: Scalars['ID'];
};

export type DictionaryPropertyOption = {
  __typename?: 'DictionaryPropertyOption';
  canDestroy: AuthorizationResult;
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** Значение справочной характеристики варианта товара */
export type DictionaryVariantProperty = VariantPropertyInterface & {
  __typename?: 'DictionaryVariantProperty';
  /** Значение */
  dictionaryPropertyOption: DictionaryPropertyOption;
  id: Scalars['ID'];
  /** Характеристика товара */
  property: PropertyInterface;
};

export enum DiscountMethodEnum {
  /** Наибольшая скидка */
  Max = 'MAX',
  /** Суммировать скидки */
  Sum = 'SUM',
}

export type Dispute = {
  __typename?: 'Dispute';
  /** Принятое предложение */
  acceptedProposal?: Maybe<DisputeProposal>;
  /** Загруженные фото и видео */
  attachments: Array<DisputeAttachment>;
  canAcceptProposal: AuthorizationResult;
  canCancel: AuthorizationResult;
  canCreateProposal: AuthorizationResult;
  canCreateReturnedShipment: AuthorizationResult;
  canReceiveReturnedShipment: AuthorizationResult;
  canRequestSupport: AuthorizationResult;
  canViewProposals: AuthorizationResult;
  /** Комментарий */
  comment?: Maybe<Scalars['String']>;
  /** Дата создания */
  createdAt: Scalars['ISO8601DateTime'];
  /** ID спора */
  id: Scalars['ID'];
  /** Дедлайн для первичного ответа продавца */
  initialResponseDeadlineAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** Последнее предложение покупателя */
  lastBuyerProposal?: Maybe<DisputeProposal>;
  /** Последнее предложение продавца */
  lastSellerProposal?: Maybe<DisputeProposal>;
  /** Предложение медагрегатора */
  medagregatorProposal?: Maybe<DisputeProposal>;
  /** Дедлайн для ответа Медагрегатора */
  medagregatorResponseDeadlineAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** Товар доставлен? */
  productDelivered: Scalars['Boolean'];
  /** Причина */
  reason: DisputeReasonEnum;
  /** Дедлайн отправки товара */
  returnShipmentDeadlineAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** Форма подтверждения отправки товара */
  returnedShipment?: Maybe<ReturnedShipment>;
  /** Статус */
  status: DisputeStatusEnum;
};

export type DisputeAttachment = {
  __typename?: 'DisputeAttachment';
  attachmentUrl: Scalars['String'];
  id: Scalars['ID'];
  originalFilename?: Maybe<Scalars['String']>;
};

export type DisputeAttachmentInput = {
  /** Вложение к спору */
  attachment: Uploader;
};

export type DisputeProposal = {
  __typename?: 'DisputeProposal';
  /** Комментарий к предложению */
  comment?: Maybe<Scalars['String']>;
  /** Дата создания */
  createdAt: Scalars['ISO8601DateTime'];
  /** Сумма возврата средств за доставку */
  deliveryReturnAmount?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  /** Автор решения */
  originator: DisputeProposalOriginatorEnum;
  /** Сумма возврата средств за товар */
  productReturnAmount: Scalars['Float'];
  /** За чей счет возврат? */
  returnPayer?: Maybe<DisputeProposalReturnPayerEnum>;
  /** Кол-во товара для возврата */
  returnQuantity?: Maybe<Scalars['Int']>;
  /** Необходим ли возврат товара? */
  returnRequired: Scalars['Boolean'];
  /** Статус */
  status: DisputeProposalStatusEnum;
  /** Единица товара (шт/уп) */
  unitKind: Scalars['String'];
};

/** The connection type for DisputeProposal. */
export type DisputeProposalConnection = {
  __typename?: 'DisputeProposalConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<DisputeProposalEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<DisputeProposal>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type DisputeProposalEdge = {
  __typename?: 'DisputeProposalEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<DisputeProposal>;
};

export enum DisputeProposalOriginatorEnum {
  /** Решение предложено покупателем */
  Buyer = 'BUYER',
  /** Решение предложено Medagregator */
  Medagregator = 'MEDAGREGATOR',
  /** Решение предложено продавцом */
  Seller = 'SELLER',
}

export enum DisputeProposalReturnPayerEnum {
  /** Возврат за счет покупателя */
  Buyer = 'BUYER',
  /** Возврат за счет продавца */
  Seller = 'SELLER',
}

export enum DisputeProposalStatusEnum {
  /** Принято */
  Accepted = 'ACCEPTED',
  /** Отклонено */
  Declined = 'DECLINED',
  /** В ожидании */
  Pending = 'PENDING',
}

export enum DisputeReasonEnum {
  /** Проблема с комплектующими */
  ComponentProblem = 'COMPONENT_PROBLEM',
  /** Транспортная компания вернула заказ */
  DeliveryServiceReturn = 'DELIVERY_SERVICE_RETURN',
  /** Подделка */
  Fake = 'FAKE',
  /** Несоответствие количества */
  IncorrectQuantity = 'INCORRECT_QUANTITY',
  /** Заказ отправлен на неверный адрес */
  InvalidAddress = 'INVALID_ADDRESS',
  /** Товар не доставлен в указанный срок */
  NotDeliveredOnTime = 'NOT_DELIVERED_ON_TIME',
  /** Товар не соответствует описанию */
  NotMeetDescription = 'NOT_MEET_DESCRIPTION',
  /** Нет информации об отслеживании */
  NoTrackingInfo = 'NO_TRACKING_INFO',
  /** Проблема с качеством */
  PoorQuality = 'POOR_QUALITY',
  /** Товар поврежден */
  ProductDamaged = 'PRODUCT_DAMAGED',
}

export enum DisputeStatusEnum {
  /** Спор отменен */
  Canceled = 'CANCELED',
  /** Переговоры по спору */
  Discussing = 'DISCUSSING',
  /** Спор закрыт */
  Finished = 'FINISHED',
  /** Вмешался Medagregator */
  MedagregatorIntervened = 'MEDAGREGATOR_INTERVENED',
  /** Принято решение */
  ProposalAccepted = 'PROPOSAL_ACCEPTED',
}

export type ExternalError = {
  __typename?: 'ExternalError';
  details?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type FailureReasons = {
  __typename?: 'FailureReasons';
  /** JSON-encoded map of reasons */
  details: Scalars['String'];
  /** Human-readable errors */
  fullMessages: Array<Scalars['String']>;
};

export type FinishOrderDeliveryInput = {
  /** Заказ */
  orderId: Scalars['ID'];
};

export type GuestUserOrder = {
  __typename?: 'GuestUserOrder';
  /** Адрес доставки, только для способов доставки 'до терминала' */
  city: City;
  id: Scalars['ID'];
  /** Заказ */
  order: Order;
  /** Пользователь-покупатель */
  user: User;
};

/** Целочисленная характеристика */
export type IntegerProperty = PropertyInterface & {
  __typename?: 'IntegerProperty';
  canDestroy: AuthorizationResult;
  /** Полное дерево категории */
  categoryPath: Array<Category>;
  /** Отображаемое название (для пользователей) */
  displayName: Scalars['String'];
  /** ID характеристики */
  id: Scalars['ID'];
  /** Уникальное название (для администраторов) */
  name: Scalars['String'];
  /** Единица измерения или суффикс значения */
  unit?: Maybe<Scalars['String']>;
};

export type IntegerPropertyFilterInput = {
  /** Максимальное значение */
  max?: InputMaybe<Scalars['Int']>;
  /** Минимальное значение */
  min?: InputMaybe<Scalars['Int']>;
  /** ID характеристики */
  propertyId: Scalars['ID'];
};

/** Значение целочисленной характеристики варианта товара */
export type IntegerVariantProperty = VariantPropertyInterface & {
  __typename?: 'IntegerVariantProperty';
  id: Scalars['ID'];
  /** Значение */
  integerValue: Scalars['Int'];
  /** Характеристика товара */
  property: PropertyInterface;
};

export type JoinUserInput = {
  /** Имя пользователя */
  firstName: Scalars['SquishedString'];
  /** Фамилия пользователя */
  lastName: Scalars['SquishedString'];
  /** Отчество пользователя */
  middleName?: InputMaybe<Scalars['SquishedString']>;
  /** Номер телефона. Может содержать цифры, плюс, минус, скобки и пробелы */
  phoneNumber: Scalars['PhoneNumber'];
  /** Код из SMS-сообщения */
  smsCode: Scalars['String'];
};

export type Manufacturer = {
  __typename?: 'Manufacturer';
  name: Scalars['String'];
};

/** The connection type for Manufacturer. */
export type ManufacturerConnection = {
  __typename?: 'ManufacturerConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ManufacturerEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Manufacturer>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ManufacturerEdge = {
  __typename?: 'ManufacturerEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Manufacturer>;
};

export type MarkCompanyAsMainInput = {
  /** ID компании */
  companyId: Scalars['ID'];
};

export type MarkCompanyLocationAsMainInput = {
  /** ID адреса компании */
  companyLocationId: Scalars['ID'];
};

export type MenuItemInput = {
  /** Тип пункта меню */
  itemType: UserMenuItemTypeEnum;
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Подтверждение адреса компании.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  acceptCompanyLocation?: Maybe<CompanyLocation>;
  /**
   * Подтверждение перевода средств.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  acceptTransfer?: Maybe<Transfer>;
  /**
   * Добавление компании в черный список.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  addCompanyToBlacklist?: Maybe<Company>;
  /**
   * Добавление товара в корзину.
   * Добавить может любой участник компании.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  addProductToCart?: Maybe<Order>;
  /**
   * Добавление товара в избранное.
   * Добавить в избранное может пользователь у которого основная компания - покупатель.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  addProductToFavorites?: Maybe<Product>;
  /**
   * Добавление товара в корзину гостя.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  addProductToGuestCart?: Maybe<Order>;
  /**
   * Добавление товара в список приоритетных.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  addProductToPriorityList?: Maybe<AddProductToPriorityListPayload>;
  /** Идентификация неавторизованного пользователя */
  authenticateGuestUser?: Maybe<Authentication>;
  /**
   * Блокирование компании.
   *
   * Доступно только для админов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  banCompany?: Maybe<Message>;
  /**
   * Блокирование аккаунта пользователя.
   *
   * Доступно только для админов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  blockUser?: Maybe<User>;
  /**
   * Отмена спора по заказу.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  cancelDispute?: Maybe<Dispute>;
  /**
   * Отмена зарезервированного заказа.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  cancelReservedOrder?: Maybe<Order>;
  /**
   * Подтверждение компании.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  confirmCompany?: Maybe<Company>;
  /**
   * Подтверждение оплаты заказа.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  confirmOrderPayment?: Maybe<Order>;
  /**
   * Подтверждение товара.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  confirmProduct?: Maybe<Product>;
  /**
   * Подтверждение зарезервированного заказа.
   * Подтвердить может пользователь, создавший заказ, или администратор.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  confirmReservedOrder?: Maybe<Order>;
  /**
   * Принятие отправки товара администратором.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  confirmReturnedShipment?: Maybe<ReturnedShipment>;
  /**
   * Добавление админа.
   *
   * Доступно только для суперадминов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  createAdmin?: Maybe<User>;
  /**
   * Создание категории.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  createCategory?: Maybe<Category>;
  /** Создание компании пользователем. Заголовок с токеном авторизации пользователя обязателен. */
  createCompany?: Maybe<Company>;
  /**
   * Создание адресов компании.
   * Создать может любой участник компании.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  createCompanyLocations?: Maybe<Array<CompanyLocation>>;
  /**
   * Создание (приглашение) сотрудника компании (или компаний) по email, с одновременным созданием пользователя.
   * Создать может только владелец компании.
   * Заголовок с токеном авторизации пользователя обязателен.
   * Пригласить существующего пользователя невозможно.
   *
   */
  createCompanyMember?: Maybe<User>;
  /**
   * Вопрос компании-продавцу от пользователя.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  createCustomerQuestion?: Maybe<CustomerQuestion>;
  /**
   * Добавление справочной характеристики.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  createDictionaryProperty?: Maybe<DictionaryProperty>;
  /**
   * Создание своего предложения по спору.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  createDisputeProposal?: Maybe<DisputeProposal>;
  /**
   * Добавление целочисленной характеристики.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  createIntegerProperty?: Maybe<IntegerProperty>;
  /**
   * Создание черновика товара.
   * Создать может любой участник компании.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  createProductDraft?: Maybe<Product>;
  /**
   * Создание черновика товара из шаблона.
   * Создать может любой участник компании.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  createProductFromTemplate?: Maybe<Product>;
  /**
   * Создание шаблона товара.
   * Создать может любой участник компании.
   * Заголовок с токеном авторизации пользователя обязателен.
   * Невозможно сохранить шаблон в случаях:
   * - если указанный товар не является черновиком или шаблоном
   * - если предыдущие шаги создания товара не были завершены
   *
   */
  createProductTemplate?: Maybe<Product>;
  /**
   * Создание обращения в службу поддержки незарегистрированным пользователем.
   *
   */
  createPublicSupportRequest?: Maybe<SupportRequest>;
  /**
   * Подтверждение отправки товара покупателем.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  createReturnedShipment?: Maybe<ReturnedShipment>;
  /**
   * Создание отзыва. Создать может любой участник компании
   * На один заказ отзыв можно оставить только один раз
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  createReview?: Maybe<Order>;
  /**
   * Добавление строковой характеристики.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  createStringProperty?: Maybe<StringProperty>;
  /**
   * Создание обращения в службу поддержки зарегистрированным пользователем.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  createSupportRequest?: Maybe<SupportRequest>;
  /**
   * Создание вывода средств со счета.
   * Добавить может только владелец компании.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  createWithdrawal?: Maybe<Transfer>;
  /** Удаление своего аккаунта из приложения. Заголовок с токеном авторизации пользователя обязателен. */
  destroyAccount?: Maybe<DestroyAccountPayload>;
  /**
   * Удаление аккаунта админа.
   *
   * Доступно только для суперадминов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  destroyAdmin?: Maybe<Message>;
  /**
   * Удаление категории.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  destroyCategory?: Maybe<DestroyCategoryPayload>;
  /**
   * Удаление компании пользователем.
   * Удалить может только владелец этой компании.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   * Физически запись не удаляется,
   * а лишь помечается как "удаленная" и впоследствии не отображается в интерфейсе пользователя.
   *
   */
  destroyCompany?: Maybe<Message>;
  /**
   * Удаление адреса компании.
   * Удалить может любой участник компании.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  destroyCompanyLocation?: Maybe<CompanyLocation>;
  /**
   * Удаление сотрудника из компаний.
   * Удалить может только владелец компаний.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  destroyCompanyMember?: Maybe<User>;
  /**
   * Удаление адреса компании.
   * Удалить может только администратор.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  destroyCustomerCompanyLocation?: Maybe<CompanyLocation>;
  /**
   * Удаление товара администратором.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  destroyCustomerProduct?: Maybe<Product>;
  /**
   * Удаление заказа.
   *
   * Удалить может любой участник компании-покупателя или гость только пока заказ находится в корзине.
   * Удалить может администратор, если заказ уже оформлен и находится в статусе 'не оплачен'(`PAYMENT_PENDING`).
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  destroyOrder?: Maybe<Message>;
  /**
   * Удаление товара пользователем.
   * Черновики и шаблоны удаляются перманентно. Любой другой товар физически не удаляется, а помечается как "удаленный".
   * Удалить может любой участник компании.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  destroyProduct?: Maybe<Message>;
  /**
   * Удаление характеристики.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  destroyProperty?: Maybe<Message>;
  /**
   * Подтверждение доставки заказа сотрудником компании-покупателя.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  finishOrderDelivery?: Maybe<Order>;
  /**
   * Ввод своих данных приглашенным пользователем.
   * Может применяться только для пользователей которые входят впервые.
   * Пользователем, входящим впервые, считается пользователь с незаполненным номером телефона.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  joinUser?: Maybe<CurrentUser>;
  /**
   * Пометка компании как "основной" для текущего пользователя.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  markCompanyAsMain?: Maybe<Company>;
  /**
   * Пометка адреса компании как "основного".
   * Пометить можно только проверенный адрес
   * Пометить может любой участник компании.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  markCompanyLocationAsMain?: Maybe<CompanyLocation>;
  /**
   * Открытие спора по заказу.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  openDispute?: Maybe<Dispute>;
  /**
   * Оформление заказа.
   * Оформить может любой участник компании.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   * Особые коды ошибок:
   * - `product_out_of_stock` - недостаточно товара у продавца, заказ удален,
   *    в таком случае `extra.remainingQuantity` ошибки содержит остаток товара
   *
   */
  placeOrder?: Maybe<Order>;
  /** Генерация данных для загрузки файла */
  presignData?: Maybe<Presign>;
  /**
   * Подтверждение получения возвращённого товара.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  receiveReturnedShipment?: Maybe<Dispute>;
  /**
   * Запросить изменения в заявке компании.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  rejectCompany?: Maybe<Company>;
  /**
   * Запросить изменения в адресе компании.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  rejectCompanyLocation?: Maybe<CompanyLocation>;
  /**
   * Отклонение товара.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  rejectProduct?: Maybe<Product>;
  /**
   * Отклонение отправки товара администратором.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  rejectReturnedShipment?: Maybe<ReturnedShipment>;
  /**
   * Удаление компании из черного списка.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  removeCompanyFromBlacklist?: Maybe<Company>;
  /**
   * Удаление товара из избранного.
   * Удалить товар из избранного может пользователь у которого основная компания - покупатель.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  removeProductFromFavorites?: Maybe<Product>;
  /**
   * Удаление товара из списка приоритетных.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  removeProductFromPriorityList?: Maybe<RemoveProductFromPriorityListPayload>;
  /**
   * Обновление товара со статусом "нет в наличии".
   * Восстановленный товар становится непроверенным черновиком (шаг заполнения -- последний)
   *
   * Восстановить может любой участник компании. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  renewProduct?: Maybe<Product>;
  /**
   * Запрос помощи Медагрегатора по спору. Запросить может покупатель или продавец.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  requestDisputeSupport?: Maybe<RequestDisputeSupportPayload>;
  /**
   * Восстановление пароля по email.
   * На email отправляется письмо с ссылкой, содержащей токен для смены пароля с помощью мутации `updatePassword`
   *
   */
  requestPasswordRecovery?: Maybe<DetailedMessage>;
  /**
   * Резервирование заказа.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  reserveOrder?: Maybe<ReserveOrderPayload>;
  /**
   * Принятие решения по спору.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  resolveDispute?: Maybe<DisputeProposal>;
  /**
   * Восстановление товара администратором.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  restoreCustomerProduct?: Maybe<Product>;
  /**
   * Восстановление товара, который был "удален" пользователем.
   * Восстановленный товар становится непроверенным черновиком (шаг заполнения -- последний)
   * Восстановить может любой участник компании
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  restoreProduct?: Maybe<Product>;
  /**
   * Отравка SMS-сообщения с кодом на указанный номер телефона.
   * Повторная отправка на тот же номер доступна через 60 секунд.
   * Отправленный код может быть использован в течение 600 секунд.
   *
   */
  sendSmsCode?: Maybe<SmsCode>;
  /** Вход пользователя в приложение */
  signIn?: Maybe<Authentication>;
  /** Регистрация пользователя */
  signUp?: Maybe<Authentication>;
  /**
   * Регистрация гостя через корзину.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  signUpFromCart?: Maybe<SignUpFromCartPayload>;
  /** Выход пользователя из приложения. Заголовок с токеном авторизации пользователя обязателен. */
  signout?: Maybe<Message>;
  /**
   * Завершение шага 3 создания товара: "Адрес и параметры упаковки".
   * Завершить может любой участник компании.
   * Заголовок с токеном авторизации пользователя обязателен.
   * Невозможно завершить шаг в случаях:
   * - если указанный товар не является черновиком или шаблоном
   * - если предыдущие шаги создания товара не были завершены
   *
   */
  submitProductAddressStep?: Maybe<Product>;
  /**
   * Завершение шага 1 создания товара: "Основная информация" -- используется для обновления существующего товара.
   * Завершить может любой участник компании.
   * Заголовок с токеном авторизации пользователя обязателен.
   * Невозможно завершить шаг, если указанный товар не является черновиком или шаблоном.
   *
   */
  submitProductBasicStep?: Maybe<Product>;
  /**
   * Завершение шага 4 создания товара: "Параметры для службы доставки".
   * Завершить может любой участник компании.
   * Заголовок с токеном авторизации пользователя обязателен.
   * Невозможно завершить шаг в случаях:
   * - если указанный товар не является черновиком или шаблоном
   * - если предыдущие шаги создания товара не были завершены
   *
   */
  submitProductDeliveryConditionsStep?: Maybe<Product>;
  /**
   * Завершение шага 5 создания товара: "Своя доставка".
   * Завершить может любой участник компании.
   * Заголовок с токеном авторизации пользователя обязателен.
   * Невозможно завершить шаг в случаях:
   * - если указанный товар не является черновиком или шаблоном
   * - если предыдущие шаги создания товара не были завершены
   *
   */
  submitProductDeliveryStep?: Maybe<Product>;
  /**
   * Завершение шага 7 создания товара: "Параметры скидки".
   * Завершить может любой участник компании.
   * Заголовок с токеном авторизации пользователя обязателен.
   * Невозможно завершить шаг в случаях:
   * - если указанный товар не является черновиком или шаблоном
   * - если предыдущие шаги создания товара не были завершены
   *
   * После успешного завершения шага товар перестает быть черновиком.
   *
   */
  submitProductDiscountsStep?: Maybe<Product>;
  /**
   * Завершение шага 6 создания товара: "Цены".
   * Завершить может любой участник компании.
   * Заголовок с токеном авторизации пользователя обязателен.
   * Невозможно завершить шаг в случаях:
   * - если указанный товар не является черновиком или шаблоном
   * - если предыдущие шаги создания товара не были завершены
   *
   */
  submitProductPricesStep?: Maybe<Product>;
  /**
   * Завершение шага 2 создания товара: "Параметры товара".
   * Завершить может любой участник компании.
   * Заголовок с токеном авторизации пользователя обязателен.
   * Невозможно завершить шаг в случаях:
   * - если указанный товар не является черновиком или шаблоном
   * - если предыдущие шаги создания товара не были завершены
   *
   */
  submitProductPropertiesStep?: Maybe<Product>;
  /**
   * Разблокирование компании.
   *
   * Доступно только для админов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  unbanCompany?: Maybe<Company>;
  /**
   * Разблокирование аккаунта пользователя.
   *
   * Доступно только для админов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  unblockUser?: Maybe<User>;
  /** Изменение данных профиля админа. Заголовок с токеном авторизации пользователя обязателен. */
  updateAdminAccount?: Maybe<CurrentUser>;
  /**
   * Обновление категории.
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  updateCategory?: Maybe<Category>;
  /**
   * Изменение данных компании пользователем.
   * Изменить данные может только владелец этой компании.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  updateCompany?: Maybe<Company>;
  /**
   * Изменение адреса компании.
   * Изменить может любой участник компании.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  updateCompanyLocation?: Maybe<CompanyLocation>;
  /**
   * Изменение логотипа компании пользователем.
   * Изменить может только владелец этой компании.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  updateCompanyLogo?: Maybe<Company>;
  /**
   * Изменение списка компаний к которому у сотрудника есть доступ.
   * Изменить может только владелец компаний.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  updateCompanyMember?: Maybe<User>;
  /**
   * Изменение текста отзыва о компании администратором.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  updateCustomerCompanyReview?: Maybe<CompanyReview>;
  /**
   * Изменение текста отзыва о товаре администратором.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  updateCustomerProductReview?: Maybe<ProductReview>;
  /**
   * Изменение справочной характеристики.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  updateDictionaryProperty?: Maybe<DictionaryProperty>;
  /**
   * Изменение целочисленной характеристики.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  updateIntegerProperty?: Maybe<IntegerProperty>;
  /**
   * Изменение способа доставки заказа.
   * Изменить может гость или любой участник компании.
   * Изменить возможно только у заказов в корзине.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  updateOrderDelivery?: Maybe<Order>;
  /**
   * Изменение количества товара в заказе.
   * Изменить может гость или любой участник компании.
   * Изменить возможно только у заказов в корзине.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  updateOrderQuantity?: Maybe<Order>;
  updatePassword?: Maybe<Authentication>;
  /**
   * Обновление данных о компании в отклоненной заявке.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  updateRejectedCompany?: Maybe<Company>;
  /**
   * Редактирование формы отправки товара после отклонения администратором.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  updateReturnedShipment?: Maybe<ReturnedShipment>;
  /**
   * Изменение строковой характеристики.
   *
   * Доступно только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  updateStringProperty?: Maybe<StringProperty>;
  /** Обновление токенов авторизации пользователя. Заголовок с refresh-токеном пользователя обязателен. */
  updateToken?: Maybe<Authentication>;
  /** Изменение своих ФИО. Заголовок с токеном авторизации пользователя обязателен. */
  updateUser?: Maybe<CurrentUser>;
  /** Изменение своего аватара. Заголовок с токеном авторизации пользователя обязателен. */
  updateUserAvatar?: Maybe<CurrentUser>;
  /** Изменение своего email. Заголовок с токеном авторизации пользователя обязателен. */
  updateUserEmail?: Maybe<CurrentUser>;
  /**
   * Заменяет настраиваемые пункты меню текущего пользователя.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  updateUserMenuItems?: Maybe<CurrentUser>;
  /**
   * Изменение своего пароля.
   * При успехе генерирует новые токены авторизации.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  updateUserPassword?: Maybe<Authentication>;
  /** Изменение своего номера телефона. Заголовок с токеном авторизации пользователя обязателен. */
  updateUserPhone?: Maybe<CurrentUser>;
};

export type MutationAcceptCompanyLocationArgs = {
  input: AcceptCompanyLocationInput;
};

export type MutationAcceptTransferArgs = {
  input: AcceptTransferInput;
};

export type MutationAddCompanyToBlacklistArgs = {
  input: AddCompanyToBlacklistInput;
};

export type MutationAddProductToCartArgs = {
  input: AddProductToCartInput;
};

export type MutationAddProductToFavoritesArgs = {
  input: AddProductToFavoritesInput;
};

export type MutationAddProductToGuestCartArgs = {
  input: AddProductToGuestCartInput;
};

export type MutationAddProductToPriorityListArgs = {
  input: AddProductToPriorityListInput;
};

export type MutationBanCompanyArgs = {
  input: BanCompanyInput;
};

export type MutationBlockUserArgs = {
  input: BlockUserInput;
};

export type MutationCancelDisputeArgs = {
  input: CancelDisputeInput;
};

export type MutationCancelReservedOrderArgs = {
  input: CancelReservedOrderInput;
};

export type MutationConfirmCompanyArgs = {
  input: ConfirmCompanyInput;
};

export type MutationConfirmOrderPaymentArgs = {
  input: ConfirmOrderPaymentInput;
};

export type MutationConfirmProductArgs = {
  input: ConfirmProductInput;
};

export type MutationConfirmReservedOrderArgs = {
  input: ConfirmReservedOrderInput;
};

export type MutationConfirmReturnedShipmentArgs = {
  input: ConfirmReturnedShipmentInput;
};

export type MutationCreateAdminArgs = {
  input: CreateAdminInput;
};

export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};

export type MutationCreateCompanyArgs = {
  input: CompanyInput;
};

export type MutationCreateCompanyLocationsArgs = {
  input: CreateCompanyLocationsInput;
};

export type MutationCreateCompanyMemberArgs = {
  input: CompanyMemberInput;
};

export type MutationCreateCustomerQuestionArgs = {
  input: CreateCustomerQuestionInput;
};

export type MutationCreateDictionaryPropertyArgs = {
  input: CreateDictionaryPropertyInput;
};

export type MutationCreateDisputeProposalArgs = {
  input: NewDisputeProposalInput;
};

export type MutationCreateIntegerPropertyArgs = {
  input: CreateIntegerPropertyInput;
};

export type MutationCreateProductDraftArgs = {
  input: CreateProductDraftInput;
};

export type MutationCreateProductFromTemplateArgs = {
  input: CreateProductFromTemplateInput;
};

export type MutationCreateProductTemplateArgs = {
  input: SubmitProductDiscountsStepInput;
};

export type MutationCreatePublicSupportRequestArgs = {
  input: PublicSupportRequestInput;
};

export type MutationCreateReturnedShipmentArgs = {
  input: CreateReturnedShipmentInput;
};

export type MutationCreateReviewArgs = {
  input: CreateReviewInput;
};

export type MutationCreateStringPropertyArgs = {
  input: CreateStringPropertyInput;
};

export type MutationCreateSupportRequestArgs = {
  input: SupportRequestInput;
};

export type MutationCreateWithdrawalArgs = {
  input: CreateWithdrawalInput;
};

export type MutationDestroyAdminArgs = {
  input: DestroyAdminInput;
};

export type MutationDestroyCategoryArgs = {
  input: DestroyCategoryInput;
};

export type MutationDestroyCompanyArgs = {
  input: DestroyCompanyInput;
};

export type MutationDestroyCompanyLocationArgs = {
  input: DestroyCompanyLocationInput;
};

export type MutationDestroyCompanyMemberArgs = {
  input: DestroyCompanyMemberInput;
};

export type MutationDestroyCustomerCompanyLocationArgs = {
  input: DestroyCustomerCompanyLocationInput;
};

export type MutationDestroyCustomerProductArgs = {
  input: DestroyProductInput;
};

export type MutationDestroyOrderArgs = {
  input: DestroyOrderInput;
};

export type MutationDestroyProductArgs = {
  input: DestroyProductInput;
};

export type MutationDestroyPropertyArgs = {
  input: DestroyPropertyInput;
};

export type MutationFinishOrderDeliveryArgs = {
  input: FinishOrderDeliveryInput;
};

export type MutationJoinUserArgs = {
  input: JoinUserInput;
};

export type MutationMarkCompanyAsMainArgs = {
  input: MarkCompanyAsMainInput;
};

export type MutationMarkCompanyLocationAsMainArgs = {
  input: MarkCompanyLocationAsMainInput;
};

export type MutationOpenDisputeArgs = {
  input: OpenDisputeInput;
};

export type MutationPlaceOrderArgs = {
  input: PlaceOrderInput;
};

export type MutationPresignDataArgs = {
  input: PresignDataInput;
};

export type MutationReceiveReturnedShipmentArgs = {
  input: ReceiveReturnedShipmentInput;
};

export type MutationRejectCompanyArgs = {
  input: RejectCompanyInput;
};

export type MutationRejectCompanyLocationArgs = {
  input: RejectCompanyLocationInput;
};

export type MutationRejectProductArgs = {
  input: RejectProductInput;
};

export type MutationRejectReturnedShipmentArgs = {
  input: RejectReturnedShipmentInput;
};

export type MutationRemoveCompanyFromBlacklistArgs = {
  input: RemoveCompanyFromBlacklistInput;
};

export type MutationRemoveProductFromFavoritesArgs = {
  input: RemoveProductFromFavoritesInput;
};

export type MutationRemoveProductFromPriorityListArgs = {
  input: RemoveProductFromPriorityListInput;
};

export type MutationRenewProductArgs = {
  input: RenewProductInput;
};

export type MutationRequestDisputeSupportArgs = {
  input: RequestDisputeSupportInput;
};

export type MutationRequestPasswordRecoveryArgs = {
  input: RequestPasswordRecoveryInput;
};

export type MutationReserveOrderArgs = {
  input: ReserveOrderInput;
};

export type MutationResolveDisputeArgs = {
  input: ResolveDisputeInput;
};

export type MutationRestoreCustomerProductArgs = {
  input: RestoreProductInput;
};

export type MutationRestoreProductArgs = {
  input: RestoreProductInput;
};

export type MutationSendSmsCodeArgs = {
  input: SendSmsInput;
};

export type MutationSignInArgs = {
  input: SignInInput;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationSignUpFromCartArgs = {
  input: SignUpInput;
};

export type MutationSignoutArgs = {
  input: SignOutInput;
};

export type MutationSubmitProductAddressStepArgs = {
  input: SubmitProductAddressStepInput;
};

export type MutationSubmitProductBasicStepArgs = {
  input: SubmitProductBasicStepInput;
};

export type MutationSubmitProductDeliveryConditionsStepArgs = {
  input: SubmitProductDeliveryConditionsStepInput;
};

export type MutationSubmitProductDeliveryStepArgs = {
  input: SubmitProductDeliveryStepInput;
};

export type MutationSubmitProductDiscountsStepArgs = {
  input: SubmitProductDiscountsStepInput;
};

export type MutationSubmitProductPricesStepArgs = {
  input: SubmitProductPricesStepInput;
};

export type MutationSubmitProductPropertiesStepArgs = {
  input: SubmitProductPropertiesStepInput;
};

export type MutationUnbanCompanyArgs = {
  input: UnbanCompanyInput;
};

export type MutationUnblockUserArgs = {
  input: UnblockUserInput;
};

export type MutationUpdateAdminAccountArgs = {
  input: UpdateAdminAccountInput;
};

export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};

export type MutationUpdateCompanyArgs = {
  input: UpdateCompanyInput;
};

export type MutationUpdateCompanyLocationArgs = {
  input: UpdateCompanyLocationInput;
};

export type MutationUpdateCompanyLogoArgs = {
  input: UpdateCompanyLogoInput;
};

export type MutationUpdateCompanyMemberArgs = {
  input: UpdateCompanyMemberInput;
};

export type MutationUpdateCustomerCompanyReviewArgs = {
  input: UpdateCustomerCompanyReviewInput;
};

export type MutationUpdateCustomerProductReviewArgs = {
  input: UpdateCustomerProductReviewInput;
};

export type MutationUpdateDictionaryPropertyArgs = {
  input: UpdateDictionaryPropertyInput;
};

export type MutationUpdateIntegerPropertyArgs = {
  input: UpdatePropertyInput;
};

export type MutationUpdateOrderDeliveryArgs = {
  input: UpdateOrderDeliveryInput;
};

export type MutationUpdateOrderQuantityArgs = {
  input: UpdateOrderQuantityInput;
};

export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};

export type MutationUpdateRejectedCompanyArgs = {
  input: UpdateRejectedCompanyInput;
};

export type MutationUpdateReturnedShipmentArgs = {
  input: UpdateReturnedShipmentInput;
};

export type MutationUpdateStringPropertyArgs = {
  input: UpdatePropertyInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type MutationUpdateUserAvatarArgs = {
  input: UpdateUserAvatarInput;
};

export type MutationUpdateUserEmailArgs = {
  input: UpdateUserEmailInput;
};

export type MutationUpdateUserMenuItemsArgs = {
  input: UpdateUserMenuItemsInput;
};

export type MutationUpdateUserPasswordArgs = {
  input: UpdateUserPasswordInput;
};

export type MutationUpdateUserPhoneArgs = {
  input: UpdateUserPhoneInput;
};

export type NewDisputeProposalInput = {
  /** Спор */
  disputeId: Scalars['ID'];
  /** Предложение решения спора */
  proposal: CreateDisputeProposalInput;
};

export type OpenDisputeInput = {
  /** Спор */
  dispute: CreateDisputeInput;
  /** id заказа */
  orderId: Scalars['ID'];
  /** Предложение решения спора */
  proposal: CreateDisputeProposalInput;
};

export type OpeningHours = {
  __typename?: 'OpeningHours';
  endTime: Time;
  startTime: Time;
  weekday: WeekdayEnum;
};

export type Order = AccountOperationOriginInterface & {
  __typename?: 'Order';
  /** Компания-покупатель */
  buyer?: Maybe<Company>;
  canLeaveReview: AuthorizationResult;
  canOpenDispute: AuthorizationResult;
  canRequestSupport: AuthorizationResult;
  canReserve: AuthorizationResult;
  /** Статус оформления заказа */
  checkoutStatus: OrderCheckoutStatusEnum;
  /** Адрес компании, только для способов доставки 'курьер' и 'до терминала' */
  companyLocation?: Maybe<CompanyLocation>;
  /** Отзыв на компанию-продавца */
  companyReview?: Maybe<CompanyReview>;
  /** Электронный договор */
  contract?: Maybe<OrderContract>;
  /** Причина удаления */
  deletionReason?: Maybe<OrderDeletionReasonEnum>;
  /** Дата/время завершения доставки */
  deliveredAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** Адрес доставки */
  deliveryAddress?: Maybe<Scalars['String']>;
  /** Максимальная дата доставки */
  deliveryMaxDate?: Maybe<Scalars['ISO8601Date']>;
  /** Способ доставки */
  deliveryMethod: DeliveryMethodEnum;
  /** Минимальная дата доставки */
  deliveryMinDate?: Maybe<Scalars['ISO8601Date']>;
  /** ID точки доставки, только для способа доставки 'до терминала' */
  deliveryPointId?: Maybe<Scalars['ID']>;
  /** Стоимость доставки */
  deliveryPrice: Scalars['Float'];
  /** Служба доставки */
  deliveryService?: Maybe<DeliveryServiceEnum>;
  /** Размер скидки (в процентах) на момент оформления заказа */
  discount: Scalars['Int'];
  /** Спор по заказу */
  dispute?: Maybe<Dispute>;
  /** Статус выполнения заказа */
  executionStatus?: Maybe<OrderExecutionStatusEnum>;
  /** Причина истечения срока действия заказа */
  expirationReason?: Maybe<OrderExpirationReasonEnum>;
  /** Дата/время истечения срока действия заказа */
  expiredAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** Промежуточная таблица, связывающая заказ с гостем */
  guestUserOrder?: Maybe<GuestUserOrder>;
  id: Scalars['ID'];
  /** Счета на оплату */
  invoices?: Maybe<Array<OrderInvoice>>;
  /** Исходная цена за единицу на момент оформления заказа */
  itemInitialPrice?: Maybe<Scalars['Float']>;
  /** Цена за единицу с учетом скидок на момент оформления заказа */
  itemPrice?: Maybe<Scalars['Float']>;
  /** Периодическая скидка на момент оформления заказа */
  periodDiscount?: Maybe<PeriodDiscount>;
  /** Дата самовывоза, только для способа доставки 'самовывоз' */
  pickupDate?: Maybe<Scalars['ISO8601Date']>;
  /** Дата/время оформления заказа */
  placedAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** Товар */
  product: Product;
  /** Отзыв на товар */
  productReview?: Maybe<ProductReview>;
  /** Количество */
  quantity: Scalars['Int'];
  /** Статус резервации заказа */
  reservationStatus?: Maybe<OrderReservationStatusEnum>;
  /** Компания-продавец */
  seller: Company;
  /** Вариант товара */
  variant: Variant;
  /** Еженедельная скидка на момент оформления заказа */
  weeklyDiscount?: Maybe<WeeklyDiscount>;
};

export enum OrderCheckoutStatusEnum {
  /** в корзине */
  InCart = 'IN_CART',
  /** оформлен */
  Placed = 'PLACED',
  /** в обработке */
  Processing = 'PROCESSING',
  /** Reserved */
  Reserved = 'RESERVED',
}

/** The connection type for Order. */
export type OrderConnection = {
  __typename?: 'OrderConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<OrderEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Order>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type OrderContract = {
  __typename?: 'OrderContract';
  /** Url для скачивания договора */
  url: Scalars['String'];
};

export enum OrderDeletionReasonEnum {
  /** Отменён */
  Canceled = 'CANCELED',
  /** Слишком долго лежал в корзине */
  Expired = 'EXPIRED',
  /** Товара нет в наличии */
  OutOfStock = 'OUT_OF_STOCK',
}

/** An edge in a connection. */
export type OrderEdge = {
  __typename?: 'OrderEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Order>;
};

export enum OrderExecutionStatusEnum {
  /** подтвержден */
  Confirmed = 'CONFIRMED',
  /** доставлен */
  Delivered = 'DELIVERED',
  /** открыт спор */
  DisputeOpened = 'DISPUTE_OPENED',
  /** в сборке */
  InAssembly = 'IN_ASSEMBLY',
  /** в пути */
  InTransit = 'IN_TRANSIT',
  /** вмешался medagregator */
  MedagregatorIntervened = 'MEDAGREGATOR_INTERVENED',
  /** не оплачен */
  PaymentPending = 'PAYMENT_PENDING',
}

export enum OrderExpirationReasonEnum {
  /** Оформление заказа из корзины */
  CheckoutFromCart = 'CHECKOUT_FROM_CART',
  /** Отсутствует компания покупателя */
  CompanyNotCreated = 'COMPANY_NOT_CREATED',
  /** Компания отклонена, необходимо внести изменения */
  CompanyRejected = 'COMPANY_REJECTED',
  /** Ожидает подтверждения оформления */
  NoReservationResponse = 'NO_RESERVATION_RESPONSE',
}

export type OrderInvoice = {
  __typename?: 'OrderInvoice';
  /** Тип счета */
  invoiceType: OrderInvoiceTypeEnum;
  /** Url для скачивания счета */
  url: Scalars['String'];
};

export enum OrderInvoiceTypeEnum {
  /** Счет на оплату агентского вознаграждения */
  AgencyFee = 'AGENCY_FEE',
  /** Счет на оплату доставки */
  Delivery = 'DELIVERY',
  /** Счет на оплату товара */
  Product = 'PRODUCT',
}

export enum OrderReservationStatusEnum {
  /** Подтвержден */
  Confirmed = 'CONFIRMED',
  /** Ожидает подтверждения оформления */
  PendingConfirmation = 'PENDING_CONFIRMATION',
  /** Требуется помощь администратора */
  SupportRequested = 'SUPPORT_REQUESTED',
}

export type OrdersSummary = {
  __typename?: 'OrdersSummary';
  totalCount: Scalars['Int'];
};

export type PackingMaterial = {
  __typename?: 'PackingMaterial';
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** The connection type for PackingMaterial. */
export type PackingMaterialConnection = {
  __typename?: 'PackingMaterialConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<PackingMaterialEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<PackingMaterial>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type PackingMaterialEdge = {
  __typename?: 'PackingMaterialEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<PackingMaterial>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type PeriodDiscount = {
  __typename?: 'PeriodDiscount';
  /** Размер скидки (проценты) */
  amount: Scalars['Int'];
  /** Конец периода */
  endDate: Scalars['ISO8601Date'];
  id: Scalars['ID'];
  /** Начало периода */
  startDate: Scalars['ISO8601Date'];
};

export type PeriodDiscountInput = {
  /** Размер скидки (проценты) */
  amount: Scalars['Int'];
  /** Конец периода */
  endDate: Scalars['ISO8601Date'];
  /** Начало периода */
  startDate: Scalars['ISO8601Date'];
};

export type PickupDeliveryMethod = {
  __typename?: 'PickupDeliveryMethod';
  /** Доступность самовывоза */
  available: Scalars['Boolean'];
};

export type PlaceOrderInput = {
  /** Заказ */
  orderId: Scalars['ID'];
};

export type PointDeliveryMethod = {
  __typename?: 'PointDeliveryMethod';
  /** Доступность доставки до терминала */
  available: Scalars['Boolean'];
  /** Терминалы */
  deliveryPoints?: Maybe<Array<DeliveryPoint>>;
  /** Максимальная дата доставки */
  endDate?: Maybe<Scalars['ISO8601Date']>;
  /** Ошибка при обращении к api сервиса доставки */
  error?: Maybe<ExternalError>;
  /** Стоимость доставки */
  price?: Maybe<Scalars['Float']>;
  /** Сервис доставки */
  service: PointServiceEnum;
  /** Минимальная дата доставки */
  startDate?: Maybe<Scalars['ISO8601Date']>;
};

export enum PointServiceEnum {
  /** Деловые Линии */
  Dellin = 'DELLIN',
  /** СДЭК */
  Sdek = 'SDEK',
}

export type Presign = {
  __typename?: 'Presign';
  /**
   * Поля которые должны быть переданы вместе с запросом аплоада файла в form-data в случае если метод загрузки `POST`
   *
   */
  fields: Array<PresignField>;
  /**
   * Заголовки которые должны быть переданы с запросом аплоада файла в случае если метод загрузки `PUT`
   *
   */
  headers: Array<PresignHeader>;
  /** Метод загрузки */
  presignMethod: PresignMethodEnum;
  /** URL для аплоада файла */
  url: Scalars['String'];
};

export type PresignDataInput = {
  /** Имя файла */
  filename: Scalars['String'];
  /** Размер файла в байтах */
  size: Scalars['Int'];
  /** Тип файла, например `image/png` `video/mp4` и т.д. */
  type: Scalars['String'];
};

export type PresignField = {
  __typename?: 'PresignField';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type PresignHeader = {
  __typename?: 'PresignHeader';
  name: Scalars['String'];
  value: Scalars['String'];
};

export enum PresignMethodEnum {
  /**
   * Загрузка файла должна быть выполнена через форму (form-data) методом post c presign-полями (fields)
   *
   */
  Post = 'POST',
  /**
   * Загрузка файла должна быть выполнена PUT-запросом с presign-заголовками (headers)
   *
   */
  Put = 'PUT',
}

export type Product = ReviewableItem & {
  __typename?: 'Product';
  /** Флаг возможности добавления в корзину гостевым пользователям */
  canAddToGuestCart: Scalars['Boolean'];
  /** Флаг возможности добавления в список приоритетных */
  canAddToPriorityList: Scalars['Boolean'];
  /** Флаг возможности удаления из списка приоритетных */
  canRemoveFromPriorityList: Scalars['Boolean'];
  /**
   * Категория товара.
   * Т.к. категории хранятся в виде дерева, то в товаре хранится наиболее глубоко выбранная категория.
   * Узнать путь к корню можно через `parent` категории
   *
   */
  category?: Maybe<Category>;
  /** Компания-продавец товара */
  company: Company;
  /** Адрес местонахождения */
  companyLocation?: Maybe<CompanyLocation>;
  /** Состояние товара */
  condition?: Maybe<ConditionEnum>;
  /** Страна производителя */
  country?: Maybe<Country>;
  /** Флаг 'товар удален' */
  deleted: Scalars['Boolean'];
  /** Причина удаления */
  deletionReason?: Maybe<ProductDeletionReasonEnum>;
  /** Параметры для службы доставки в случае если параметры заданы одинаковыми для всех вариантов товара */
  deliveryCondition?: Maybe<DeliveryCondition>;
  /** Доступность отправки курьером 'Деловых Линий' */
  dellinCourierAllowed: Scalars['Boolean'];
  /** ID терминала отправки 'Деловых линий' */
  dellinDeliveryPointId?: Maybe<Scalars['ID']>;
  /** ID характера груза 'Деловых линий' */
  dellinFreightTypeId?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  /** Запретить самовывоз */
  disablePickup: Scalars['Boolean'];
  discountMethod: DiscountMethodEnum;
  /** Флаг 'черновик' */
  draft: Scalars['Boolean'];
  /** Текущий шаг черновика */
  draftStep?: Maybe<ProductDraftStepEnum>;
  /**
   * Флаг 'в избранном' для текущего пользователя.
   * Возвращает false, если пользователь не был аутентифицирован.
   *
   */
  favorite: Scalars['Boolean'];
  /** Количество лайков */
  favoritesCount: Scalars['Int'];
  id: Scalars['ID'];
  /** Производитель */
  manufacturer?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  /** Параметры периодических скидок для случая если скидки заданы одинаковыми для всех вариантов товара */
  periodDiscounts?: Maybe<Array<PeriodDiscount>>;
  /** Является ли товар приоритетным */
  prioritized: Scalars['Boolean'];
  /** Подтверждающие фото и видео */
  productConfirmationRecords: Array<ConfirmationRecord>;
  /** Бесплатные курьерские доставки, осуществляемые продавцом */
  productFreeDeliveries: Array<ProductFreeDelivery>;
  /** Платные курьерские доставки, осуществляемые продавцом */
  productPaidDeliveries: Array<ProductPaidDelivery>;
  randomReview?: Maybe<ProductReview>;
  /** Рейтинг */
  rating?: Maybe<Scalars['Float']>;
  /** Количество оставленных отзывов */
  receivedReviewsCount: Scalars['Int'];
  /** Комментарий с пояснением отклонения товара */
  rejectionMessage?: Maybe<Scalars['String']>;
  /** Количество отклонений администратором */
  rejectsCount: Scalars['Int'];
  /** Доступность отправки курьером СДЭК */
  sdekCourierAllowed: Scalars['Boolean'];
  /** ID терминала отправки СДЭК */
  sdekDeliveryPointId?: Maybe<Scalars['ID']>;
  /** Время отправления на проверку */
  sentForVerificationAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** Способ отправки товара сторонней службой доставки */
  shipmentMethod: ShipmentMethodEnum;
  /** Статус: проверен / непроверен */
  status: StatusEnum;
  /** Флаг 'шаблон' */
  template: Scalars['Boolean'];
  /** Варианты товара */
  variants: Array<Variant>;
  /** Размер НДС (проценты) */
  vat: Scalars['Int'];
  /** Дедлайн проверки */
  verificationDeadlineAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** Время подтверждения админами */
  verifiedAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** Параметры скидок в дни недели для случая если скидки заданы одинаковыми для всех вариантов товара */
  weeklyDiscounts?: Maybe<Array<WeeklyDiscount>>;
  /** Размер оптовой партии (шт.) */
  wholesaleLot?: Maybe<Scalars['Int']>;
};

export type ProductConfirmationRecordInput = {
  /**
   * Информация о файле, загруженном с помощью direct upload, игнорируется если задан `attachmentRemoteUrl`
   *
   */
  attachment?: InputMaybe<Uploader>;
  /** Ссылка на загружаемый файл */
  attachmentRemoteUrl?: InputMaybe<Scalars['String']>;
};

/** The connection type for Product. */
export type ProductConnection = {
  __typename?: 'ProductConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ProductEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Product>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export enum ProductDeletionReasonEnum {
  /** Удален администратором */
  DeletedByAdmin = 'DELETED_BY_ADMIN',
  /** Удален клиентом */
  DeletedByClient = 'DELETED_BY_CLIENT',
}

export enum ProductDraftStepEnum {
  /** Адрес и параметры упаковки */
  Address = 'ADDRESS',
  /** Basic */
  Basic = 'BASIC',
  /** Своя доставка */
  Delivery = 'DELIVERY',
  /** Параметры для службы доставки */
  DeliveryConditions = 'DELIVERY_CONDITIONS',
  /** Параметры скидки */
  Discounts = 'DISCOUNTS',
  /** Цены */
  Prices = 'PRICES',
  /** Параметры товара */
  Properties = 'PROPERTIES',
}

/** An edge in a connection. */
export type ProductEdge = {
  __typename?: 'ProductEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Product>;
};

export type ProductFreeDelivery = {
  __typename?: 'ProductFreeDelivery';
  /** Город доставки */
  city: City;
  id: Scalars['ID'];
  /** Максимальное количество дней для доставки */
  maxDays: Scalars['Int'];
  /** Минимальная сумма заказа */
  minCost: Scalars['Int'];
  /** Минимальное количество дней для доставки */
  minDays: Scalars['Int'];
};

export type ProductFreeDeliveryInput = {
  /** Город доставки, см. query `cities` */
  cityId: Scalars['ID'];
  /** Максимальное количество дней, нужное для доставки */
  maxDays: Scalars['Int'];
  /** Минимальная сумма заказа при которой будет работать эта доставка */
  minCost: Scalars['Int'];
  /** Минимальное количество дней, нужное для доставки */
  minDays: Scalars['Int'];
};

export enum ProductOrderEnum {
  /** по возрастанию цены */
  PriceAsc = 'PRICE_ASC',
  /** по убыванию цены */
  PriceDesc = 'PRICE_DESC',
  /** по рейтингу товара */
  Rating = 'RATING',
  /** самые продаваемые */
  TimesOrdered = 'TIMES_ORDERED',
}

export type ProductPaidDelivery = {
  __typename?: 'ProductPaidDelivery';
  /** Город доставки */
  city: City;
  id: Scalars['ID'];
  /** Максимальное количество дней для доставки */
  maxDays: Scalars['Int'];
  /** Вес до (кг) */
  maxWeight: Scalars['Int'];
  /** Минимальное количество дней для доставки */
  minDays: Scalars['Int'];
  /** Вес от (кг) */
  minWeight: Scalars['Int'];
  /** Цена доставки */
  price: Scalars['Int'];
};

export type ProductPaidDeliveryInput = {
  /** Город доставки, см. query `cities` */
  cityId: Scalars['ID'];
  /** Максимальное количество дней, нужное для доставки */
  maxDays: Scalars['Int'];
  /** Вес (кг) 'до' - условие при котором будет работать эта доставка */
  maxWeight: Scalars['Int'];
  /** Минимальное количество дней, нужное для доставки */
  minDays: Scalars['Int'];
  /** Вес (кг) 'от' - условие при котором будет работать эта доставка */
  minWeight: Scalars['Int'];
  /** Цена доставки */
  price: Scalars['Int'];
};

/** Отзыв на товар с комментарием и оценкой */
export type ProductReview = {
  __typename?: 'ProductReview';
  /** Компания покупатель */
  buyer: Company;
  /** Дата создания отзыва */
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  /** Заказанный товар */
  product: Product;
  /** Комментарий к отзыву о товаре */
  productBody: Scalars['String'];
  /** Оценка товара по пятибальной шкале */
  productRating: Scalars['Int'];
  /** Компания продавец */
  seller: Company;
  /** Заказанный вариант товара */
  variant: Variant;
};

/** The connection type for ProductReview. */
export type ProductReviewConnection = {
  __typename?: 'ProductReviewConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ProductReviewEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<ProductReview>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ProductReviewEdge = {
  __typename?: 'ProductReviewEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<ProductReview>;
};

export enum ProductReviewOrderEnum {
  /** По дате (с начала) */
  CreatedAtAsc = 'CREATED_AT_ASC',
  /** По дате (с конца) */
  CreatedAtDesc = 'CREATED_AT_DESC',
  /** Рейтинг товара по возрастанию */
  ProductRatingAsc = 'PRODUCT_RATING_ASC',
  /** Рейтинг товара по убыванию */
  ProductRatingDesc = 'PRODUCT_RATING_DESC',
}

export type ProductsSummary = {
  __typename?: 'ProductsSummary';
  totalCount: Scalars['Int'];
};

/** Характеристика товара */
export type PropertyInterface = {
  canDestroy: AuthorizationResult;
  /** Полное дерево категории */
  categoryPath: Array<Category>;
  /** Отображаемое название (для пользователей) */
  displayName: Scalars['String'];
  /** ID характеристики */
  id: Scalars['ID'];
  /** Уникальное название (для администраторов) */
  name: Scalars['String'];
};

/** The connection type for PropertyInterface. */
export type PropertyInterfaceConnection = {
  __typename?: 'PropertyInterfaceConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<PropertyInterfaceEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<PropertyInterface>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type PropertyInterfaceEdge = {
  __typename?: 'PropertyInterfaceEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<PropertyInterface>;
};

export type PublicSupportRequestInput = {
  /** E-mail автора запроса */
  email: Scalars['String'];
  /** Загруженные изображения к запросу */
  images?: InputMaybe<Array<SupportRequestPhotoInput>>;
  /** Текст запроса */
  message: Scalars['String'];
  /** Тема запроса */
  subject: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /**
   * Информация об аналитическом счете.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  account: Account;
  /**
   * Операции компании по аналитическому счету.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  accountOperations: AccountOperationConnection;
  /**
   * Пользователи.
   *
   * Доступен только для суперадминов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  admins: UserConnection;
  /**
   * Список моих отзывов о компаниях, у которых были совершены заказы
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  buyerCompanyReviews: CompanyReviewConnection;
  /**
   * Список моих отзывов о заказанных продуктах
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  buyerProductReviews: ProductReviewConnection;
  /**
   * Категории товаров. Категории представлены в виде дерева.
   * Без аргумента `parentId` возвращает список корневых (верхних) категорий.
   * С заданным аргументом `parentId` возвращает список детей запрашиваемой категории.
   *
   */
  categories: Array<Category>;
  /**
   * Категория товаров.
   *
   */
  category: Category;
  /** Города */
  cities: CityConnection;
  /**
   * Возвращает список компаний.
   *
   */
  companies: CompanyConnection;
  /**
   * Отзывы о компаниях.
   *
   * Доступен только для админов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  companiesReviews: CompanyReviewConnection;
  /** Организационно-правовые формы */
  companyLegalForms: Array<CompanyLegalForm>;
  /** Адреса компании. Заголовок с токеном авторизации пользователя обязателен. */
  companyLocations: Array<CompanyLocation>;
  /** История рейтинга компании за прошлый год */
  companyRatingHistory: Array<RatingHistory>;
  /** Страны */
  countries: CountryConnection;
  /**
   * История операций по аналитическому счету.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  customerAccountOperations: AccountOperationConnection;
  /**
   * Компании.
   *
   * Доступен только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  customerCompanies: CompanyConnection;
  /**
   * Адреса компании.
   *
   * Доступен только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  customerCompanyLocations: CompanyLocationConnection;
  /**
   * Заказы.
   *
   * Доступен только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  customerOrders: OrderConnection;
  /**
   * Все товары.
   *
   * Доступен только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  customerProducts: ProductConnection;
  /**
   * Информация об организации из Dadata.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  dadataOrganization?: Maybe<DadataOrganization>;
  /** Способы доставки для авторизованного пользователя */
  deliveryMethods: DeliveryMethods;
  /** Терминалы служб доставки. Заголовок с токеном авторизации пользователя обязателен. */
  deliveryPoints: Array<DeliveryPoint>;
  /**
   * Список характеров груза в "Деловых Линиях"
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  dellinFreightTypes: DellinFreightKindConnection;
  /** Значения справочной характеристики */
  dictionaryPropertyOptions: Array<DictionaryPropertyOption>;
  /**
   * Предложенные решения по спору.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  disputeProposals: DisputeProposalConnection;
  /**
   * Возвращает избранные товары.
   * Просматривать "избранное" может пользователь у которого основная компания - покупатель.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  favoriteProducts: ProductConnection;
  /** Способы доставки для неавторизованного пользователя */
  guestDeliveryMethods: DeliveryMethods;
  /**
   * Заказы гостевого пользователя.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  guestOrders: OrderConnection;
  /** Возвращает текущего пользователя, или null при отсутствующем или неверном токене */
  me?: Maybe<CurrentUser>;
  /**
   * Возвращает список компаний в которых текущий пользователь является участником.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  myCompanies: CompanyConnection;
  /**
   * Возвращает пользователей-сотрудников в компаниях где текущий пользователь - босс.
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  myEmployees: UserConnection;
  /**
   * Возвращает товары компаний в которых текущий пользователь является участником.
   * В том числе черновики и непроверенные товары.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  myProducts: ProductConnection;
  /**
   * Возвращает компании-продавцы, товары которых есть в заказах указанной компании.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  orderSellers: CompanyConnection;
  /**
   * Возвращает заказы компании.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  orders: OrderConnection;
  /**
   * Возвращает информацию о количестве заказов, с возможностью фильтрации аналогично query `orders`.
   *
   * Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  ordersSummary: OrdersSummary;
  /** Материалы упаковки */
  packingMaterials: PackingMaterialConnection;
  /**
   * Возвращает производителей проверенных, неудаленных товаров, которые не являются черновиками или шаблонами
   *
   */
  productManufacturers: ManufacturerConnection;
  /**
   * Список отзывов о товаре
   *
   */
  productReviews: ProductReviewConnection;
  /**
   * Возвращает проверенные, неудаленные товары, которые не являются черновиками или шаблонами
   *
   */
  products: ProductConnection;
  /**
   * Отзывы о товарах.
   *
   * Доступен только для админов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  productsReviews: ProductReviewConnection;
  /**
   * Возвращает информацию о количестве товаров, с возможностью фильтрации аналогично query `products`
   *
   */
  productsSummary: ProductsSummary;
  /** Характеристики товаров */
  properties?: Maybe<PropertyInterfaceConnection>;
  /**
   * Список отзывов о компании
   *
   */
  sellerCompanyReviews: CompanyReviewConnection;
  /**
   * Список отзывов о товарах компании
   *
   */
  sellerProductReviews: ProductReviewConnection;
  /**
   * Категории товаров отображаемые на стартовой странице.
   *
   */
  startPageCategories: Array<Category>;
  /**
   * Переводы средств.
   *
   * Доступен только для администраторов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  transfers: TransferConnection;
  /**
   * Пользователи.
   *
   * Доступен только для админов. Заголовок с токеном авторизации пользователя обязателен.
   *
   */
  users: UserConnection;
};

export type QueryAccountArgs = {
  companyId: Scalars['ID'];
};

export type QueryAccountOperationsArgs = {
  acceptedDate?: InputMaybe<DateRangeFilterInput>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  companyId: Scalars['ID'];
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderIds?: InputMaybe<Array<Scalars['ID']>>;
  statuses?: InputMaybe<Array<AccountOperationStatusEnum>>;
  subjects?: InputMaybe<Array<AccountOperationSubjectEnum>>;
};

export type QueryAdminsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryBuyerCompanyReviewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  buyerCompanyId: Scalars['ID'];
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryBuyerProductReviewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  buyerCompanyId: Scalars['ID'];
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryCategoriesArgs = {
  ids?: InputMaybe<Array<Scalars['ID']>>;
  parentId?: InputMaybe<Scalars['ID']>;
};

export type QueryCategoryArgs = {
  id: Scalars['ID'];
};

export type QueryCitiesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  strict?: InputMaybe<Scalars['Boolean']>;
};

export type QueryCompaniesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  companyIds?: InputMaybe<Array<Scalars['ID']>>;
  directions?: InputMaybe<Array<CompanyDirectionEnum>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CompanyOrderEnum>;
  searchQuery?: InputMaybe<Scalars['String']>;
  statuses?: InputMaybe<Array<CompanyStatusEnum>>;
};

export type QueryCompaniesReviewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  companyName?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CompanyReviewOrderEnum>;
};

export type QueryCompanyLocationsArgs = {
  companyId: Scalars['ID'];
  statuses?: InputMaybe<Array<CompanyLocationStatusEnum>>;
};

export type QueryCompanyRatingHistoryArgs = {
  companyId: Scalars['ID'];
};

export type QueryCountriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type QueryCustomerAccountOperationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  searchQuery?: InputMaybe<Scalars['String']>;
  statuses?: InputMaybe<Array<AccountOperationStatusEnum>>;
};

export type QueryCustomerCompaniesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  companyIds?: InputMaybe<Array<Scalars['ID']>>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  directions?: InputMaybe<Array<CompanyDirectionEnum>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  officialName?: InputMaybe<Scalars['String']>;
  statuses?: InputMaybe<Array<CompanyStatusEnum>>;
  urgent?: InputMaybe<Scalars['Boolean']>;
};

export type QueryCustomerCompanyLocationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  companyName?: InputMaybe<Scalars['SquishedString']>;
  first?: InputMaybe<Scalars['Int']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  last?: InputMaybe<Scalars['Int']>;
  statuses?: InputMaybe<Array<CompanyLocationStatusEnum>>;
};

export type QueryCustomerOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  checkoutStatus?: InputMaybe<OrderCheckoutStatusEnum>;
  disputeStatuses?: InputMaybe<Array<DisputeStatusEnum>>;
  executionStatuses?: InputMaybe<Array<OrderExecutionStatusEnum>>;
  first?: InputMaybe<Scalars['Int']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  last?: InputMaybe<Scalars['Int']>;
  reservationStatuses?: InputMaybe<Array<OrderReservationStatusEnum>>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type QueryCustomerProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  categoryIds?: InputMaybe<Array<Scalars['ID']>>;
  companyIds?: InputMaybe<Array<Scalars['ID']>>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  deletionReasons?: InputMaybe<Array<ProductDeletionReasonEnum>>;
  draft?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CustomerProductOrderEnum>;
  productIds?: InputMaybe<Array<Scalars['ID']>>;
  searchQuery?: InputMaybe<Scalars['String']>;
  statuses?: InputMaybe<Array<StatusEnum>>;
  template?: InputMaybe<Scalars['Boolean']>;
};

export type QueryDadataOrganizationArgs = {
  inn: Scalars['String'];
};

export type QueryDeliveryMethodsArgs = {
  companyLocationId: Scalars['ID'];
  quantity: Scalars['Int'];
  variantId: Scalars['ID'];
};

export type QueryDeliveryPointsArgs = {
  cityId: Scalars['ID'];
  direction?: InputMaybe<DeliveryPointDirectionEnum>;
  service: PointServiceEnum;
};

export type QueryDellinFreightTypesArgs = {
  active?: InputMaybe<Scalars['Boolean']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type QueryDictionaryPropertyOptionsArgs = {
  categoryIds?: InputMaybe<Array<Scalars['ID']>>;
  propertyId: Scalars['ID'];
};

export type QueryDisputeProposalsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  disputeId: Scalars['ID'];
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryFavoriteProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type QueryGuestDeliveryMethodsArgs = {
  cityId: Scalars['ID'];
  quantity: Scalars['Int'];
  variantId: Scalars['ID'];
};

export type QueryGuestOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  checkoutStatus?: InputMaybe<OrderCheckoutStatusEnum>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryMyCompaniesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  companyIds?: InputMaybe<Array<Scalars['ID']>>;
  directions?: InputMaybe<Array<CompanyDirectionEnum>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  roleIds?: InputMaybe<Array<Scalars['ID']>>;
  statuses?: InputMaybe<Array<CompanyStatusEnum>>;
};

export type QueryMyEmployeesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryMyProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  companyIds?: InputMaybe<Array<Scalars['ID']>>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  deletionReasons?: InputMaybe<Array<ProductDeletionReasonEnum>>;
  draft?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProductOrderEnum>;
  productIds?: InputMaybe<Array<Scalars['ID']>>;
  searchQuery?: InputMaybe<Scalars['String']>;
  statuses?: InputMaybe<Array<StatusEnum>>;
  template?: InputMaybe<Scalars['Boolean']>;
};

export type QueryOrderSellersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  checkoutStatus?: InputMaybe<OrderCheckoutStatusEnum>;
  companyId: Scalars['ID'];
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  checkoutStatus?: InputMaybe<OrderCheckoutStatusEnum>;
  companyId: Scalars['ID'];
  deleted?: InputMaybe<Scalars['Boolean']>;
  disputeStatuses?: InputMaybe<Array<DisputeStatusEnum>>;
  executionStatuses?: InputMaybe<Array<OrderExecutionStatusEnum>>;
  first?: InputMaybe<Scalars['Int']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  last?: InputMaybe<Scalars['Int']>;
  placedDate?: InputMaybe<DateRangeFilterInput>;
  productSearchQuery?: InputMaybe<Scalars['String']>;
  sellerIds?: InputMaybe<Array<Scalars['ID']>>;
};

export type QueryOrdersSummaryArgs = {
  checkoutStatus?: InputMaybe<OrderCheckoutStatusEnum>;
  companyId: Scalars['ID'];
  deleted?: InputMaybe<Scalars['Boolean']>;
  disputeStatuses?: InputMaybe<Array<DisputeStatusEnum>>;
  executionStatuses?: InputMaybe<Array<OrderExecutionStatusEnum>>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  placedDate?: InputMaybe<DateRangeFilterInput>;
  productSearchQuery?: InputMaybe<Scalars['String']>;
  sellerIds?: InputMaybe<Array<Scalars['ID']>>;
};

export type QueryPackingMaterialsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type QueryProductManufacturersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type QueryProductReviewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  productId: Scalars['ID'];
};

export type QueryProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  categoryIds?: InputMaybe<Array<Scalars['ID']>>;
  companyIds?: InputMaybe<Array<Scalars['ID']>>;
  companyRating?: InputMaybe<Scalars['Int']>;
  condition?: InputMaybe<ConditionEnum>;
  dictionaryProperties?: InputMaybe<Array<DictionaryPropertyFilterInput>>;
  discounted?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  freeDeliveryCompanyId?: InputMaybe<Scalars['ID']>;
  integerProperties?: InputMaybe<Array<IntegerPropertyFilterInput>>;
  last?: InputMaybe<Scalars['Int']>;
  manufacturer?: InputMaybe<Scalars['String']>;
  maxPrice?: InputMaybe<Scalars['Int']>;
  minPrice?: InputMaybe<Scalars['Int']>;
  newest?: InputMaybe<Scalars['Boolean']>;
  orderBy?: InputMaybe<ProductOrderEnum>;
  productIds?: InputMaybe<Array<Scalars['ID']>>;
  rating?: InputMaybe<Scalars['Int']>;
  reviewsPresence?: InputMaybe<Scalars['Boolean']>;
  searchQuery?: InputMaybe<Scalars['String']>;
  vatPresence?: InputMaybe<Scalars['Boolean']>;
};

export type QueryProductsReviewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProductReviewOrderEnum>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type QueryProductsSummaryArgs = {
  categoryIds?: InputMaybe<Array<Scalars['ID']>>;
  companyIds?: InputMaybe<Array<Scalars['ID']>>;
  companyRating?: InputMaybe<Scalars['Int']>;
  condition?: InputMaybe<ConditionEnum>;
  dictionaryProperties?: InputMaybe<Array<DictionaryPropertyFilterInput>>;
  discounted?: InputMaybe<Scalars['Boolean']>;
  freeDeliveryCompanyId?: InputMaybe<Scalars['ID']>;
  integerProperties?: InputMaybe<Array<IntegerPropertyFilterInput>>;
  manufacturer?: InputMaybe<Scalars['String']>;
  maxPrice?: InputMaybe<Scalars['Int']>;
  minPrice?: InputMaybe<Scalars['Int']>;
  newest?: InputMaybe<Scalars['Boolean']>;
  orderBy?: InputMaybe<ProductOrderEnum>;
  productIds?: InputMaybe<Array<Scalars['ID']>>;
  rating?: InputMaybe<Scalars['Int']>;
  reviewsPresence?: InputMaybe<Scalars['Boolean']>;
  searchQuery?: InputMaybe<Scalars['String']>;
  vatPresence?: InputMaybe<Scalars['Boolean']>;
};

export type QueryPropertiesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  categoryIds?: InputMaybe<Array<Scalars['ID']>>;
  first?: InputMaybe<Scalars['Int']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type QuerySellerCompanyReviewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sellerCompanyId: Scalars['ID'];
};

export type QuerySellerProductReviewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sellerCompanyId: Scalars['ID'];
};

export type QueryTransfersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  last?: InputMaybe<Scalars['Int']>;
  operationStatuses?: InputMaybe<Array<AccountOperationStatusEnum>>;
  searchQuery?: InputMaybe<Scalars['String']>;
  transferTypes?: InputMaybe<Array<TransferTypeEnum>>;
};

export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  blocked?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderEnum>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type RatingHistory = {
  __typename?: 'RatingHistory';
  /** Дата в прошлом */
  date: Scalars['ISO8601Date'];
  /** Значения рейтинга компании на данный момент */
  rating?: Maybe<Scalars['Float']>;
};

export type ReceiveReturnedShipmentInput = {
  /** ID спора */
  disputeId: Scalars['ID'];
};

export type RejectCompanyInput = {
  /** ID компании */
  companyId: Scalars['ID'];
  /** Поля заявки, на которые запрашиваются изменения */
  fields: Array<CompanyFieldCommentInput>;
};

export type RejectCompanyLocationInput = {
  /** ID адреса компании */
  companyLocationId: Scalars['ID'];
  /** Причина отказа в подтверждении адреса компании */
  rejectionReason: Scalars['String'];
};

export type RejectProductInput = {
  /** Товар */
  productId: Scalars['ID'];
  /** Комментарий с пояснениями */
  rejectionMessage?: InputMaybe<Scalars['String']>;
};

export type RejectReturnedShipmentInput = {
  /** Причина отклонения */
  rejectComment: Scalars['String'];
  /** ID формы по отправке товара */
  returnedShipmentId: Scalars['ID'];
};

export type RemoveCompanyFromBlacklistInput = {
  /** Компания */
  companyId: Scalars['ID'];
};

export type RemoveProductFromFavoritesInput = {
  /** ID товара */
  productId: Scalars['ID'];
};

export type RemoveProductFromPriorityListInput = {
  /** ID товара */
  productId: Scalars['ID'];
};

/** Результат удаления товара из списка приоритетных */
export type RemoveProductFromPriorityListPayload = {
  __typename?: 'RemoveProductFromPriorityListPayload';
  /** Удаленный из списка приоритетных товар */
  product: Product;
};

export type RenewProductInput = {
  /** ID товара */
  productId: Scalars['ID'];
};

export type RequestDisputeSupportInput = {
  /** ID спора */
  disputeId: Scalars['ID'];
};

/** Результат запроса помощи по спору */
export type RequestDisputeSupportPayload = {
  __typename?: 'RequestDisputeSupportPayload';
  dispute: Dispute;
};

export type RequestPasswordRecoveryInput = {
  /** E-mail пользователя */
  email: Scalars['String'];
};

export type ReserveOrderInput = {
  /** ID заказа */
  orderId: Scalars['ID'];
};

/** Результат резервирования заказа */
export type ReserveOrderPayload = {
  __typename?: 'ReserveOrderPayload';
  message?: Maybe<Scalars['String']>;
  order: Order;
};

export type ResolveDisputeInput = {
  /** ID решения по спору */
  proposalId: Scalars['ID'];
};

export type RestoreProductInput = {
  /** ID товара */
  productId: Scalars['ID'];
};

export type ReturnedShipment = {
  __typename?: 'ReturnedShipment';
  /** Прикреплённые файлы */
  attachments: Array<ReturnedShipmentAttachment>;
  canConfirm: AuthorizationResult;
  canReject: AuthorizationResult;
  canUpdate: AuthorizationResult;
  /** Спор */
  dispute: Dispute;
  /** Максимальная дата доставки */
  endDate: Scalars['ISO8601Date'];
  /** ID формы подтверждения отправки */
  id: Scalars['ID'];
  /** Комментарий администратора, если форма была отклонена */
  rejectComment?: Maybe<Scalars['String']>;
  /** Минимальная дата доставки */
  startDate: Scalars['ISO8601Date'];
  /** Статус */
  status: ReturnedShipmentStatusEnum;
};

export type ReturnedShipmentAttachment = {
  __typename?: 'ReturnedShipmentAttachment';
  attachmentUrl: Scalars['String'];
  id: Scalars['ID'];
  originalFilename?: Maybe<Scalars['String']>;
};

export type ReturnedShipmentAttachmentInput = {
  /**
   * Информация о файле, загруженном с помощью direct upload, игнорируется если задан `attachmentRemoteUrl`
   *
   */
  attachment?: InputMaybe<Uploader>;
  /** Ссылка на загружаемый файл */
  attachmentRemoteUrl?: InputMaybe<Scalars['String']>;
};

export enum ReturnedShipmentStatusEnum {
  /** В ожидании */
  NotVerified = 'NOT_VERIFIED',
  /** Отклонено */
  Rejected = 'REJECTED',
  /** Принято */
  Verified = 'VERIFIED',
}

/** Сущность, имеющая рейтинг */
export type ReviewableItem = {
  /** Рейтинг */
  rating?: Maybe<Scalars['Float']>;
  /** Количество оставленных отзывов */
  receivedReviewsCount: Scalars['Int'];
};

export type SendSmsInput = {
  /** Номер телефона, без кода страны, нормализованный: только 10 цифр */
  phoneNumber: Scalars['PhoneNumber'];
};

export enum ShipmentMethodEnum {
  /** Служба доставки заберет товар курьером */
  Courier = 'COURIER',
  /** Я отвезу заказанный товар в терминал */
  DeliveryPoint = 'DELIVERY_POINT',
  /** Нет необходимости в сторонней службе доставки */
  None = 'NONE',
}

export type SignInInput = {
  /** Логином может быть только email пользователя */
  login: Scalars['String'];
  /** Пароль аккаунта */
  password: Scalars['String'];
};

export type SignOutInput = {
  /** Флаг 'выйти на всех устройствах' */
  everywhere?: InputMaybe<Scalars['Boolean']>;
};

/** Результат регистрации гостевого пользователя через корзину */
export type SignUpFromCartPayload = {
  __typename?: 'SignUpFromCartPayload';
  me: CurrentUser;
  message?: Maybe<Scalars['String']>;
};

export type SignUpInput = {
  /** E-mail пользователя */
  email: Scalars['String'];
  /** Имя пользователя */
  firstName: Scalars['SquishedString'];
  /** Фамилия пользователя */
  lastName: Scalars['SquishedString'];
  /** Отчество пользователя */
  middleName?: InputMaybe<Scalars['SquishedString']>;
  /** Пароль аккаунта */
  password: Scalars['String'];
  /** Номер телефона. Может содержать цифры, плюс, минус, скобки и пробелы */
  phoneNumber: Scalars['PhoneNumber'];
  /** Код из SMS-сообщения */
  smsCode: Scalars['String'];
};

export type SmsCode = {
  __typename?: 'SmsCode';
  id: Scalars['ID'];
  /** Время, после которого возможна отправка кода на тот же номер телефона */
  resendingAvailableAfter: Scalars['ISO8601DateTime'];
  /** Время, до которого можно использовать код */
  validUntil: Scalars['ISO8601DateTime'];
};

export enum StatusEnum {
  /** Не проверенный */
  NotVerified = 'NOT_VERIFIED',
  /** Закончившийся */
  OutOfStock = 'OUT_OF_STOCK',
  /** Проверка отклонена */
  Rejected = 'REJECTED',
  /** Проверенный */
  Verified = 'VERIFIED',
}

/** Строковая характеристика */
export type StringProperty = PropertyInterface & {
  __typename?: 'StringProperty';
  canDestroy: AuthorizationResult;
  /** Полное дерево категории */
  categoryPath: Array<Category>;
  /** Отображаемое название (для пользователей) */
  displayName: Scalars['String'];
  /** ID характеристики */
  id: Scalars['ID'];
  /** Уникальное название (для администраторов) */
  name: Scalars['String'];
};

/** Значение строковой характеристики варианта товара */
export type StringVariantProperty = VariantPropertyInterface & {
  __typename?: 'StringVariantProperty';
  id: Scalars['ID'];
  /** Характеристика товара */
  property: PropertyInterface;
  /** Значение */
  stringValue: Scalars['String'];
};

export type SubmitProductAddressStepInput = {
  /** Адрес местонахождения товара из списка адресов компании, см. query `companyLocations` */
  companyLocationId: Scalars['ID'];
  /** ID товара */
  productId: Scalars['ID'];
  /** Параметры вариантов товара */
  variants: Array<SubmitProductAddressStepVariantInput>;
};

/** Параметры варианта товара */
export type SubmitProductAddressStepVariantInput = {
  /** Вес брутто */
  grossWeight: Scalars['Int'];
  /** Высота */
  height: Scalars['Float'];
  /** ID варианта */
  id: Scalars['ID'];
  /** Длина */
  length: Scalars['Float'];
  /** Вес нетто */
  netWeight: Scalars['Int'];
  /** Материал упаковки, см. query `packingMaterials` */
  packingMaterialId: Scalars['ID'];
  /** Ширина */
  width: Scalars['Float'];
};

export type SubmitProductBasicStepInput = {
  /** Категория товара, см. query `categories`. Следует указывать наиболее глубоко выбранную категорию */
  categoryId: Scalars['ID'];
  /** Состояние товара */
  condition: ConditionEnum;
  /** Страна-производитель, см. query `countries` */
  countryId: Scalars['ID'];
  /** Описание товара */
  description?: InputMaybe<Scalars['SquishedString']>;
  /** Производитель товара */
  manufacturer: Scalars['SquishedString'];
  /** Название товара */
  name: Scalars['SquishedString'];
  /** ID товара */
  productId: Scalars['ID'];
};

export type SubmitProductDeliveryConditionsStepInput = {
  /**
   * Параметры доставки, в случае если они одинаковые для всех вариантов товара.
   * Обязателен когда `deliveryConditionForVariant` равен `false` и `shipmentMethod` не равен `NONE`
   *
   */
  deliveryCondition?: InputMaybe<DeliveryConditionInput>;
  /**
   * Параметры доставки указаны для каждого варианта товара отдельно.
   * Обязателен когда `shipmentMethod` не равен `NONE`
   *
   */
  deliveryConditionForVariant?: InputMaybe<Scalars['Boolean']>;
  /** Доступность отправки курьером 'Деловых Линий' */
  dellinCourierAllowed?: InputMaybe<Scalars['Boolean']>;
  /** ID терминала отправки 'Деловых линий' */
  dellinDeliveryPointId?: InputMaybe<Scalars['ID']>;
  /**
   * ID **действующего** характера груза 'Деловых линий'.
   * Поле обязательно в случаях:
   * - `shipmentMethod == COURIER && dellinCourierAllowed == true`
   * - `shipmentMethod == DELIVERY_POINT && dellin_delivery_point_id != null`
   *
   */
  dellinFreightTypeId?: InputMaybe<Scalars['ID']>;
  /** ID товара */
  productId: Scalars['ID'];
  /** Доступность отправки курьером СДЭК */
  sdekCourierAllowed?: InputMaybe<Scalars['Boolean']>;
  /** ID терминала отправки СДЭК */
  sdekDeliveryPointId?: InputMaybe<Scalars['ID']>;
  /** Способ отправки товара сторонней службой доставки */
  shipmentMethod: ShipmentMethodEnum;
  /** Параметры для вариантов товара */
  variants?: InputMaybe<Array<SubmitProductDeliveryConditionsStepVariantInput>>;
};

export type SubmitProductDeliveryConditionsStepVariantInput = {
  /**
   * Параметры доставки, в случае если они указаны для каждого варианта товара отдельно.
   * Обязателен, если `deliveryConditionForVariant` в параметрах шага равен `true`
   *
   */
  deliveryCondition?: InputMaybe<DeliveryConditionInput>;
  /** ID варианта */
  id: Scalars['ID'];
};

export type SubmitProductDeliveryStepInput = {
  /** Запретить самовывоз */
  disablePickup: Scalars['Boolean'];
  /** Параметры бесплатной доставки */
  productFreeDeliveries?: InputMaybe<Array<ProductFreeDeliveryInput>>;
  /** ID товара */
  productId: Scalars['ID'];
  /** Параметры платной доставки */
  productPaidDeliveries?: InputMaybe<Array<ProductPaidDeliveryInput>>;
};

export type SubmitProductDiscountsStepInput = {
  /** Способ применения скидок */
  discountMethod: DiscountMethodEnum;
  /** Флаг 'cкидки указаны на каждый вариант товара в отдельности' */
  discountsForVariant: Scalars['Boolean'];
  /**
   * Параметры периодических скидок для случая если скидки заданы одинаковыми для всех вариантов товара
   *
   */
  periodDiscounts?: InputMaybe<Array<PeriodDiscountInput>>;
  /** ID товара */
  productId: Scalars['ID'];
  /** Параметры скидок для вариантов товара */
  variants?: InputMaybe<Array<SubmitProductDiscountsStepVariantInput>>;
  /** Параметры скидок в дни недели для случая если скидки заданы одинаковыми для всех вариантов товара */
  weeklyDiscounts?: InputMaybe<Array<WeeklyDiscountInput>>;
};

export type SubmitProductDiscountsStepVariantInput = {
  /** ID варианта */
  id: Scalars['ID'];
  /** Параметры периодических скидок для случая если скидки заданы для каждого варианта товара отдельно */
  periodDiscounts?: InputMaybe<Array<PeriodDiscountInput>>;
  /** Параметры скидок в дни недели для случая если скидки заданы для каждого варианта товара отдельно */
  weeklyDiscounts?: InputMaybe<Array<WeeklyDiscountInput>>;
};

export type SubmitProductPricesStepInput = {
  /** Подтверждающие фото и видео */
  productConfirmationRecords?: InputMaybe<Array<ProductConfirmationRecordInput>>;
  /** ID товара */
  productId: Scalars['ID'];
  /** Параметры вариантов товара */
  variants: Array<SubmitProductPricesStepVariantInput>;
  /** Размер НДС (проценты) */
  vat: Scalars['Int'];
  /** Размер оптовой партии */
  wholesaleLot?: InputMaybe<Scalars['Int']>;
};

export type SubmitProductPricesStepVariantInput = {
  /** ID варианта */
  id: Scalars['ID'];
  /** Минимальная партия отгрузки */
  minShipmentLot: Scalars['Int'];
  /** Цена */
  price: Scalars['Float'];
  /** Количество товара на руках */
  stock: Scalars['Int'];
  /** Оптовая цена */
  wholesalePrice?: InputMaybe<Scalars['Float']>;
};

export type SubmitProductPropertiesStepInput = {
  /** ID товара */
  productId: Scalars['ID'];
  /** Параметры вариантов товара */
  variants: Array<SubmitProductPropertiesStepVariantInput>;
};

/** Параметры варианта товара */
export type SubmitProductPropertiesStepVariantInput = {
  /**
   * Флаг "удалить этот вариант".
   * Если true, то валидация этого варианта не осуществляется.
   *
   */
  destroy?: InputMaybe<Scalars['Boolean']>;
  /** Дата окончания срока годности */
  expirationDate?: InputMaybe<Scalars['ISO8601Date']>;
  /**
   * ID варианта товара.
   * Если не указан - то будет создан новый вариант.
   * Если указан - будет сохранен существующий.
   *
   */
  id?: InputMaybe<Scalars['ID']>;
  /** Единица измерения товара: поштучно или в упаковке */
  unitKind?: InputMaybe<VariantUnitKindEnum>;
  /** Количество товара в упаковке; может быть пустым, если единица измерения товара - поштучно */
  unitQuantity?: InputMaybe<Scalars['Int']>;
  /** Единица измерения товара в упаковке; может быть пустым, если единица измерения товара - поштучно */
  unitQuantityKind?: InputMaybe<VariantUnitQuantityKindEnum>;
  /** Сертификаты варианта товара */
  variantCertificates?: InputMaybe<Array<VariantCertificateInput>>;
  /** Инструкции варианта товара */
  variantInstructions?: InputMaybe<Array<VariantInstructionInput>>;
  /** Фотографии варианта товара */
  variantPhotos?: InputMaybe<Array<VariantPhotoInput>>;
  /** Значения характеристик варианта товара */
  variantProperties?: InputMaybe<Array<VariantPropertyInput>>;
};

export type SupportRequest = {
  __typename?: 'SupportRequest';
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  images?: Maybe<Array<SupportRequestPhoto>>;
  message: Scalars['String'];
  subject: Scalars['String'];
  user?: Maybe<User>;
};

export type SupportRequestInput = {
  /** Загруженные изображения к запросу */
  images?: InputMaybe<Array<SupportRequestPhotoInput>>;
  /** Текст запроса */
  message: Scalars['String'];
  /** ID зарезервированного заказа */
  orderId?: InputMaybe<Scalars['ID']>;
  /** Тема запроса */
  subject: Scalars['String'];
};

export type SupportRequestPhoto = {
  __typename?: 'SupportRequestPhoto';
  id: Scalars['ID'];
  imageUrl: Scalars['String'];
};

export type SupportRequestPhotoInput = {
  /** Данные загруженного изображения */
  image: Uploader;
};

export enum SystemRoleEnum {
  /** Admin */
  Admin = 'ADMIN',
  /** Client */
  Client = 'CLIENT',
  /** Guest */
  Guest = 'GUEST',
  /** Superadmin */
  Superadmin = 'SUPERADMIN',
}

export type Time = {
  __typename?: 'Time';
  hour: Scalars['Int'];
  minute: Scalars['Int'];
};

export type Transfer = AccountOperationOriginInterface & {
  __typename?: 'Transfer';
  /** Операция по аналитическому счету */
  accountOperation: AccountOperation;
  /** Сумма */
  amount: Scalars['Float'];
  /** URL для скачивания заявления на вывод средств */
  applicationUrl: Scalars['String'];
  /** Компания */
  company: Company;
  /** Дата создания перевода */
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  /** Счет */
  invoice?: Maybe<TransferInvoice>;
  /** Тип перевода */
  transferType: TransferTypeEnum;
  /** Размер НДС */
  vat: Scalars['Int'];
  /** Тип НДС */
  vatType: TransferVatTypeEnum;
};

/** The connection type for Transfer. */
export type TransferConnection = {
  __typename?: 'TransferConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<TransferEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Transfer>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type TransferEdge = {
  __typename?: 'TransferEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Transfer>;
};

export type TransferInvoice = {
  __typename?: 'TransferInvoice';
  /** Url для скачивания счета */
  url: Scalars['String'];
};

export enum TransferTypeEnum {
  /** пополнение счета */
  Deposit = 'DEPOSIT',
  /** вывод средств со счета */
  Withdrawal = 'WITHDRAWAL',
}

export enum TransferVatTypeEnum {
  /** НДС не облагается */
  Exempted = 'EXEMPTED',
  /** НДС облагается */
  Taxed = 'TAXED',
}

export type UnbanCompanyInput = {
  /** ID компании */
  companyId: Scalars['ID'];
};

export type UnblockUserInput = {
  /** ID разблокируемого пользователя */
  userId: Scalars['ID'];
};

export type UpdateAdminAccountInput = {
  /** Текущий пароль */
  currentPassword: Scalars['String'];
  /** e-mail */
  email: Scalars['String'];
  /** Телефон */
  phoneNumber: Scalars['PhoneNumber'];
};

export type UpdateCategoryInput = {
  /** ID обновляемой категории. */
  categoryId: Scalars['ID'];
  /** Название категории. */
  name: Scalars['SquishedString'];
};

export type UpdateCompanyInput = {
  /** Наименование банка */
  bankName?: InputMaybe<Scalars['SquishedString']>;
  /** БИК банка */
  bic?: InputMaybe<Scalars['String']>;
  /** Расчетный счет компании */
  checkingAccount?: InputMaybe<Scalars['String']>;
  /** Подтверждающие фото и видео */
  companyConfirmationRecords?: InputMaybe<Array<CompanyConfirmationRecordInput>>;
  /** ID компании */
  companyId: Scalars['ID'];
  /** Корреспондентский счет компании */
  correspondentAccount?: InputMaybe<Scalars['String']>;
  /** ФИО генерального директора */
  directorFullName?: InputMaybe<Scalars['SquishedString']>;
  /** E-mail компании */
  email?: InputMaybe<Scalars['SquishedString']>;
  /** ИНН компании */
  inn?: InputMaybe<Scalars['String']>;
  /** КПП компании */
  kpp?: InputMaybe<Scalars['String']>;
  /** Юридический адрес компании */
  legalAddress?: InputMaybe<Scalars['SquishedString']>;
  /** Организационно-правовая форма, см. query `companyLegalForms` */
  legalFormId?: InputMaybe<Scalars['ID']>;
  /** Логотип компании, загруженный с помощью direct upload, игнорируется если задан `logoRemoteUrl` */
  logo?: InputMaybe<Uploader>;
  /** Ссылка на логотип компании */
  logoRemoteUrl?: InputMaybe<Scalars['String']>;
  /** Официальное наименование компании */
  officialName?: InputMaybe<Scalars['SquishedString']>;
  /** ОГРН компании */
  ogrn?: InputMaybe<Scalars['String']>;
  /** ОКТМО или ОКАТО компании */
  oktmo?: InputMaybe<Scalars['String']>;
  /** Номер телефона. Может содержать цифры, плюс, минус, скобки и пробелы */
  phoneNumber?: InputMaybe<Scalars['PhoneNumber']>;
  /** Почтовый индекс компании */
  postcode?: InputMaybe<Scalars['String']>;
  /** Система налогообложения компании */
  taxationSystem?: InputMaybe<CompanyTaxationSystemEnum>;
  /** Неофициальное наименование компании */
  unofficialName?: InputMaybe<Scalars['SquishedString']>;
};

export type UpdateCompanyLocationInput = {
  /** Адрес компании */
  address: Scalars['String'];
  /** ID города */
  cityId: Scalars['ID'];
  /** Комментарий к адресу */
  comment?: InputMaybe<Scalars['String']>;
  /**
   * Лицензии для адреса.
   * В случае если требуется удалить лицензию, для нее передается флаг `destroy` со значение `true`
   *
   */
  companyLicenses?: InputMaybe<Array<CompanyLocationLicenseInput>>;
  /** ID адреса компании */
  companyLocationId: Scalars['ID'];
  /** Номер телефона. Может содержать цифры, плюс, минус, скобки и пробелы */
  phoneNumber: Scalars['PhoneNumber'];
  /** Почтовый индекс адреса */
  postcode: Scalars['String'];
};

export type UpdateCompanyLogoInput = {
  /** ID компании */
  companyId: Scalars['ID'];
  /** Данные о логотипе компании */
  logo: Uploader;
};

export type UpdateCompanyMemberInput = {
  /** Список компаний, к которым у сотрудника есть доступ */
  companyIds: Array<Scalars['ID']>;
  /** ID сотрудника */
  userId: Scalars['ID'];
};

export type UpdateCustomerCompanyReviewInput = {
  /** Отзыв о компании-продавце */
  companyBody?: InputMaybe<Scalars['String']>;
  /** ID редактируемого отзыва */
  reviewId: Scalars['ID'];
};

export type UpdateCustomerProductReviewInput = {
  /** Отзыв о товаре */
  productBody?: InputMaybe<Scalars['String']>;
  /** ID редактируемого отзыва */
  reviewId: Scalars['ID'];
};

export type UpdateDictionaryPropertyInput = {
  /** Значения */
  dictionaryPropertyOptions?: InputMaybe<Array<UpdateDictionaryPropertyOptionInput>>;
  /** Отображаемое название (для пользователей) */
  displayName: Scalars['SquishedString'];
  /** Уникальное название (для администраторов) */
  name: Scalars['SquishedString'];
  /** ID изменяемой характеристики */
  propertyId: Scalars['ID'];
};

export type UpdateDictionaryPropertyOptionInput = {
  /** Флаг 'удалить это значение' */
  destroy?: InputMaybe<Scalars['Boolean']>;
  /**
   * ID значения.
   * Если не указан - то будет создано новое значение.
   * Если указан - будет изменено существующее.
   *
   */
  id?: InputMaybe<Scalars['ID']>;
  /** Значение */
  name: Scalars['SquishedString'];
};

export type UpdateOrderDeliveryInput = {
  /** Адрес доставки. Обязателен если способ доставки 'курьер' или 'до терминала' */
  companyLocationId?: InputMaybe<Scalars['ID']>;
  /** Способ доставки */
  deliveryMethod: DeliveryMethodEnum;
  /** Терминал доставки. Обязателен если способ доставки 'до терминала' */
  deliveryPointId?: InputMaybe<Scalars['ID']>;
  /** Служба доставки. Обязательна если способ доставки 'курьер' или 'до терминала' */
  deliveryService?: InputMaybe<DeliveryServiceEnum>;
  /** Заказ */
  orderId: Scalars['ID'];
  /** Дата самовывоза. Обязательна если способ доставки 'самовывоз' */
  pickupDate?: InputMaybe<Scalars['ISO8601Date']>;
};

export type UpdateOrderQuantityInput = {
  /** Заказ */
  orderId: Scalars['ID'];
  /** Количество */
  quantity: Scalars['Int'];
};

export type UpdatePasswordInput = {
  /** Новый пароль */
  password: Scalars['String'];
  /** Токен, полученный в письме на запрос восстановления пароля */
  resetToken: Scalars['String'];
};

export type UpdatePropertyInput = {
  /** Отображаемое название (для пользователей) */
  displayName: Scalars['SquishedString'];
  /** Уникальное название (для администраторов) */
  name: Scalars['SquishedString'];
  /** ID изменяемой характеристики */
  propertyId: Scalars['ID'];
};

export type UpdateRejectedCompanyInput = {
  /** Наименование банка */
  bankName?: InputMaybe<Scalars['SquishedString']>;
  /** БИК банка */
  bic?: InputMaybe<Scalars['String']>;
  /** Расчетный счет компании */
  checkingAccount?: InputMaybe<Scalars['String']>;
  /** Подтверждающие фото и видео */
  companyConfirmationRecords?: InputMaybe<Array<CompanyConfirmationRecordInput>>;
  /** ID компании */
  companyId: Scalars['ID'];
  /** Корреспондентский счет компании */
  correspondentAccount?: InputMaybe<Scalars['String']>;
  /** ФИО генерального директора */
  directorFullName?: InputMaybe<Scalars['SquishedString']>;
  /** E-mail компании */
  email?: InputMaybe<Scalars['SquishedString']>;
  /** ИНН компании */
  inn?: InputMaybe<Scalars['String']>;
  /** КПП компании */
  kpp?: InputMaybe<Scalars['String']>;
  /** Юридический адрес компании */
  legalAddress?: InputMaybe<Scalars['SquishedString']>;
  /** Организационно-правовая форма, см. query `companyLegalForms` */
  legalFormId?: InputMaybe<Scalars['ID']>;
  /** Логотип компании, загруженный с помощью direct upload, игнорируется если задан `logoRemoteUrl` */
  logo?: InputMaybe<Uploader>;
  /** Ссылка на логотип компании */
  logoRemoteUrl?: InputMaybe<Scalars['String']>;
  /** Официальное наименование компании */
  officialName?: InputMaybe<Scalars['SquishedString']>;
  /** ОГРН компании */
  ogrn?: InputMaybe<Scalars['String']>;
  /** ОКТМО или ОКАТО компании */
  oktmo?: InputMaybe<Scalars['String']>;
  /** Номер телефона. Может содержать цифры, плюс, минус, скобки и пробелы */
  phoneNumber?: InputMaybe<Scalars['PhoneNumber']>;
  /** Почтовый индекс компании */
  postcode?: InputMaybe<Scalars['String']>;
  /** Система налогообложения компании */
  taxationSystem?: InputMaybe<CompanyTaxationSystemEnum>;
  /** Неофициальное наименование компании */
  unofficialName?: InputMaybe<Scalars['SquishedString']>;
};

export type UpdateReturnedShipmentInput = {
  /** Прикреплённые файлы */
  attachments?: InputMaybe<Array<ReturnedShipmentAttachmentInput>>;
  /** Максимальная дата доставки */
  endDate?: InputMaybe<Scalars['ISO8601Date']>;
  /** ID формы по отправке товара */
  returnedShipmentId: Scalars['ID'];
  /** Минимальная дата доставки */
  startDate?: InputMaybe<Scalars['ISO8601Date']>;
};

export type UpdateUserAvatarInput = {
  /** Данные об аватаре пользователя */
  avatar?: InputMaybe<Uploader>;
};

export type UpdateUserEmailInput = {
  /** Текущий пароль */
  currentPassword: Scalars['String'];
  /** E-mail пользователя */
  email: Scalars['SquishedString'];
  /** Согласен на рассылку от агрегатора */
  emailMailingEnabled?: InputMaybe<Scalars['Boolean']>;
  /** Не присылать уведомления по моим сделкам и спорам */
  emailNotificationsDisabled?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateUserInput = {
  /** Имя пользователя */
  firstName: Scalars['String'];
  /** Фамилия пользователя */
  lastName: Scalars['String'];
  /** Отчество пользователя */
  middleName?: InputMaybe<Scalars['String']>;
};

export type UpdateUserMenuItemsInput = {
  /** Пункты меню */
  menuItems: Array<MenuItemInput>;
};

export type UpdateUserPasswordInput = {
  /** Текущий пароль */
  currentPassword?: InputMaybe<Scalars['String']>;
  /** Новый пароль */
  password: Scalars['String'];
};

export type UpdateUserPhoneInput = {
  /** Текущий пароль */
  currentPassword: Scalars['String'];
  /** Согласен на рассылку от агрегатора */
  phoneMailingEnabled?: InputMaybe<Scalars['Boolean']>;
  /** Не присылать уведомления по моим сделкам и спорам */
  phoneNotificationsDisabled?: InputMaybe<Scalars['Boolean']>;
  /** Номер телефона. Может содержать цифры, плюс, минус, скобки и пробелы */
  phoneNumber: Scalars['PhoneNumber'];
  /** Код из SMS-сообщения */
  smsCode: Scalars['String'];
};

/** Информация о загруженном файле */
export type Uploader = {
  /**
   * Идентификатор (имя файла) взятое из значения поля `key`,
   * которое было возвращено при генерации данных для аплоада с помощью мутации `presignData`.
   * Пример:
   * было возвращено значение "cache/187088c522eda0dfa788c5a556bc26fc.mp4",
   * в данном случае идентификатором является "187088c522eda0dfa788c5a556bc26fc.mp4"
   *
   */
  id: Scalars['String'];
  /** Метаданные загруженного файла */
  metadata: UploaderMetadata;
  /**
   * Хранилище в котором находится загруженный файл, взятое из значения поля `key`
   * которое было возвращено при генерации данных для аплоада с помощью мутации `presignData`.
   * Пример:
   * было возвращено значение "cache/187088c522eda0dfa788c5a556bc26fc.mp4",
   * в данном случае хранилищем является "cache".
   * Необязательное, по-умолчанию - `cache`
   *
   */
  storage?: InputMaybe<Scalars['String']>;
};

/** Метаданные загруженного файла */
export type UploaderMetadata = {
  /** Оригинальное имя файла */
  filename: Scalars['String'];
  /** mime-тип файла, например `image/png` */
  mimeType: Scalars['String'];
  /** Размер (байты) */
  size: Scalars['Int'];
};

/** Пользователь */
export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  /** Дата блокировки */
  blockedAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** Членство в компаниях */
  companyMembers: Array<CompanyMember>;
  /** Дата регистрации */
  createdAt: Scalars['ISO8601DateTime'];
  /** E-mail пользователя */
  email: Scalars['String'];
  /** Имя пользователя */
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Фамилия пользователя */
  lastName?: Maybe<Scalars['String']>;
  /** Отчество пользователя */
  middleName?: Maybe<Scalars['String']>;
  /** Номер телефона, без кода страны, нормализованный: только 10 цифр */
  phoneNumber?: Maybe<Scalars['String']>;
  /** Глобальная роль пользователя: босс/сотрудник */
  role?: Maybe<CompanyRole>;
  /** Роль пользователя в системе: суперадмин/админ/клиент */
  systemRole?: Maybe<SystemRoleEnum>;
};

/** The connection type for User. */
export type UserConnection = {
  __typename?: 'UserConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<User>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<User>;
};

/** Пункт настраиваемого меню */
export type UserMenuItem = {
  __typename?: 'UserMenuItem';
  id: Scalars['ID'];
  /** Тип пункта меню */
  itemType: UserMenuItemTypeEnum;
};

export enum UserMenuItemTypeEnum {
  /** Данные о компании */
  Company = 'COMPANY',
  /** Финансовые инструменты */
  FinancialInstruments = 'FINANCIAL_INSTRUMENTS',
  /** Мои товары */
  MyProducts = 'MY_PRODUCTS',
  /** Персональный помощник */
  PersonalAssistant = 'PERSONAL_ASSISTANT',
  /** Рейтинг */
  Rating = 'RATING',
  /** Отзывы */
  Reviews = 'REVIEWS',
  /** Пакет услуг */
  ServicePackage = 'SERVICE_PACKAGE',
  /** Страхование сделки */
  TransactionInsurance = 'TRANSACTION_INSURANCE',
}

export enum UserOrderEnum {
  /** по дате по возрастанию */
  CreatedAtAsc = 'CREATED_AT_ASC',
  /** по дате по убыванию */
  CreatedAtDesc = 'CREATED_AT_DESC',
  /** по почтовому адресу по алфавиту */
  Email = 'EMAIL',
  /** по фамилии по алфавиту */
  LastName = 'LAST_NAME',
}

export type Variant = {
  __typename?: 'Variant';
  /** Периодическая скидка, действующая сегодня */
  currentPeriodDiscount?: Maybe<PeriodDiscount>;
  /** Скидка дня недели, действующая сегодня */
  currentWeeklyDiscount?: Maybe<WeeklyDiscount>;
  /** Параметры для службы доставки, в случае если параметры заданы отдельно для каждого варианта товара */
  deliveryCondition?: Maybe<DeliveryCondition>;
  /** Размер скидки сегодня (в процентах) */
  discount: Scalars['Int'];
  /** Цена за единицу со скидкой */
  discountPrice?: Maybe<Scalars['Float']>;
  /** Оптовая цена со скидкой */
  discountWholesalePrice?: Maybe<Scalars['Float']>;
  /** Срок годности */
  expirationDate?: Maybe<Scalars['ISO8601Date']>;
  /** Вес брутто */
  grossWeight?: Maybe<Scalars['Int']>;
  /** Высота */
  height?: Maybe<Scalars['Float']>;
  /** ID варианта */
  id: Scalars['ID'];
  /** Длина */
  length?: Maybe<Scalars['Float']>;
  /** Минимальная партия отгрузки */
  minShipmentLot?: Maybe<Scalars['Int']>;
  /** Вес нетто */
  netWeight?: Maybe<Scalars['Int']>;
  /** Материал упаковки */
  packingMaterial?: Maybe<PackingMaterial>;
  /** Параметры периодических скидок для случая если скидки заданы для каждого варианта товара отдельно */
  periodDiscounts?: Maybe<Array<PeriodDiscount>>;
  /** Цена за единицу */
  price?: Maybe<Scalars['Float']>;
  /** Количество проданного товара */
  soldQuantity: Scalars['Int'];
  /** Количество товара на руках продавца */
  stock?: Maybe<Scalars['Int']>;
  /** Единица измерения товара: поштучно или в упаковке */
  unitKind: VariantUnitKindEnum;
  /** Количество товара в упаковке; может быть пустым, если единица измерения товара - поштучно */
  unitQuantity?: Maybe<Scalars['Int']>;
  /** Единица измерения товара в упаковке; может быть пустым, если единица измерения товара - поштучно */
  unitQuantityKind?: Maybe<VariantUnitQuantityKindEnum>;
  /** Сертификаты */
  variantCertificates: Array<VariantCertificate>;
  /** Инструкции */
  variantInstructions: Array<VariantInstruction>;
  /** Фотографии */
  variantPhotos: Array<VariantPhoto>;
  /** Свойства варианта товара */
  variantProperties: Array<VariantPropertyInterface>;
  /** Параметры скидок в дни недели для случая если скидки заданы для каждого варианта товара отдельно */
  weeklyDiscounts?: Maybe<Array<WeeklyDiscount>>;
  /** Оптовая цена */
  wholesalePrice?: Maybe<Scalars['Float']>;
  /** Ширина */
  width?: Maybe<Scalars['Float']>;
};

export type VariantCertificate = {
  __typename?: 'VariantCertificate';
  attachmentUrl: Scalars['String'];
  id: Scalars['ID'];
  originalFilename?: Maybe<Scalars['String']>;
};

export type VariantCertificateInput = {
  /**
   * Информация о файле, загруженном с помощью direct upload, игнорируется если задан `attachmentRemoteUrl`
   *
   */
  attachment?: InputMaybe<Uploader>;
  /** Ссылка на загружаемый файл */
  attachmentRemoteUrl?: InputMaybe<Scalars['String']>;
};

export type VariantInstruction = {
  __typename?: 'VariantInstruction';
  attachmentUrl: Scalars['String'];
  id: Scalars['ID'];
  originalFilename?: Maybe<Scalars['String']>;
};

export type VariantInstructionInput = {
  /**
   * Информация о файле, загруженном с помощью direct upload, игнорируется если задан `attachmentRemoteUrl`
   *
   */
  attachment?: InputMaybe<Uploader>;
  /** Ссылка на загружаемый файл */
  attachmentRemoteUrl?: InputMaybe<Scalars['String']>;
};

export type VariantPhoto = {
  __typename?: 'VariantPhoto';
  id: Scalars['ID'];
  imageUrl: Scalars['String'];
};

export type VariantPhotoInput = {
  /**
   * Информация о файле, загруженном с помощью direct upload, игнорируется если задан `imageRemoteUrl`
   *
   */
  image?: InputMaybe<Uploader>;
  /** Ссылка на загружаемый файл */
  imageRemoteUrl?: InputMaybe<Scalars['String']>;
};

export type VariantPropertyInput = {
  /**
   * Значение характеристики товара, см. query `dictionaryPropertyOptions`.
   * Обязательное в случае если характеристика справочная
   *
   */
  dictionaryPropertyOptionId?: InputMaybe<Scalars['ID']>;
  /**
   * Целое значение характеристики товара.
   * Обязательное в случае если характеристика целочисленная
   *
   */
  integerValue?: InputMaybe<Scalars['Int']>;
  /** Характеристика товара, см. query `properties` */
  propertyId: Scalars['ID'];
  /**
   * Строковое значение характеристики товара.
   * Обязательное в случае если характеристика строковая
   *
   */
  stringValue?: InputMaybe<Scalars['String']>;
};

/** Значение характеристики варианта товара */
export type VariantPropertyInterface = {
  id: Scalars['ID'];
  /** Характеристика товара */
  property: PropertyInterface;
};

export enum VariantUnitKindEnum {
  /** Поштучно */
  Item = 'ITEM',
  /** В упаковке */
  Pack = 'PACK',
}

export enum VariantUnitQuantityKindEnum {
  /** Штука */
  Item = 'ITEM',
  /** Пара */
  Pair = 'PAIR',
}

export enum WeekdayEnum {
  /** Пятница */
  Friday = 'FRIDAY',
  /** Понедельник */
  Monday = 'MONDAY',
  /** Суббота */
  Saturday = 'SATURDAY',
  /** Воскресенье */
  Sunday = 'SUNDAY',
  /** Четверг */
  Thursday = 'THURSDAY',
  /** Вторник */
  Tuesday = 'TUESDAY',
  /** Среда */
  Wednesday = 'WEDNESDAY',
}

export type WeeklyDiscount = {
  __typename?: 'WeeklyDiscount';
  /** Размер скидки (проценты) */
  amount: Scalars['Int'];
  id: Scalars['ID'];
  /** День недели */
  weekday: WeekdayEnum;
};

export type WeeklyDiscountInput = {
  /** Размер скидки (проценты) */
  amount: Scalars['Int'];
  /** День недели */
  weekday: WeekdayEnum;
};
