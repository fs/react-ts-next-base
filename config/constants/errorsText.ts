export const REQUIRED_FIELD = 'Это обязательное поле';
export const REQUIRED_FIELDS = 'Поля обязательны к заполнению';
export const INVALID_FORMAT = 'Поле заполнено неверно';

export const EMAIL_INVALID = 'Email введен неверно';
export const EMAIL_MATCH = 'Email не совпадает';
export const PHONE_INVALID = 'Номер телефона введен неверно';
export const PASSWORD_MATCH = 'Пароль не совпадает';
export const PASSWORD_INVALID_LENGTH = 'Минимальная длина пароля - 6 символов';
export const PASSWORD_INVALID_FORMAT =
  'Пароль должен содержать символы в верхнем и нижнем регистре и цифры';

export const MIN_PHOTOS_LENGTH = 'Обязательно минимум одно фото';
export const MAX_DISCOUNT = 'Укажите размер скидки меньше 100%';
export const MIN_DISCOUNT = 'Укажите размер скидки больше 0%';
export const MIN_PERCENT = 'минимум 0%';
export const MAX_PERCENT = 'максимум 100%';
export const MIN_COUNT = 'Укажите кол-во больше 0';
export const IMPOSSIBLE = 'Невозможно';
export const NECESSARILY = 'Обязательно';
export const WHOLESALE_REQUIRED = 'Укажите оптовое кол-во';
export const INVALID_DAYS_COUNT = 'от 1 дня';

export const INVALID_LENGTH = (maxLength: number) => `Максимальная длина ${maxLength} символов`;
export const INVALID_COMMENT_LENGTH = (maxLength: number, currentLength: number) =>
  `Максимальная длина комментария ${maxLength} символов  (${currentLength}/${maxLength})`;
