export type TCheckbox = {
  name: string;
  label: JSX.Element;
};

export type TFormValues = {
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  phoneNumber: string;
  password: string;
  smsCode: string;
  checkboxes: { [key: string]: boolean };
};

export type TRegistrationFormContent = {
  action: (values: TFormValues) => void;
  checkboxes: TCheckbox[];
};
