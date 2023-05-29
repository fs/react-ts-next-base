import { FC, InputHTMLAttributes, useState } from 'react';
import { ErrorMessage, Field, useField, useFormikContext } from 'formik';

import Button from 'components/shared/atoms/Button';
import Icon from 'components/shared/atoms/Icon';

import { ErrorWrapper, FieldLabel, FieldWrapper, InputWrapper } from './styled';
import { TInput } from './types';
import {
  backgroundColorConfig,
  borderConfig,
  colorConfig,
  heightConfig,
  marginConfig,
} from './config';

type TInputType = TInput & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<TInputType> = ({
  variant = 'default',
  type = 'text',
  $width = '100%',
  rounded = false,
  textAlign = 'left',
  iconType = 'none',
  icon,
  name,
  testId,
  disabled = false,
  readOnly = false,
  title,
  autoComplete,
  ...props
}) => {
  const { $mb = marginConfig[variant], $ml, $mr, $mt, ...fieldProps } = props;
  const { isSubmitting } = useFormikContext();
  const [_, meta] = useField(name);
  const { value, error, touched } = meta;

  const [isShowPassword, setIsShowPassword] = useState(false);
  const errorType = error && touched ? 'error' : 'default';
  const isInput = !(type === 'textarea');
  const inputType = type !== 'password' || !isShowPassword ? type : 'text';

  if (type === 'hidden') return <></>;

  return (
    <FieldWrapper
      $width={$width}
      inputHeight={heightConfig[variant]}
      backgroundColor={backgroundColorConfig[variant]}
      textAlign={textAlign}
      textColor={colorConfig[variant]}
      type={type}
      $mb={$mb}
      $ml={$ml}
      $mr={$mr}
      $mt={$mt}
    >
      {value && title && <FieldLabel htmlFor={title}>{title}</FieldLabel>}
      <InputWrapper
        border={borderConfig[variant][errorType]}
        rounded={rounded}
        backgroundColor={backgroundColorConfig[variant]}
        disabled={disabled}
      >
        {iconType === 'leading' && icon}
        <Field
          type={inputType}
          as={!isInput && type}
          name={name}
          id={name}
          data-testid={testId}
          disabled={isSubmitting || disabled}
          autoComplete={autoComplete}
          readOnly={readOnly}
          {...fieldProps}
        />
        {iconType === 'trailing' && icon}
        {type === 'password' && (
          <Button
            variant="hollow"
            size="small"
            iconType="only"
            icon={
              <Icon name={isShowPassword ? 'eye-closed' : 'eye'} $size={22} $color="grey_200" />
            }
            onClick={() => setIsShowPassword(!isShowPassword)}
            disabled={disabled}
          />
        )}
      </InputWrapper>
      <ErrorMessage name={name}>{msg => <ErrorWrapper>{msg}</ErrorWrapper>}</ErrorMessage>
    </FieldWrapper>
  );
};

export default Input;
