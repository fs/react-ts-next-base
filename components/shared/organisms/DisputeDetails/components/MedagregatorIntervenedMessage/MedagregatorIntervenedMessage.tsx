import React from 'react';
import { Wrapper, Title } from './styled';

const MedagregatorIntervenedMessage = ({ isSeller = false }) => {
  return (
    <Wrapper>
      <Title data-testid="medagregator-intervened-title">
        В спор вмешался Medagregator <br />
        Вы не можете вносить изменения по спору
      </Title>
      {isSeller ? (
        <>
          В течение <b> 5 дней 11 часов </b> Medagregator свяжется с вами и покупателем. За это
          время будет принято удобное для обоих сторон решение спора.
        </>
      ) : (
        <>
          В течение <b> 5 дней 11 часов </b> Medagregator предложит вам свое решение по вашему
          спору. Medagregator пришлет Уведомление. Вам нужно будет выбрать одно из предложенных
          решений до окончания срока спора. В противном случае Medagregator примет решение за вас.
        </>
      )}
    </Wrapper>
  );
};

export default MedagregatorIntervenedMessage;
