import React from 'react';

import {
  AdvantagesWrapper,
  Row,
  Advantage,
  Number,
  Text,
  AdvantageIcon,
  AdvantageContent,
} from './styled';

const Advantages = () => {
  const advantagesNumerical = [
    'Легкий выход на новые рынки',
    'Выгодные аукционы и тендеры по всей России',
    'Снижение издержек на персонал',
  ];
  const advantages = [
    { label: '100%', text: 'Надежность и гарантия выполнения условий' },
    { label: '3 клика', text: 'Легкий поиск, быстрое согласование, оплата и товар у вас' },
    { label: 'от 20%', text: 'Повышение дохода за счет прямых контрактов' },
  ];

  return (
    <AdvantagesWrapper>
      <Row>
        {advantagesNumerical.map((advantage, i) => {
          return (
            <Advantage key={i}>
              <Number>{i + 1}</Number>
              <Text>{advantage}</Text>
            </Advantage>
          );
        })}
      </Row>
      <Row>
        {advantages.map(({ label, text }, i) => {
          return (
            <Advantage key={i}>
              <AdvantageIcon
                alt="advantage"
                src={`${process.env.ASSET_HOST}/images/advantages-about-us/advantage-${i}.png`}
              />
              <AdvantageContent>
                <strong>{label}</strong>
                <span>{text}</span>
              </AdvantageContent>
            </Advantage>
          );
        })}
      </Row>
    </AdvantagesWrapper>
  );
};

export default Advantages;
