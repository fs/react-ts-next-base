import React from 'react';

import {
  PageWrapper,
  PageMessageWrapper,
  PageMessageImage,
  PageMessageTitle,
  PageMessageDescription,
} from './styled';

const NotSupportedPage = () => {
  return (
    <PageWrapper>
      <PageMessageWrapper>
        <PageMessageTitle>Ой!</PageMessageTitle>
        <PageMessageDescription>
          Наш сайт не поддерживает Internet Explorer <br />
          Для просмотра сайта перейдите в другой браузер
        </PageMessageDescription>
        <PageMessageImage
          alt="not_supported_browser"
          src={`${process.env.ASSET_HOST}/images/not_supported.png`}
        />
      </PageMessageWrapper>
    </PageWrapper>
  );
};

export default NotSupportedPage;
