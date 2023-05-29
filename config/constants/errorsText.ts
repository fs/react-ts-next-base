export const REQUIRED_FIELD = 'This is a required field';
export const REQUIRED_FIELDS = 'Fields are required';
export const INVALID_FORMAT = 'The field is filled incorrectly';

export const EMAIL_INVALID = 'Email entered incorrectly';
export const EMAIL_MATCH = 'Email does not match';
export const PHONE_INVALID = 'Phone entered incorrectly';
export const PASSWORD_MATCH = 'Password does not match';
export const PASSWORD_INVALID_LENGTH = 'Minimum password length - 6 characters';
export const PASSWORD_INVALID_FORMAT =
  'Password must contain upper and lower case characters and numbers';

export const INVALID_LENGTH = (maxLength: number) => `Maximum length ${maxLength} characters`;
export const INVALID_COMMENT_LENGTH = (maxLength: number, currentLength: number) =>
  `Maximum comment length ${maxLength} characters (${currentLength}/${maxLength})`;
