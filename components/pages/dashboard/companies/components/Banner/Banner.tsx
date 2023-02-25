import React from 'react';
import { Wrapper, Description, Content, Image, Title } from './styled';
import { TBanner } from './types';

const Banner = ({ direction }: TBanner) => {
  const company = direction === 'SELLER' ? 'продавца' : 'покупателя';
  return (
    <Wrapper>
      <Content>
        <Title>{`Заполните данные компании ${company}`}</Title>
        <div>
          <Description>Мы бережем ваше время! </Description>
          <Description>
            Введите ИНН компании, чтобы автоматически заполнить часть формы.
          </Description>
        </div>
      </Content>

      <Image src={`${process.env.ASSET_HOST}/images/create-company-image.png`} />
    </Wrapper>
  );
};

export default Banner;
