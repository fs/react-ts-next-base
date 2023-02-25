import React from 'react';
import Logo from 'components/shared/atoms/Logo';

import { Container, Subtitle, Title } from './styled';

const Banner = () => {
  return (
    <Container>
      <Logo isLight />
      <Title>ТОРГОВАЯ ПЛОЩАДКА ДЛЯ БИЗНЕСА МЕЛКИМ, СРЕДНИМ И КРУПНЫМ ОПТОМ</Title>
      <Subtitle>Цены всегда актуальные и низкие</Subtitle>
      <Subtitle>Товары всегда качественные и в наличии</Subtitle>
      <Subtitle>Покупка всегда в 3 клика с доставкой</Subtitle>
    </Container>
  );
};

export default Banner;
