import styled, { css } from 'styled-components';

export const ListWrapper = styled.div`
  position: relative;
`;

export const OrdersListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const DeletedOrdersList = styled(OrdersListWrapper)(
  ({ theme: { colors } }) => css`
    margin-top: 1rem;
    padding-bottom: 2.3rem;
    border-bottom: 1px solid ${colors.greyA3};
  `,
);

export const PriceTitle = styled.span(
  ({ theme: { colors } }) => css`
    margin: 0.5rem 0 0;
    padding: 0.5rem 0.875rem 0;
    border-top: 1px solid ${colors.greyCC};
    font-size: 0.75rem;
  `,
);
