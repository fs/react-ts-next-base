import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const Wrapper = styled.div`
  padding: 1rem;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 15rem;
  margin-left: -1rem;
`;

export const RatingPageTitle = styled.h3(
  ({ theme: { colors } }) => css`
    font-weight: bold;
    font-size: 0.875rem;
    padding-left: 2.7rem;
    color: ${colors.blue00};
  `,
);

export const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3.375rem;
`;

export const BoldText = styled.b`
  margin-right: 0.5rem;
  font-size: 0.875rem;
`;

export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Text = styled.p`
  font-size: 0.875rem;
  padding: 1.5rem 0 1.25rem 2.7rem;
`;

export const SyllableCountText = styled.p`
  font-size: 0.875rem;
`;

export const InfoWrapper = styled.div`
  display: flex;
  padding: 1.4rem 0 0 2.7rem;
`;

export const Line = styled.span(
  ({ theme: { colors } }) => css`
    width: 100%;
    display: flex;
    border: 0.5px solid ${transparentize(0.8, colors.black)};
  `,
);

export const SelectWrapper = styled.div`
  width: 25rem;
  padding: 0 0 1.75rem 2.7rem;
`;
