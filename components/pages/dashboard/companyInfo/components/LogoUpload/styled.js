import styled, { css } from 'styled-components';

export const AddLogoCompanyWrapper = styled.div`
  position: relative;
  display: flex;
  width: fit-content;
  align-items: center;

  > span {
    width: min-content;
    margin-right: 1rem;
  }
`;

export const LogoWrapper = styled.div`
  position: relative;
  width: 4.5rem;
  height: 4.5rem;
  margin: 0 1rem;
`;

export const ErrorWrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    width: 100%;
    bottom: -1rem;
    font-size: 0.68rem;
    color: ${colors.error};
    white-space: nowrap;
    padding: 0.15rem 0 0 0.5rem;
  `,
);
