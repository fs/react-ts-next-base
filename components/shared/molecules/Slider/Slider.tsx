import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { TSlider } from './types';
import { CarouselWrapper } from './styled';

const Slider: React.FunctionComponent<TSlider> = ({
  children,
  selectedItem = 0,
  $width = '100%',
  ...props
}) => {
  return (
    <CarouselWrapper $width={$width} {...props}>
      <Carousel
        axis="horizontal"
        selectedItem={selectedItem}
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        transitionTime={1000}
        autoPlay={false}
      >
        {children}
      </Carousel>
    </CarouselWrapper>
  );
};

export default Slider;
