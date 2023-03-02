import React, { ReactNode } from 'react';

import { StyledCell, Wrap } from './styled';

const DataCell: React.FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return (
    <StyledCell>
      <Wrap>{children}</Wrap>
    </StyledCell>
  );
};

export default DataCell;
