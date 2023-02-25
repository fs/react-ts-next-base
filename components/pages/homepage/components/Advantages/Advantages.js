import React from 'react';

import Slider from 'components/shared/molecules/Slider';
import { PageContainer, AdvantagesList, ContentWrapper, Separator } from './styled';

import SubHeader from './components/SubHeader';
import AdvantageItem from './components/AdvantageItem';

const Advantages = ({ withPager = false }) => {
  const slideItemsAmount = 6;

  // FIXME: mocked data
  const mock = [
    {
      imgSrc: `/images/advantages/advantage-0.png`,
      title: 'БИЗНЕС БЕЗ ПОСРЕДНИКОВ',
      description: 'Взаимодействие напрямую. Всегда низкие цены.',
    },
    {
      imgSrc: `/images/advantages/advantage-1.png`,
      title: 'БЫСТРЫЙ ПОИСК ПАРТНЕРОВ',
      description:
        'Гарантированная проверка каждого участника - Вы быстро найдете новых состоятельных партнеров',
    },
    {
      imgSrc: `/images/advantages/advantage-2.png`,
      title: 'ДОСТОВЕРНЫЙ РЕЙТИНГ КОМПАНИЙ',
      description: 'Надежный инструмент мгновенной проверки партнеров',
    },
    {
      imgSrc: `/images/advantages/advantage-3.png`,
      title: 'МОЩНЫЕ ФИНАНСОВЫЕ ИНСТРУМЕНТЫ',
      description:
        'Впечатляющий выбор и максимальный восторг от возможностей для роста бизнеса. Кредит. Рассрочка. Аккредитивы...',
    },
    {
      imgSrc: `/images/advantages/advantage-4.png`,
      title: 'ГРАМОТНЫЙ ПЕРСОНАЛЬНЫЙ ПОМОЩНИК',
      description:
        'Компетентный эксперт индивидуально подберет лучшее бизнес-решение, поможет на каждом этапе сделки',
    },
    {
      imgSrc: `/images/advantages/advantage-5.png`,
      title: 'УВЕРЕННАЯ ЗАЩИТА ДАННЫХ',
      description:
        'Современная система шифрования данных на базе проверенных и надежных алгоритмов',
    },
    {
      imgSrc: `/images/advantages/advantage-6.png`,
      title: 'УДОБНАЯ БРАУЗЕРНАЯ ВЕРСИЯ',
      description: 'Работа прямо в браузере. Без установки и скачивания программ',
    },
    {
      imgSrc: `/images/advantages/advantage-7.png`,
      title: 'АБСОЛЮТНАЯ ГАРАНТИЯ И БЕЗОПАСНОСТЬ',
      description:
        'Каждая сделка в Medagregator совершается со 100% выполнением всех условий участников',
    },
    {
      imgSrc: `/images/advantages/advantage-8.png`,
      title: 'ПУНКТУАЛЬНАЯ ЭКСПРЕСС ЛОГИСТИКА',
      description:
        'Новейшие технологии в отслеживании грузов. Облегченное оформление доставки, продуманная система управления',
    },
    {
      imgSrc: `/images/advantages/advantage-9.png`,
      title: 'ВЫСОКИЙ СПРОС И ПРЕДЛОЖЕНИЕ',
      description:
        'Мгновенная скорость охвата новых каналов сбыта и широчайшие просторы для вашего бизнеса',
    },
    {
      imgSrc: `/images/advantages/advantage-10.png`,
      title: 'УНИКАЛЬНАЯ СРАВНИТЕЛЬНАЯ АНАЛИТИКА',
      description:
        'Анализ медицинского рынка – наглядность цен и ассортимента, динамичный прогноз изменений спроса и предложения',
    },
    {
      imgSrc: `/images/advantages/advantage-11.png`,
      title: 'МАКСИМАЛЬНАЯ ГАРАНТИЯ И БЕЗОПАСНОСТЬ',
      description:
        'Современная система шифрования данных на базе проверенных и надежных алгоритмов',
    },
  ];

  const advantages = [];
  for (let i = 0; i < 12; i += 1) {
    advantages.push(mock[i]);
  }

  const slides = [];
  for (let i = 0; i < advantages.length; i += slideItemsAmount) {
    slides.push(
      <AdvantagesList key={i} withPager={withPager}>
        <Separator withPager={withPager} />
        <ContentWrapper>
          {advantages.slice(i, i + slideItemsAmount).map((advantage, j) => {
            return <AdvantageItem key={j} advantageInfo={advantage} />;
          })}
        </ContentWrapper>
      </AdvantagesList>,
    );
  }

  return (
    <PageContainer>
      <SubHeader />
      <Slider $mb={16}>{slides}</Slider>
    </PageContainer>
  );
};

export default Advantages;
