import styled, { css } from 'styled-components';

export const PagerWrapper = styled.div``;

export const RejectCommentWrapper = styled.div`
  padding: 1.5rem 1.5rem 0;
`;

export const ContentWrapper = styled.div(
  ({ theme: { headerHeight }, pagerHeight }) => css`
    > form {
      min-height: calc(var(--vh) * 100 - (${headerHeight} + ${pagerHeight + 148}px));
    }
  `,
);
