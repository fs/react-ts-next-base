import styled, { css } from 'styled-components';

import { TView } from 'public/styles/config/view';

export const CompanyButtonsWrapper = styled.div<TView>(
  ({ view }) => css`
    display: flex;
    justify-content: space-between;
    padding: ${view === 'tile' ? '0 0.875rem 0.875rem 0.875rem' : '0'};
    gap: 0.375rem;
  `,
);

export const CatalogButtonsWrapper = styled.div<TView>(
  ({ view }) => css`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    padding: ${view === 'tile' ? '0 0.875rem 0.875rem 0.875rem' : '0'};
    gap: 0.375rem;
  `,
);
