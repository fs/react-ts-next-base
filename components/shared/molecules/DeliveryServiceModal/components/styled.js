import styled, { css } from 'styled-components';

export const Title = styled.h1`
  font-size: 0.875rem;
  font-weight: bold;
  padding: 1.5rem 2.5rem 1rem;
  margin: 0;
`;

export const TitleAddress = styled(Title)`
  padding: 1.5rem 2.5rem 0;
`;

export const AddressWrapper = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 0.75rem;
    display: flex;
    padding: 1.75rem 2.5rem;
    border-bottom: 1px solid ${colors.greyCC};
  `,
);

export const AddressCol = styled.div`
  width: 45%;

  &:not(:first-child) {
    margin-left: 10%;
  }

  > div:not(:first-child) {
    margin-top: 1rem;
  }
`;

export const ServicesListHeader = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    color: ${colors.greyA3};
    font-size: 0.75rem;
    width: fit-content;
    border-bottom: 1px solid ${colors.greyA3};
    padding: 0.75rem 0 0.75rem 2.5rem;
    margin: 0 0 1rem;
  `,
);

export const ServicesList = styled.div`
  padding: 0 2.5rem 1.5rem;
`;

export const Separator = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    border-bottom: 1px solid ${colors.greyCC};
  `,
);

export const RadioItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0 0.5rem 0.65rem;
`;

export const Col = styled.div(
  ({ disabled }) => css`
    width: ${!disabled && '12rem'};

    &:nth-child(2) {
      width: 9rem;
    }
  `,
);

export const TerminalsList = styled.div`
  padding: 0 2.5rem 1.5rem;
`;

export const DatePickup = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 2.5rem 0;

  > span {
    font-size: 0.75rem;
    margin: 0 1.5rem 0 0;
  }
`;

export const BlockWrapper = styled.div(
  () => css`
    padding: 1rem 2.5rem 0;
  `,
);
export const CitiesWrapper = styled.div(
  () => css`
    font-size: 0.75rem;
    display: flex;
  `,
);

export const CitiesRadioBlock = styled.div(
  () => css`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  `,
);

export const CitiesList = styled.div(
  () => css`
    padding-top: 30px;
    width: 100%;
    column-gap: 1em;
    column-count: 3;
  `,
);

export const CityItem = styled.div(
  () => css`
    min-height: 2em;
    page-break-inside: avoid;
    break-inside: avoid;
  `,
);

export const WarningText = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    font-size: 0.75rem;
    color: ${colors.orange};
    display: flex;
  `,
);

export const CityTitle = styled(Title)`
  padding: 1.5rem 0 1rem;
`;
