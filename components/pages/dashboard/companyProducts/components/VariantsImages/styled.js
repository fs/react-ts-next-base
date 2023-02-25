import styled, { css } from 'styled-components';

export const VariantsWrapper = styled.div`
  margin: 1.8rem 0 1rem;
`;

export const VariantWrapper = styled.div(
  ({ theme: { colors } }) => css`
    margin: 1.2rem 0;

    &::after {
      display: block;
      content: '';
      height: 0.01rem;
      width: 100%;
      background-color: ${colors.greyC4};
      margin-top: 1.2rem;
    }

    &:last-child::after {
      display: none;
    }
  `,
);

export const Row = styled.div`
  display: flex;
`;

export const VariantTitle = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  margin-right: 1.25rem;
  white-space: nowrap;
`;

export const PropertiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const PropertiesListItem = styled.span`
  font-size: 0.875rem;
  white-space: nowrap;
`;

export const Wrapper = styled.div`
  margin: 1rem 0;
`;

export const Title = styled.div`
  font-size: 0.875rem;
`;

export const AddImageButtonWrapper = styled.div`
  margin-right: 0.7rem;
`;

export const VariantImagesWrapper = styled.div`
  display: flex;
  margin: 0.75rem 0 0;
`;

export const ErrorWrapper = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 0.875rem;
    color: ${colors.error};
    margin: 0.5rem 0;
  `,
);
