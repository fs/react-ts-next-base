import styled, { css } from 'styled-components';

export const ProposalComment = styled.div`
  max-width: 31rem;
`;

export const InputTitle = styled.h3(
  ({ theme: { colors } }) => css`
    color: ${colors.greyA3};
    font-size: 0.75rem;
    font-weight: normal;
    margin: 0 0 0.75rem;
  `,
);

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0.5rem 0 0;
`;
