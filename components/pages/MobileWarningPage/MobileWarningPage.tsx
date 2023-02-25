import React from 'react';

import MobileFooter from './components/MobileFooter';
import MobileInfo from './components/MobileInfo';

import { MobileWarningPageWrapper } from './styled';

const MobileWarningPage = () => {
  return (
    <MobileWarningPageWrapper>
      <MobileInfo />
      <MobileFooter />
    </MobileWarningPageWrapper>
  );
};

export default MobileWarningPage;
