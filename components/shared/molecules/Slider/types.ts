import { CarouselProps } from 'react-responsive-carousel';
import { TMargin } from 'public/styles/config/margin';
import { TWidth } from 'public/styles/config/width';

export type TSlider = Pick<CarouselProps, 'axis' | 'selectedItem' | 'children'> & TMargin & TWidth;

export type TCarouselWrapper = TMargin & TWidth;
