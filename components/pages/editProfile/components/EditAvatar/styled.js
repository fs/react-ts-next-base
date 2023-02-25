import styled, { css } from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { colors, down, heightBreakpoints } }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    &::after {
      border: 1px solid ${colors.lightGreen};
      margin: 1.25rem auto 0;
      width: 2.5rem;
      content: '';
    }

    ${down(heightBreakpoints.sm, true)} {
      &::after {
        margin: 0.6rem auto 0;
      }
    }
  `,
);

export const ImageWrapper = styled.div`
  width: 5.15rem;
  height: 5.15rem;
`;

export const ChangeAvatarLink = styled.div(
  ({ theme: { colors, heightBreakpoints, between, down } }) => css`
    font-size: 1.125rem;
    color: ${colors.white};
    margin: 1rem 0;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }

    ${between(heightBreakpoints.sm, heightBreakpoints.md, true)} {
      margin: 0.7rem 0;
    }

    ${between(heightBreakpoints.xs, heightBreakpoints.sm, true)} {
      margin: 0.35rem 0;
    }

    ${down(heightBreakpoints.xs, true)} {
      font-size: 1rem;
      margin: 0.1rem 0;
    }
  `,
);

export const Subscription = styled.div(
  ({ theme: { colors, heightBreakpoints, down } }) => css`
    font-size: 0.875rem;
    color: ${colors.white};
    text-align: center;

    ${down(heightBreakpoints.xs, true)} {
      font-size: 0.75rem;
    }
  `,
);
