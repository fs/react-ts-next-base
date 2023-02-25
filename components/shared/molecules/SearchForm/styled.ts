import styled, { css } from 'styled-components';
import { Form as FormikForm } from 'formik';
import { getMarginStyles } from 'public/styles/config/margin';
import { TFormProps } from './types';

export const Form = styled(FormikForm)<TFormProps>(
  ({ $width = '100%', ...props }) => css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: ${$width};
    height: 2.5rem;
    position: relative;
    gap: 0.625rem;

    ${getMarginStyles(props)}
  `,
);
