import styled, { css } from 'styled-components';
import { BUYER, SELLER } from 'config/constants/directions';

export const Title = styled.span`
  font-weight: bold;
  font-size: 0.875rem;
`;

export const InputsTitle = styled.div`
  margin: 1.25rem 0 0.7rem;
  font-size: 0.875rem;
`;

export const FieldLabel = styled.label(
  ({ theme: { colors } }) => css`
    position: absolute;
    top: -0.35rem;
    left: 0.5rem;
    font-size: 0.7rem;
    background-color: ${colors.white};
    color: ${colors.grey};
    padding: 0 0.5rem;
    z-index: 1;
  `,
);

export const ErrorWrapper = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 0.875rem;
    color: ${colors.error};
    padding: 0.3rem 0 0 1rem;
  `,
);

export const CheckboxesTitle = styled.div`
  text-align: left;
  margin: 2.25rem 0 1.5rem;
  font-size: 0.875rem;
`;

export const CheckboxesWrapper = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;
    > div {
      margin: 0 0 0.5rem;
      padding: 0 0 0.5rem;
      border-bottom: 1px solid ${colors.greyC4};
    }
  `,
);

export const Subscription = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.greyA3};
    font-size: 0.875rem;
    margin: 1rem 0 0;
  `,
);

export const ButtonSubmitWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const handleDirectionWrapperColor = (colors, type) => {
  switch (type) {
    case BUYER:
      return `color: ${colors.blue}`;
    case SELLER:
      return `color: ${colors.green}`;
    default:
      return '';
  }
};

export const DirectionWrapper = styled.span(
  ({ theme: { colors }, type }) => css`
    font-weight: 700;
    ${handleDirectionWrapperColor(colors, type)};
  `,
);

export const Separator = styled.span`
  padding: 0 1rem;
  &:before {
    content: '|';
  }
`;
