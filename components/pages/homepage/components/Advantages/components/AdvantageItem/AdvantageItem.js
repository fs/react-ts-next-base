import React from 'react';
import {
  AdvantageWrapper,
  ImageContainer,
  Image,
  AdvantageTitle,
  AdvantageDescription,
  // AdvantageButton, // https://www.pivotaltracker.com/story/show/181833862
} from './styled';

const AdvantageItem = ({ advantageInfo }) => {
  const { imgSrc, title, description } = advantageInfo;
  return (
    <AdvantageWrapper>
      <div>
        <ImageContainer>
          <Image title="advantage" src={imgSrc} />
        </ImageContainer>
        <AdvantageTitle>{title}</AdvantageTitle>
        <AdvantageDescription>{description}</AdvantageDescription>
      </div>
      {/* <AdvantageButton>Подробнее</AdvantageButton> https://www.pivotaltracker.com/story/show/181833862 */}
    </AdvantageWrapper>
  );
};

export default AdvantageItem;
