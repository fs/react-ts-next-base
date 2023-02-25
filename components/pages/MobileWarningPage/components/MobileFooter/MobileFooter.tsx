import React from 'react';

import { MobileFooterWrapper, UnavailableImage, TextWrapper } from './styled';

const MobileFooter = () => {
  return (
    <MobileFooterWrapper>
      <UnavailableImage
        alt="unavailable-page"
        src={`${process.env.ASSET_HOST}/images/mobile-page.svg`}
      />
      <TextWrapper>
        <div>Мобильная версия сайта в разработке.</div>
      </TextWrapper>
    </MobileFooterWrapper>
  );
};

export default MobileFooter;
