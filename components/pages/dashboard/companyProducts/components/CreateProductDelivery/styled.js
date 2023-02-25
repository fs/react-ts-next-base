import styled, { css } from 'styled-components';

export const Description = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 0.75rem;
    color: ${colors.grey};
    margin: -1.5rem 0 0;
  `,
);

export const DellinFreightTypesWrapper = styled.div`
  width: 65%;
  margin: 1.675rem 0 0;
`;

export const RadioShipmentMethodsWrapper = styled.div(
  ({ theme: { colors } }) => css`
    margin: 1.25rem 0 1.5rem;
    padding: 0 0 1.5rem;
    border-bottom: 1px solid ${colors.greyCC};

    > div {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(28%, 1fr));
    }
  `,
);

export const RadioCourierWrapper = styled.div`
  > div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(28%, 1fr));
  }
`;

export const DescriptionDeliveryCondition = styled(Description)`
  &&& {
    margin: 1.5rem 0 1rem;
  }
`;

export const FieldWrapper = styled.div(
  ({ minWidth, maxWidth, margin }) => css`
    margin: ${margin || '0'};
    min-width: ${minWidth || 'auto'};
    max-width: ${maxWidth || '100%'};
  `,
);

export const Subtitle = styled.div(
  ({ margin }) => css`
    font-size: 0.875rem;
    font-weight: bold;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    ${margin ? `margin: ${margin}` : ''}
  `,
);

export const DescriptionInsurance = styled(Description)`
  &&& {
    margin: 0 0 0.75rem;
  }
`;

export const AriaWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  height: auto;
`;

export const HazardClassesWrapper = styled.div`
  height: 2.4rem;
  display: flex;
  align-items: center;
`;

export const PackagingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.3rem;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CommentWrapper = styled.div`
  margin-top: 1.6rem;
`;

export const Row = styled.div`
  display: flex;
  margin: 2rem auto -0.5rem auto;
`;
