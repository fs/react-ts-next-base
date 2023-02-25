import React from 'react';

import {
  NoteWrapper,
  InfoDescription,
  PriceDescription,
  DescriptionWrapper,
  Image,
  Sentence,
  WrapSentences,
} from './styled';

const Note = () => {
  return (
    <NoteWrapper>
      <DescriptionWrapper>
        <InfoDescription>
          <Sentence>Смело покупайте!</Sentence>
          <WrapSentences>
            <Sentence>Сделка безопасна и застрахована, </Sentence>
            <Sentence>100% гарантия возврата денег.</Sentence>
          </WrapSentences>
        </InfoDescription>

        <PriceDescription>
          Все цены действительны, товары в наличии, покупка возможна прямо сейчас.
        </PriceDescription>
      </DescriptionWrapper>

      <Image src={`${process.env.ASSET_HOST}/images/agreement.png`} />
    </NoteWrapper>
  );
};

export default Note;
