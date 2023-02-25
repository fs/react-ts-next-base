import React from 'react';
import Slider from 'components/shared/molecules/Slider';
import {
  NewsWrapper,
  MainCard,
  NewsTopContent,
  MainLabel,
  MainTitle,
  MainText,
  MainDate,
  Delimiter,
  NewsInfo,
  NewsTitle,
  NewsItems,
  ShowAllLink,
  NewsBottomContent,
  BottomItemWrapper,
  NewsItemMark,
  ItemsDelimeter,
} from './styled';

import NewsItem from '../NewsItem';

const News = ({ newsItems, mainCard }) => {
  const { title, content, date } = mainCard;

  return (
    <NewsWrapper>
      <NewsTopContent>
        <MainCard>
          <MainLabel>ГЛАВНАЯ</MainLabel>
          <MainTitle>{title}</MainTitle>
          <MainText>{content}</MainText>
          <div>
            <Delimiter />
            <MainDate>{date}</MainDate>
          </div>
        </MainCard>
        <NewsInfo>
          <NewsTitle>
            Список самых горячих <br /> новостей недели!
          </NewsTitle>
          <Slider>
            {newsItems.map((itemsChunk, chunkIndex) => (
              <NewsItems key={chunkIndex}>
                <ItemsDelimeter />
                {itemsChunk.map((item, itemIndex) => (
                  <NewsItem key={itemIndex} newsItem={item} />
                ))}
              </NewsItems>
            ))}
          </Slider>
          <ShowAllLink>Смотреть все</ShowAllLink>
        </NewsInfo>
      </NewsTopContent>
      <NewsBottomContent>
        {newsItems[0].slice(0, 3).map((item, index) => (
          <BottomItemWrapper key={index}>
            <NewsItemMark>01</NewsItemMark>
            <NewsItem newsItem={item} />
          </BottomItemWrapper>
        ))}
      </NewsBottomContent>
    </NewsWrapper>
  );
};

export default News;
