import React from 'react';

import Fieldset from 'components/shared/atoms/Fieldset';

import { SectionHeader, SectionWrapper } from '../styled';

const Comment = ({ rejectionMessage }) => {
  return (
    <SectionWrapper>
      <SectionHeader>Комментарий</SectionHeader>
      <Fieldset legend="Оставленный комментарий" $width="100%">
        {rejectionMessage}
      </Fieldset>
    </SectionWrapper>
  );
};

export default Comment;
