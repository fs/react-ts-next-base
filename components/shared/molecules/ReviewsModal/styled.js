import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const TitleWrapper = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${transparentize(0.8, colors.black)};
    padding: 2rem 2rem 0.75rem;
  `,
);

export const Title = styled.b`
  font-size: 0.875rem;
  line-height: 1.06rem;
`;

export const BorderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

export const BlueBorder = styled.div(
  ({ theme: { colors } }) => css`
    width: calc(100% - 4rem);
    position: absolute;
    height: 0.25rem;
    background: ${colors.blue};
    bottom: -2px;
  `,
);

export const ModalBodyWrapper = styled.div`
  padding: 0 2rem;
  overflow-y: scroll;
  height: calc(var(--vh) * 80 - 6.75rem);
`;

export const ReviewsCount = styled.div`
  padding: 1rem 2rem;
  font-size: 0.75rem;
  line-height: 0.875rem;
  opacity: 0.5;
`;
