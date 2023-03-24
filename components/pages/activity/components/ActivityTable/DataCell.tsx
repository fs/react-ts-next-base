import React, { FC, ReactNode } from 'react';

import { StyledCell, Wrap } from './styled';

const DataCell: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <StyledCell>
      <Wrap>{children}</Wrap>
    </StyledCell>
  );
};

export default DataCell;
