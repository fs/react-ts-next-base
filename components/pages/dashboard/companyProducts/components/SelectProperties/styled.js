import styled, { css } from 'styled-components';

export const Subtitle = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin: 1.25rem 0 0;
`;

export const Wrapper = styled.div`
  margin-bottom: 2rem;
`;

export const Description = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.grey};
    font-size: 0.75rem;
    margin-left: 1.35rem;
  `,
);

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 20rem;
`;

export const ModalTitle = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.blue00};
    font-weight: bold;
    margin: 0 0 2.5rem;
  `,
);

export const ModalHelperTextWrapper = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.grey};
    font-size: 0.75rem;
    line-height: 15px;
    font-weight: 700;
    margin: 0 0 0.5rem;
  `,
);

export const SelectedPropertiesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1.25rem 0;
`;

export const NoSelectedProperties = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.greyA3};
    font-size: 0.875rem;
    margin-top: 0.75rem;
  `,
);

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
