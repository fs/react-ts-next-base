import React from 'react';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';

import { productsList } from 'config/constants/productsList';
import {
  MobileInfoWrapper,
  MainLogo,
  Title,
  ProductsList,
  Circle,
  ProductsListItem,
  DesktopBlock,
  IconsWrapper,
} from './styled';

const MobileInfo = () => {
  return (
    <MobileInfoWrapper>
      <div>
        <MainLogo src={`${process.env.ASSET_HOST}/images/main-logo-white.png`} alt="main-logo" />
        <Title>торговая площадка для бизнеса мелким, средним и крупным оптом</Title>
        <ProductsList>
          {productsList.map((product, index) => (
            <ProductsListItem key={index}>
              <Circle />
              {product}
            </ProductsListItem>
          ))}
        </ProductsList>
      </div>
      <div>
        <Button
          label="ИНСТРУКЦИЯ"
          variant="ghost"
          size="large"
          $width="10.5rem"
          target="_blank"
          rel="no-referrer"
          href={`${process.env.ASSET_HOST}/files/instruction.pdf`}
        />
        <DesktopBlock>
          <IconsWrapper>
            <Icon name="tablet" $color="lightGreen" />
            <Icon $ml={11} name="desktop" $color="lightGreen" />
          </IconsWrapper>
          <span>Для просмотра сайта используйте планшет или компьютер.</span>
        </DesktopBlock>
      </div>
    </MobileInfoWrapper>
  );
};

export default MobileInfo;
