import React from 'react';
import { InstrumentCardWrapper, CardTitle, CardDescription } from './styled';

const InstrumentCard = ({ title, description }) => {
  return (
    <InstrumentCardWrapper>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      {/* <CardButton>Перейти</CardButton> https://www.pivotaltracker.com/story/show/181833862 */}
    </InstrumentCardWrapper>
  );
};

export default InstrumentCard;
