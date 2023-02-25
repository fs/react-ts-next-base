import React, { useEffect } from 'react';
import useFetchAddressByCoords from 'hooks/map/useFetchAddressByCoords';
import useFetchCoordsByAddress from 'hooks/map/useFetchCoordsByAddress';
import {
  YMaps,
  Map as MapItem,
  GeolocationControl,
  Placemark,
  ZoomControl,
} from 'react-yandex-maps';

const apikey = process.env.API_KEY_MAP;

const Map = ({ city, address: inputAddress = '', postcode = '', setFieldValue, setAddress }) => {
  const [address, fetchAddressByCoords] = useFetchAddressByCoords(inputAddress, postcode);
  const [coords, fetchCoordsByAddress] = useFetchCoordsByAddress();

  const onMapClick = async event => {
    const newCoords = await event.get('coords');
    await fetchAddressByCoords(newCoords.reverse());
  };

  const onLoadMap = async event => {
    if (!!inputAddress && inputAddress.length > 5) {
      await fetchCoordsByAddress(`${city} ${address?.formatted}`);
    } else {
      const geoLocation = await event.geolocation.get({
        mapStateAutoApply: true,
        provider: 'yandex',
      });
      const geocode = await event.geocode(geoLocation.geoObjects.position);
      await fetchAddressByCoords(geocode.metaData.geocoder.request.split(',').reverse());
    }
  };

  useEffect(() => {
    if (setFieldValue && setAddress) {
      setAddress(address);
      setFieldValue('address', address?.formatted || '');
      setFieldValue('postcode', address?.postal_code || '');
    }
  }, [address]);

  useEffect(() => {
    if (!!inputAddress && inputAddress.length > 5) {
      const fetchData = async () => {
        await fetchCoordsByAddress(`${city} ${inputAddress}`);
      };
      fetchData();
    }
  }, [inputAddress, fetchCoordsByAddress]);

  return (
    <YMaps query={{ apikey }}>
      <MapItem
        defaultState={{ center: coords, zoom: 12 }}
        state={{ center: coords, zoom: 15 }}
        options={{ mapAutoFocus: true }}
        width="100%"
        height="100%"
        onClick={onMapClick}
        modules={['geocode', 'geolocation']}
        onLoad={onLoadMap}
      >
        <GeolocationControl options={{ position: { top: 5, left: 5 } }} />
        <ZoomControl options={{ position: { top: 85, left: 5 } }} />
        <Placemark geometry={coords} />
      </MapItem>
    </YMaps>
  );
};

export default Map;
