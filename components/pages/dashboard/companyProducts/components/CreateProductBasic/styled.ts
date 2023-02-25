import styled, { css } from 'styled-components';
import { TWidth } from 'public/styles/config/width';

export const FieldContainer = styled.div`
  margin: 0 0 1.375rem;
`;

export const Subtitle = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  padding: 0 0 0.75rem;
`;

export const FieldWrapper = styled.div<TWidth>(
  ({ $width }) => css`
    max-width: ${$width || '100%'};
  `,
);

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
