import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const CompaniesListWrapper = styled.div`
  position: relative;
  padding: 2.5rem 0.8rem 1.2rem;
`;

export const Title = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.85rem;
  margin: 0 0 1rem 1.5rem;
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const CreateCompanyButtonWrapper = styled.div(
  ({ theme: { colors } }) => css`
    margin: 1.8rem 0 0 1.8rem;

    > a {
      height: 100%;
      min-height: 26rem;
      flex-direction: column;
      box-shadow: 0 0 1rem ${transparentize(0.7, colors.shadow)};
    }
  `,
);

export const ButtonText = styled.div`
  text-align: center;
  margin: 1rem 0 0;
  font-weight: normal;
`;
