import styled, { css } from 'styled-components';

export const ProductVariantInfoWrapper = styled.div(
  ({ theme: { colors }, disabled }) => css`
    position: relative;
    padding: 0 2rem 0.5rem;
    border-bottom: 1px solid ${colors.greyCC};
    pointer-events: ${disabled && 'none'};
    color: ${disabled && colors.greyCC};
  `,
);

export const AccordionContent = styled.div`
  font-size: 0.875rem;
`;

export const VariantPropertiesTitle = styled.div`
  margin: 0.5rem 0 0;
`;

export const VariantPropertiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0 0;

  > div {
    width: 30%;
    margin: 0 0.5rem 1rem 0;
  }
`;
