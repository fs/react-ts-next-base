import styled, { css } from 'styled-components';

export const EmptyListWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex: 100;
`;

export const EmptyListMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 27.3rem;
  margin: 1rem 0;
  padding: 0 0.63rem;
`;

export const EmptyListMessageTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 1.5rem;
  line-height: 1.813rem;
`;

export const EmptyListMessageDescription = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.188rem;
  margin-top: 1rem;
  text-align: center;
`;

export const EmptyListMessageImage = styled.img`
  margin-top: 2.125rem;
  max-width: 27.313rem;
  width: 100%;
`;

export const AddProductMessageWrapper = styled(EmptyListMessageWrapper)`
  max-width: 27.7rem;
  margin-top: 0;
`;

export const AddProductMessageDescription = styled(EmptyListMessageDescription)`
  margin-top: 1.7rem;
  margin-bottom: 1.5rem;
`;

export const AddProductMessageImage = styled.img(
  ({ theme: { heightBreakpoints, down, between } }) => css`
    margin-top: 7.8rem;
    margin-bottom: 3.2rem;
    max-width: 18.62rem;
    width: 100%;

    ${between(heightBreakpoints.sm, heightBreakpoints.md, true)} {
      margin-top: 4.8rem;
    }

    ${between(heightBreakpoints.xs, heightBreakpoints.sm, true)} {
      margin-top: 2rem;
      margin-bottom: 1.5rem;
    }

    ${down(heightBreakpoints.xs, true)} {
      margin-top: 1.5rem;
      margin-bottom: 1rem;
    }
  `,
);
