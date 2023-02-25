import styled, { css } from 'styled-components';

export const AdvantagesWrapper = styled.div`
  position: relative;
  padding: 0 0 2rem;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 5rem;
`;

export const Advantage = styled.div`
  display: flex;
  width: 30%;

  &:nth-child(1) {
    width: 23%;
  }

  &:nth-child(2) {
    width: 35%;
  }
`;

export const Number = styled.span(
  ({ theme: { colors } }) => css`
    color: ${colors.lightGreen};
    font-size: 4rem;
    font-weight: bold;
    line-height: 3rem;
    margin-right: 1.375rem;
  `,
);

export const Text = styled.strong`
  font-size: 1.125rem;
`;

export const AdvantageIcon = styled.img`
  height: fit-content;
  margin-right: 1.375rem;
`;

export const AdvantageContent = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    font-size: 1.5rem;
  }

  span {
    font-size: 0.875rem;
  }
`;
