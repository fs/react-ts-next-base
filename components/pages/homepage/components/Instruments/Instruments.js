import React from 'react';

import { COMPANIES_RATING, CATALOG } from 'config/routes';

import Icon from 'components/shared/atoms/Icon';

import { PageContainer, ContentWrapper, Title, InstrumentsList, SectionList } from './styled';

import InstrumentCard from './components/IinstrumentCard';
import SectionItem from './components/SectionItem';

const Instruments = () => {
  const mockInstruments = [
    {
      id: '1',
      title: 'МГНОВЕНОЕ ЗАКЛЮЧЕНИЕ СДЕЛКИ',
      description:
        'Мы максимально упростили и эффективно автоматизировали все ' +
        'привычные этапы сделки. Все просто, как РАЗ ДВА ТРИ',
    },
    {
      id: '2',
      title: 'ПРИВЛЕКАТЕЛЬНЫЕ АУКЦИОНЫ И ТЕНДЕРЫ',
      description:
        'Разнообразные выгодные аукционы и тендеры в одном месте – выгодно, доступно и для малого бизнеса',
    },
    {
      id: '3',
      title: 'ЭКОНОМНАЯ СОВМЕСТНАЯ ПОКУПКА',
      description:
        'Все очень просто, находите нужный товар, присоединяетесь к совместной покупке и получаете огромные скидки',
    },
    {
      id: '4',
      title: 'ОГРОМНЫЙ ВТОРИЧНЫЙ РЫНОК',
      description:
        'Большой выбор бывших в употреблении медицинских товаров. Огромная экономия для начинающего бизнеса',
    },
  ];

  const mockSections = [
    {
      id: '1',
      icon: <Icon name="basket" $color="blue" />,
      title: 'Каталог',
      route: CATALOG,
    },
    {
      id: '2',
      icon: <Icon name="medicine" $color="blue" />,
      title: 'Медицинские услуги',
    },
    {
      id: '3',
      icon: <Icon name="megaphone" $color="blue" />,
      title: 'Отзывы и предложения',
    },
    {
      id: '4',
      icon: <Icon name="analytics" $color="blue" />,
      title: 'Аналитика рынка',
    },
    {
      id: '5',
      icon: <Icon name="star-dashed" $color="blue" />,
      title: 'Рейтинг компаний',
      route: COMPANIES_RATING,
    },
    {
      id: '6',
      icon: <Icon name="microphone" $color="blue" />,
      title: 'Выставки, конференции',
    },
    {
      id: '7',
      icon: <Icon name="news" $color="blue" />,
      title: 'Новости',
    },
    {
      id: '8',
      icon: <Icon name="hammer" $color="blue" />,
      title: 'Законодательство',
    },
  ];

  return (
    <PageContainer>
      <ContentWrapper>
        <Title>4 ИНСТРУМЕНТА К ВЕРШИНЕ ВАШЕГО УСПЕХА</Title>
        <InstrumentsList>
          {mockInstruments.map(({ id, title, description }) => (
            <InstrumentCard title={title} description={description} key={id} />
          ))}
        </InstrumentsList>
        <Title>ВСЕ РАЗДЕЛЫ</Title>
        <SectionList>
          {mockSections.map(section => (
            <SectionItem section={section} key={section.id} />
          ))}
        </SectionList>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Instruments;
