import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  padding: 1.4rem 0.3rem 0.3rem;
`;

export const Title = styled.div`
  font-size: 0.85rem;
  margin: 0 0 1.5rem;
  font-weight: bold;
`;

export const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
`;

export const Col = styled.div(
  ({ width }) => css`
    position: relative;
    width: ${width || '100%'};
  `,
);

export const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 15rem;
  margin-bottom: 1rem;
`;

export const FormActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const ErrorWrapper = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 0.875rem;
    color: ${colors.error};
    padding: 0.3rem 0 0 1rem;
  `,
);

export const RejectionReasonWrapper = styled.div`
  margin-bottom: 2rem;
`;
