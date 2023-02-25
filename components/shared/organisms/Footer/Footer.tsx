import React from 'react';
import { DASHBOARD, NEWS, ABOUT_US, CATALOG, AGREEMENT, CONTRACT } from 'config/routes';

import Logo from 'components/shared/atoms/Logo';
import ActionLink from 'components/shared/atoms/ActionLink';
import SupportRequestModal from 'components/shared/molecules/SupportRequestModal';

import { useModal } from '@ebay/nice-modal-react';
import { TFooter } from './types';
import {
  Wrapper,
  Container,
  Info,
  Copy,
  MenuList,
  MenuItem,
  Contacts,
  RequestHelpLink,
} from './styled';

const currentYear = new Date().getFullYear();

const Footer: React.FunctionComponent<TFooter> = ({ isShowLinks = true }) => {
  const supportRequestModal = useModal(SupportRequestModal);

  const onSupportRequestLinkClick = async () => {
    await supportRequestModal.show({});
  };
  return (
    <Wrapper>
      <Container>
        <MenuList>
          {isShowLinks && (
            <>
              <MenuItem>
                <ActionLink label="О нас" href={ABOUT_US} size={16} $color="white" />
              </MenuItem>

              <MenuItem>
                <ActionLink label="Личный кабинет" href={DASHBOARD} size={16} $color="white" />
              </MenuItem>

              <MenuItem>
                <ActionLink label="Каталог товаров" href={CATALOG} size={16} $color="white" />
              </MenuItem>

              <MenuItem>
                <ActionLink label="Правила пользования" href={CONTRACT} size={16} $color="white" />
              </MenuItem>

              <MenuItem>
                <ActionLink label="Новости" href={NEWS} size={16} $color="white" />
              </MenuItem>

              <MenuItem>
                <ActionLink
                  label="Обработка персональных данных"
                  href={AGREEMENT}
                  size={16}
                  $color="white"
                  target="_blank"
                  rel="no-referrer"
                />
              </MenuItem>
            </>
          )}
        </MenuList>
        <Contacts>
          <a href="tel:78435000310">+7 843 50 00 310</a>
          {isShowLinks && (
            <RequestHelpLink onClick={onSupportRequestLinkClick}>
              Обратиться в поддержку
            </RequestHelpLink>
          )}
        </Contacts>
      </Container>

      <Info>
        <Copy>© {currentYear} Medagregator</Copy>
        <Logo />
      </Info>
    </Wrapper>
  );
};

export default Footer;
