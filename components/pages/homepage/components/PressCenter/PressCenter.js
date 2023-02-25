import React, { useState } from 'react';
import Tabs from 'components/shared/molecules/Tabs';
import News from './components/News';
import {
  PageTitleWrapper,
  PageContainer,
  Title,
  ContentTitleWrapper,
  ContentWrapper,
  TabsWrapper,
} from './styled';

const mockedNewsItem = {
  title: 'В Таиланде выявили шесть новых случаев заражения коронавирусом',
  content:
    'В Таиланде зафиксировали шесть новых случаев заражения коронавирусом, передает РИА Новости со ссылкой на главу центра...',
  date: '22 мая 2019',
};

const mockedMainCard = {
  title: 'Влияние питания на развитие рака становится все более существенным',
  content:
    'Журнал JNCI Cancer Spectrum опубликовал доводы специалистов из Университета Тафтса в Бостоне о том, что питание современных людей становится все более существенным фактором влияния на возможное развитие рака, в частности, рака кишечника',
  date: '23 мая 2019',
};

const config = {
  news: 'news',
  shows: 'shows',
  conferences: 'conferences',
  laws: 'laws',
};

const newsItems = [
  [mockedNewsItem, mockedNewsItem, mockedNewsItem, mockedNewsItem, mockedNewsItem, mockedNewsItem],
  [mockedNewsItem, mockedNewsItem, mockedNewsItem, mockedNewsItem, mockedNewsItem, mockedNewsItem],
];

const PressCenter = () => {
  const [currentTab, setCurrentTab] = useState(config.news);

  const TABS = [
    {
      id: config.news,
      name: 'Новости',
      content: <News newsItems={newsItems} mainCard={mockedMainCard} />,
      action: () => setCurrentTab(config.news),
    },
    {
      id: config.shows,
      name: 'Выставки',
      content: <></>,
      action: () => setCurrentTab(config.shows),
    },
    {
      id: config.conferences,
      name: 'Коференции',
      content: <></>,
      action: () => setCurrentTab(config.conferences),
    },
    {
      id: config.laws,
      name: 'Новые принятые законы',
      content: <></>,
      action: () => setCurrentTab(config.laws),
    },
  ];

  return (
    <PageContainer>
      <PageTitleWrapper>
        <ContentTitleWrapper>
          <Title>Пресс центр</Title>
        </ContentTitleWrapper>
      </PageTitleWrapper>
      <ContentWrapper>
        <TabsWrapper>
          <Tabs tabs={TABS} activeId={currentTab} variant="link_like" withTransition />
        </TabsWrapper>
      </ContentWrapper>
    </PageContainer>
  );
};

export default PressCenter;
