import React from 'react';

import { ChildrenWrapper, FieldsetWrapper, Legend } from './styled';
import { TFieldset } from './types';

const Fieldset: React.FC<TFieldset> = ({ legend, children, $width = 'auto' }) => {
  return (
    <FieldsetWrapper $width={$width}>
      <Legend>{legend}</Legend>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </FieldsetWrapper>
  );
};

export default Fieldset;
