import React from 'react';
import { useFormikContext } from 'formik';

import NumberInput from 'components/shared/atoms/NumberInput';

import { InputWrapper, Description } from './styled';

const DeliveryCityInput = ({
  width,
  name,
  title,
  placeholder,
  description,
  index,
  onBlur,
  readOnly,
}) => {
  const { isSubmitting } = useFormikContext();

  return (
    <InputWrapper width={width}>
      <NumberInput
        name={name}
        testId={name}
        title={title}
        placeholder={placeholder}
        suffix=""
        disabled={isSubmitting}
        errorMessage
        onBlur={onBlur}
        $mb={20}
        readOnly={readOnly}
      />
      {description && <Description index={index}>{description}</Description>}
    </InputWrapper>
  );
};

export default DeliveryCityInput;
