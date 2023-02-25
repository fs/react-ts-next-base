import React from 'react';

import PresentationIcon from 'public/images/icons/presentation.svg';
import InstructionsIcon from 'public/images/icons/instructions.svg';
import { HelpLinksWrapper, Header, ListWrapper, StyledLink, StyledLinkText } from './styled';

const HelpLinks = () => {
  const helpLinks = [
    {
      label: 'Скачать презентацию',
      icon: <PresentationIcon />,
      url: `${process.env.ASSET_HOST}/files/presentation.pdf`,
    },
    {
      label: 'Посмотреть инструкцию к сайту',
      icon: <InstructionsIcon />,
      url: `${process.env.ASSET_HOST}/files/instruction.pdf`,
    },
  ];

  return (
    <HelpLinksWrapper>
      <Header>
        Глобальные продажи <br />
        начинаются здесь!
      </Header>
      <ListWrapper>
        <span>Вы можете</span>
        {helpLinks.map(({ label, icon, url }, index) => {
          return (
            <StyledLink key={index} href={url} target="_blank" rel="noreferrer">
              <StyledLinkText>{label}</StyledLinkText>
              {icon}
            </StyledLink>
          );
        })}
      </ListWrapper>
    </HelpLinksWrapper>
  );
};

export default HelpLinks;
