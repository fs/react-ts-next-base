import React from 'react';
import { Image, Message, Wrapper, InnerWrapper } from './styled';

const EmptyMessageCheckingCompany = () => {
  return (
    <Wrapper data-testid="empty-message-checking-company">
      <InnerWrapper>
        <Image src={`${process.env.ASSET_HOST}/images/checking-company-image.png`} />
        <Message>
          <p>Эта страница будет вам доступна после того, как компания пройдет проверку.</p>
        </Message>
      </InnerWrapper>
    </Wrapper>
  );
};

export default EmptyMessageCheckingCompany;
