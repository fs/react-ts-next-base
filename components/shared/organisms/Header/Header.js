import React from 'react';
import Link from 'next/link';
import NiceModal from '@ebay/nice-modal-react';

import useCurrentUser from 'hooks/useCurrentUser';
import { useSignOut } from 'lib/apollo/hooks/actions/auth';

import useCheckGeolocation from 'hooks/useCheckGeolocation';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

import { FAVORITE_PRODUCTS, HOME, CART } from 'config/routes';

import { getSystemRole } from 'config/constants/systemRoles';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import ProfileImage from 'components/shared/atoms/ProfileImage';
import GeolocationModal from 'components/shared/molecules/Modal/GeolocationModal';

import { OrderCheckoutStatusEnum } from 'graphql/types';
import OrdersAmount from './OrdersAmount';

import {
  HeaderWrapper,
  MainLogo,
  Links,
  Col,
  Name,
  Role,
  HeaderMenu,
  UserActions,
  CartButtonWrapper,
  MenuButton,
  Line,
  Location,
  OrdersAmountWrapper,
} from './styled';

const Header = ({
  toggleMenu = () => {},
  toggleSidebar = () => {},
  isLight = false,
  isShowMenu = true,
  contentRef = () => {},
  refTogglerMenu = () => {},
}) => {
  const { user, isUserBuyer, isAdmin, mainCompanyId, isGuest, isRegisteredUser } = useCurrentUser();

  const { systemRole, lastName, firstName, middleName, avatarUrl, guestUserOrders, id } =
    user || {};

  const [signOut] = useSignOut();
  useCheckGeolocation({ skipCheck: !isGuest });

  const { city } = useCity();

  const notReservedGuestOrders =
    guestUserOrders?.filter(
      ({ order }) => order.checkoutStatus !== OrderCheckoutStatusEnum.Reserved,
    ) || [];

  const guestOrdersCount = notReservedGuestOrders?.length || 0;

  return (
    <HeaderWrapper isLight={isLight}>
      <Link href={HOME} passHref onClick={() => contentRef?.current?.scrollTo({ top: 0 })}>
        <MainLogo
          src={
            isLight
              ? `${process.env.ASSET_HOST}/images/main-logo-black.png`
              : `${process.env.ASSET_HOST}/images/main-logo-white.png`
          }
          alt="mainLogo"
          isLight={isLight}
        />
      </Link>
      {isGuest && (
        <Location
          isLight={isLight}
          onClick={() =>
            NiceModal.show(GeolocationModal, {
              initialStep: 'CHOOSE_LOCATION',
            })
          }
        >
          <Icon name="pin" $size={20} $mr={6} $color={isLight ? 'black' : 'white'} />
          <div>{city.name}</div>
        </Location>
      )}
      {isShowMenu && (
        <Links data-cy="header-links">
          {isAdmin ? (
            <>
              <Col>
                <Name>
                  {lastName}&nbsp;{firstName}&nbsp;{middleName}
                </Name>
                <Role>{getSystemRole(systemRole)}</Role>
              </Col>
              <Button
                iconType="only"
                icon={<Icon name="logout" $size={28} $color="greyA4" />}
                variant="hollow"
                $ml={32}
                onClick={signOut}
              />
            </>
          ) : (
            <HeaderMenu>
              <UserActions>
                {isUserBuyer && (
                  <Button
                    variant="hollow"
                    iconType="only"
                    size="small"
                    icon={<Icon name="heart" $color={isLight ? 'orange' : 'white'} $size={34} />}
                    href={FAVORITE_PRODUCTS}
                  />
                )}
                {(isGuest || isUserBuyer) && (
                  <CartButtonWrapper>
                    <Button
                      variant="hollow"
                      iconType="only"
                      size="small"
                      icon={<Icon name="cart" $color={isLight ? 'green' : 'white'} $size={34} />}
                      href={CART}
                      testId="cart-button"
                    >
                      {isUserBuyer && <OrdersAmount mainCompanyId={mainCompanyId} />}
                      {isGuest && (
                        <OrdersAmountWrapper data-testid="orders-amount">
                          {guestOrdersCount}
                        </OrdersAmountWrapper>
                      )}
                    </Button>
                  </CartButtonWrapper>
                )}

                {isRegisteredUser && (
                  <Button
                    variant="hollow"
                    shape="circle"
                    iconType="only"
                    onClick={toggleSidebar}
                    testId="sidebar-toggler"
                    size="small"
                  >
                    <ProfileImage avatar={avatarUrl} id={id} />
                  </Button>
                )}
              </UserActions>

              {isLight && <Line />}

              <MenuButton
                isLight={isLight}
                data-cy="header-menu"
                onClick={toggleMenu}
                ref={refTogglerMenu}
              >
                Меню
                <Icon name="menu" $color={isLight ? 'blue' : 'white'} $size={34} $ml={16} />
              </MenuButton>
            </HeaderMenu>
          )}
        </Links>
      )}
    </HeaderWrapper>
  );
};

export default Header;
