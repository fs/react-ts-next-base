import React from 'react';
import { NewsItemContent, NewsItemDate, NewsItemTitle } from './styled';

const NewsItem = ({ newsItem }) => {
  const { title, content, date } = newsItem;

  return (
    <div>
      <NewsItemTitle>{title}</NewsItemTitle>
      <NewsItemContent>{content}</NewsItemContent>
      <NewsItemDate>{date}</NewsItemDate>
    </div>
  );
};

export default NewsItem;
