import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import throttle from 'lodash/throttle';

import Loader from 'components/shared/atoms/Loader';
import Button from 'components/shared/atoms/Button';
import EmptyMessage from 'components/shared/molecules/EmptyMessage';

import { TInfinityList } from './types';
import { EndListWrapper, infinityScrollStyle } from './styled';

const InfinityList = ({
  dataLength,
  loading,
  hasNextPage,
  onLoadMore,
  children,
  scrollableTarget,
  titleEmptyMessage = 'Ой',
  descriptionEmptyMessage = 'Ничего нет',
  $width = '100%',
}: TInfinityList) => {
  const [showFetchMoreButton, setShowFetchMoreButton] = useState(false);
  const [size, setSize] = useState(0);
  useEffect(() => {
    const scrollableElement = document.getElementById(scrollableTarget);
    if (!scrollableElement) return undefined;

    const heightHandler = throttle(() => {
      setSize(scrollableElement.clientHeight);
      setShowFetchMoreButton(scrollableElement.scrollHeight <= size);
    }, 200);
    scrollableElement.addEventListener('resize', heightHandler);
    heightHandler();
    return () => scrollableElement.removeEventListener('resize', heightHandler);
  }, [dataLength, size]);

  if (loading) return <Loader testId={`loader-${scrollableTarget}`} />;

  return (
    <>
      {dataLength === 0 ? (
        <EmptyMessage title={titleEmptyMessage} description={descriptionEmptyMessage} />
      ) : (
        <InfiniteScroll
          dataLength={dataLength}
          next={onLoadMore}
          hasMore={hasNextPage}
          scrollThreshold={0.8}
          loader={
            <EndListWrapper>
              <Loader $mt={32} $mb={16} variant="simple" size={45} />
            </EndListWrapper>
          }
          style={{ ...infinityScrollStyle, maxWidth: $width }}
          scrollableTarget={scrollableTarget}
        >
          {children}
          <EndListWrapper>
            {showFetchMoreButton && hasNextPage && (
              <Button
                label="ПОКАЗАТЬ ЕЩЕ"
                variant="hollow-primary"
                onClick={onLoadMore}
                size="large"
                $mt={24}
              />
            )}
          </EndListWrapper>
        </InfiniteScroll>
      )}
    </>
  );
};

export default InfinityList;
