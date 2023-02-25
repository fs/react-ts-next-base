import React, { useState } from 'react';

import {
  Wrapper,
  Slider,
  Slide,
  ImageWrapper,
  TextWrapper,
  Title,
  Text,
  PointsWrapper,
  Point,
  Link,
} from './styled';

const slides = [
  {
    image: 'success',
    title: 'Поздравляем, вы успешно зарегистрировались!',
    text: (
      <span>
        Перед совершением сделок рекомендуем внимательно ознакомиться с Агентским договором,
        правилами Medagregator и Соглашением оказания транзакционных услуг. Ознакомиться с
        документами можно <Link>ЗДЕСЬ</Link>. Удачи в продажах и покупках!
      </span>
    ),
  },
  {
    image: 'buying',
    title: 'Покупка товаров',
    text: (
      <span>
        Вы можете приступить к покупке товаров. Для этого перейдите в КАТАЛОГ ТОВАРОВ, добавьте
        понравившийся вам товар в корзину, далее оформите сделку. Все просто - как раз, два, три!
        Ознакомиться с Порядком совершения сделок можно <Link>ЗДЕСЬ</Link>.
      </span>
    ),
  },
  {
    image: 'confidants',
    title: 'Регистрация Доверенных лиц',
    text: 'Вы можете добавить дополнительных пользователей в качестве Доверенных лиц, чтобы они могли вести дела от одной или нескольких ваших компаний. Нажмите при регистрации на кнопку «Добавить пользователя»',
  },
  {
    image: 'buyer-seller',
    title: 'Покупатель и Продавец',
    text: (
      <span>
        Вы можете быть одновременно и Продавцом, и Покупателем. Просто отметьте свою компанию и
        Продавцом, и Покупателем. Продавай и покупай на Medagregator! Ознакомьтесь с правилами
        регистрации <Link>ЗДЕСЬ</Link>
      </span>
    ),
  },
];

const TutorialModal = () => {
  const [slideTutorial, setSlideTutorial] = useState(0);

  return (
    <Wrapper data-cy="company-tutorial" data-testid="company-tutorial">
      <Slider style={{ transform: `translateX(-${slideTutorial * 35}rem)` }}>
        {slides.map(({ image, title, text }, index) => {
          return (
            <Slide key={index}>
              <ImageWrapper
                onClick={() => setSlideTutorial(slideTutorial === 3 ? 0 : slideTutorial + 1)}
              >
                <img alt={image} src={`${process.env.ASSET_HOST}/images/tutorial/${image}.png`} />
              </ImageWrapper>
              <TextWrapper>
                <Title>{title}</Title>
                <Text>{text}</Text>
              </TextWrapper>
            </Slide>
          );
        })}
      </Slider>
      <PointsWrapper>
        {slides.map((_, i) => {
          return (
            <Point current={i === slideTutorial} onClick={() => setSlideTutorial(i)} key={i} />
          );
        })}
      </PointsWrapper>
    </Wrapper>
  );
};

export default TutorialModal;
