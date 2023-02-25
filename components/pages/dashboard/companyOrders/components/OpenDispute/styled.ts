import styled, { css } from 'styled-components';

export const CreateDisputeWrapper = styled.div`
  padding: 1.5rem 0 0;
`;

export const Title = styled.h2`
  font-size: 0.875rem;
  font-weight: bold;
  margin: 0 0 1.5rem;
`;

export const RadioWrapper = styled.div`
  margin: 0 0 1.5rem;
`;

export const RadioLabel = styled.h3`
  font-weight: normal;
  font-size: 0.875rem;
  margin: 0 0 0.75rem;
`;

export const Subtitle = styled.h2(
  ({ theme: { colors } }) => css`
    color: ${colors.blue00};
    font-size: 0.875rem;
    margin: 0 0 1rem;
  `,
);

export const InputTitle = styled.h3(
  ({ theme: { colors } }) => css`
    color: ${colors.greyA3};
    font-size: 0.75rem;
    font-weight: normal;
    margin: 0 0 0.75rem;
  `,
);

export const ReasonFieldWrapper = styled.div`
  max-width: 25rem;
`;

export const CommentFieldWrapper = styled.div`
  width: 100%;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0.5rem 0 0;
`;
