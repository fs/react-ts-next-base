import React, { useEffect, useState, useRef } from 'react';
import useRouter from 'hooks/useRouter';

import Icon from 'components/shared/atoms/Icon';

import { Wrapper, OrderTabs, Button, ScrolledWrapper, CompanyItem } from './styled';

const directions = {
  LEFT: 'left',
  RIGHT: 'right',
};

const CartTabs = ({ companies, selectedSeller }) => {
  const { pushRoute } = useRouter();
  const [scroll, setScroll] = useState(0);

  const refItems = useRef(null);

  const inactiveLeftArrow = selectedSeller === 0;
  const inactiveRightArrow = selectedSeller === companies.length - 1;

  const onSelectNextCompany = direction => {
    const shownCompanies = 5;
    const tabWidth = Math.round((refItems.current?.offsetWidth / shownCompanies) * 100); // 20% of container
    const scrolledCompanies = Math.round(scroll / tabWidth);

    if (direction === directions.RIGHT) {
      pushRoute({ query: { sellerId: companies[selectedSeller + 1].id } });
    } else {
      pushRoute({ query: { sellerId: companies[selectedSeller - 1].id } });
    }

    if (
      direction === directions.RIGHT &&
      selectedSeller >= shownCompanies + scrolledCompanies - 2
    ) {
      refItems.current.scrollLeft = scroll + tabWidth;
    } else if (direction === directions.LEFT && selectedSeller <= shownCompanies) {
      refItems.current.scrollLeft = scroll - tabWidth;
    }
  };

  const onSelectCompany = id => {
    pushRoute({ query: { sellerId: id } });
  };

  useEffect(() => {
    const scrollHandler = () => setScroll(refItems.current?.scrollLeft);
    const subscribeScroll = () => window.addEventListener('scroll', scrollHandler, true);
    const unsubscribeScroll = () => window.removeEventListener('scroll', scrollHandler, true);

    subscribeScroll();
    return () => unsubscribeScroll();
  }, []);

  return (
    <OrderTabs>
      <Button
        inactive={inactiveLeftArrow}
        reverse
        onClick={() => onSelectNextCompany(directions.LEFT)}
      >
        <Icon name="arrow-chevron-left" $size={15} $color="greyA3" />
      </Button>

      <Wrapper>
        <ScrolledWrapper ref={refItems}>
          {companies.map(({ id, officialName }, index) => (
            <CompanyItem
              selected={selectedSeller === index}
              onClick={() => onSelectCompany(id)}
              key={id}
              data-testid="user-cart-company-item"
            >
              {officialName}
            </CompanyItem>
          ))}
        </ScrolledWrapper>
      </Wrapper>

      <Button inactive={inactiveRightArrow} onClick={() => onSelectNextCompany(directions.RIGHT)}>
        <Icon name="arrow-chevron-right" $size={15} $color="greyA3" />
      </Button>
    </OrderTabs>
  );
};

export default CartTabs;
