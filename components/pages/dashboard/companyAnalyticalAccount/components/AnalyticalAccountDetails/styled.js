import styled, { css } from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    padding: 2rem 3rem;
    border-bottom: 1px solid ${colors.greyCC};
    position: relative;
  `,
);

export const Header = styled.div(
  ({ theme: { colors } }) => css`
    border-bottom: 1px solid ${colors.greyCC};
    margin: 0 0 0.625rem;
    padding: 0 0 0.625rem;
  `,
);

export const Title = styled.h2`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  margin: 0 0 0.75rem;
`;

export const QuestionWrapper = styled.div`
  position: relative;
  font-size: 0.875rem;
  margin-left: 0.6rem;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 2rem;
  justify-content: end;
`;

export const Code = styled.span`
  font-size: 0.875rem;
  white-space: nowrap;
`;

export const AccountAmount = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  margin: 0.75rem 0 0;
`;

const Amount = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-left: 0.5rem;
  white-space: nowrap;
`;

export const Deal = styled(Amount)(
  ({ theme: { colors } }) => css`
    color: ${colors.greyA3};
  `,
);

export const Balance = styled(Amount)(
  ({ theme: { colors } }) => css`
    color: ${colors.orange};
  `,
);

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 0 0.5rem;
`;

export const Subtitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: normal;
  margin: 0 0 1rem;
`;
