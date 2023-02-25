import styled, { css } from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    .react-switch-bg {
      border: 1px solid ${colors.greyA4};
    }
  `,
);
