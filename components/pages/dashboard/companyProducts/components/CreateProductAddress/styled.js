import styled, { css } from 'styled-components';

export const FieldContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 0 0 1.375rem;
`;

export const Subtitle = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  padding: 0 0 0.75rem;
  white-space: nowrap;
`;

export const Row = styled.div`
  display: flex;
  margin: 0 0 1rem;
`;

export const PropertiesList = styled.div`
  margin-left: 2rem;
  font-size: 0.875rem;
`;

export const PropertiesListItem = styled.span`
  span {
    white-space: nowrap;
  }
`;

export const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 15rem;
  margin: 1.25rem 0;
`;

export const FieldWrapper = styled.div(
  ({ width, isHidden }) => css`
    display: ${isHidden ? 'none' : 'block'};
    width: ${width || '100%'};
  `,
);

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
