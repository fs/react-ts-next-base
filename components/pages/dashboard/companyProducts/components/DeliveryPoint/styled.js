import styled, { css } from 'styled-components';

export const DeliveryPointWrapper = styled.div`
  font-size: 0.875rem;
  margin: 0 0 1.5rem;
`;

export const DeliveryPointTitle = styled.div`
  font-weight: bold;
  margin: 0 0 0.5rem;
`;

export const Link = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 0.875rem;
    color: ${colors.blue};
    cursor: pointer;
    width: fit-content;
    margin: 0.5rem 0 0;

    &:hover {
      text-decoration: underline;
    }
  `,
);

export const FormContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  min-height: 17rem;
`;

export const Warning = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.grey};
    font-size: 0.875rem;
    display: flex;
  `,
);

export const DeliveryPointsList = styled.div`
  padding: 1.5rem 0 0;

  > div {
    row-gap: 1.5rem;
  }
`;

export const WorkDays = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0.3rem 0 0;
`;

export const RadioItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0 0.5rem 0.5rem;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0 0;
`;
