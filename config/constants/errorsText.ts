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

export const INVALID_LENGTH = (maxLength: number) => `Максимальная длина ${maxLength} символов`;
export const INVALID_COMMENT_LENGTH = (maxLength: number, currentLength: number) =>
  `Максимальная длина комментария ${maxLength} символов  (${currentLength}/${maxLength})`;
