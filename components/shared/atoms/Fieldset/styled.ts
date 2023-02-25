import styled, { css } from 'styled-components';
import { TWidth } from 'public/styles/config/width';

export const FieldsetWrapper = styled.fieldset<TWidth>(
  ({ theme: { colors }, $width }) => css`
    padding: 0 1rem 0.4rem;
    border: 1px solid ${colors.greyA4};
    width: ${$width};
    background-color: ${colors.white};
    word-break: break-all;
    font-size: 0.9rem;
  `,
);

export const Legend = styled.legend`
  font-size: 0.75rem;
  padding: 0 0.4rem 0.25rem;
  margin-left: -0.5rem;
`;

export const ChildrenWrapper = styled.div`
  min-height: 1rem;
`;
