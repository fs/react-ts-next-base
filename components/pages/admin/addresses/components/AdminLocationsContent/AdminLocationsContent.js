import React from 'react';
import InfinityList from 'components/shared/organisms/InfinityList';
import AddressInfo from 'components/shared/molecules/AddressInfo';
import { LocationsWrapper } from './styled';

const AdminLocationsContent = ({ locations, pageInfo, fetchMore, loading, loadingMore }) => {
  const { endCursor, hasNextPage } = pageInfo;

  const onLoadMore = async () => {
    if (loadingMore) return;
    await fetchMore({ variables: { after: endCursor } });
  };

  return (
    <>
      <InfinityList
        dataLength={locations.length}
        hasNextPage={hasNextPage}
        onLoadMore={onLoadMore}
        loading={loading}
        scrollableTarget="admin-template-content"
        $width="60rem"
      >
        <LocationsWrapper>
          {locations.map(location => (
            <AddressInfo key={location.id} isAdminAddresses location={location} />
          ))}
        </LocationsWrapper>
      </InfinityList>
    </>
  );
};

export default AdminLocationsContent;
