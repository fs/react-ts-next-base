import React from 'react';
import { Message, Wrapper, Image } from './styled';

const EmptyMessage = ({ title, description, showImage = true }) => {
  return (
    <Wrapper>
      {showImage && <Image src={`${process.env.ASSET_HOST}/images/empty-products.png`} />}
      <Message>
        <h3 data-testid="empty-message-title">{title}</h3>
        <p>{description}</p>
      </Message>
    </Wrapper>
  );
};

export default EmptyMessage;
