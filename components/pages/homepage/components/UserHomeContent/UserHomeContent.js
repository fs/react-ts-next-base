import React from 'react';

import LayoutTemplate from 'components/shared/templates/LayoutTemplate';
import Footer from 'components/shared/organisms/Footer';

import Banner from '../Banner';
import TopBar from '../TopBar';
import ProductsSlider from '../ProductsSlider';
import Advantages from '../Advantages';
import Instruments from '../Instruments';
import Companies from '../Companies';
import PopularBrands from '../PopularBrands';
import HighRating from '../Companies/HighRating';
import Blacklist from '../Companies/BlackList';
import Reviews from '../Reviews';

import {
  PageContainer,
  ContentOverflow,
  ContentRow,
  ContentBox,
  ContentWrapper,
  ProductsWrapper,
  SubHeader,
} from './styled';

const UserHomeContent = ({ testId, query, contentRef }) => {
  return (
    <LayoutTemplate testId={testId} contentRef={contentRef} isShowScroll={false}>
      <PageContainer>
        <TopBar query={query} />

        <ContentOverflow>
          <ContentRow>
            <ContentWrapper>
              <Banner />
              <ContentBox>
                <SubHeader>Популярные товары</SubHeader>
                <ProductsWrapper>
                  <ProductsSlider />
                </ProductsWrapper>
              </ContentBox>

              <ContentBox>
                <SubHeader>Отзывы на лучшие товары</SubHeader>
                <Reviews />
              </ContentBox>

              <ContentBox>
                <SubHeader>Рейтинг компаний</SubHeader>
                <Companies>
                  <HighRating />
                </Companies>
              </ContentBox>
              <ContentBox>
                <SubHeader>Черный список</SubHeader>
                <Companies>
                  <Blacklist />
                </Companies>
              </ContentBox>
            </ContentWrapper>
          </ContentRow>

          <ContentRow>
            <Advantages />
          </ContentRow>

          <ContentRow>
            <Instruments />
          </ContentRow>

          <ContentRow>
            <ContentWrapper>
              <PopularBrands />
            </ContentWrapper>
          </ContentRow>

          <Footer />
        </ContentOverflow>
      </PageContainer>
    </LayoutTemplate>
  );
};

export default UserHomeContent;
