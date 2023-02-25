import React, { useEffect, useState } from 'react';

import throttle from 'lodash/debounce';
import LayoutTemplate from 'components/shared/templates/LayoutTemplate';
import Footer from 'components/shared/organisms/Footer';

import Promo from '../Promo';
import Actions from '../Actions';
import Products from '../Products';
import Advantages from '../Advantages';
import Companies from '../Companies';
// import Instruments from '../Instruments'; https://www.pivotaltracker.com/story/show/182026122
// import PressCenter from '../PressCenter'; https://www.pivotaltracker.com/story/show/181833862

import HighRating from '../Companies/HighRating';
import Blacklist from '../Companies/BlackList';

import { SliderWrapper, SliderChild, ContentBox, Brands } from './styled';
import PopularBrands from '../PopularBrands';

const slides = [
  <Promo />,
  <Products />,
  <Advantages withPager />,
  <Actions />,
  <ContentBox>
    <Companies title="Рейтинг компаний">
      <HighRating />
    </Companies>
  </ContentBox>,
  <ContentBox>
    <Companies title="Черный список">
      <Blacklist />
    </Companies>
  </ContentBox>,
  <ContentBox>
    <Brands>
      <PopularBrands />
    </Brands>
  </ContentBox>,
  // <PressCenter />, https://www.pivotaltracker.com/story/show/181833862
];

const VisitorHomeContent = ({ isLight = false, testId, contentRef }) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(1);
  const [scrollY, setScrollY] = useState(0);

  const changeCurrentItem = throttle(() => {
    const newValue = scrollY < 250 ? 1 : 0;
    if (currentItemIndex !== newValue) {
      setCurrentItemIndex(newValue);
    }
  }, 10);

  const scrollHandler = () => {
    setScrollY(contentRef.current?.scrollTop);
  };

  const subscribeScroll = () => window.addEventListener('scroll', scrollHandler, true);
  const unsubscribeScroll = () => window.removeEventListener('scroll', scrollHandler, true);

  useEffect(() => {
    subscribeScroll();
    return () => unsubscribeScroll();
  }, []);

  useEffect(() => {
    changeCurrentItem();
  }, [scrollY]);

  return (
    <LayoutTemplate
      variant={isLight || currentItemIndex !== 1 ? 'light' : 'transparent'}
      testId={testId}
      contentRef={contentRef}
      isShowScroll={false}
    >
      <SliderWrapper>
        {slides.map((slide, i) => (
          <SliderChild key={i} id={`section-${i}`}>
            {slide}
          </SliderChild>
        ))}
        <Footer />
      </SliderWrapper>
    </LayoutTemplate>
  );
};

export default VisitorHomeContent;
