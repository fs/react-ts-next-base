import { useCallback, useState } from 'react';

const apikey = process.env.API_KEY_MAP;
const defaultCoordinates = [process.env.DEFAULT_LATITUDE, process.env.DEFAULT_LONGITUDE];

const useFetchAddressByCoords = (currentAddress = '', currentPostcode = '') => {
  const [address, setAddress] = useState({
    formatted: currentAddress,
    postal_code: currentPostcode,
  });

  const fetchAddressByCoords = useCallback((coords = defaultCoordinates) => {
    const [lat, lng] = coords;
    try {
      fetch(
        `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apikey}&geocode=${lat},${lng}`,
      )
        .then(res => res.json())
        .then(result => {
          const point = result?.response?.GeoObjectCollection?.featureMember[0];
          if (point) {
            setAddress(point.GeoObject.metaDataProperty.GeocoderMetaData.Address);
          }
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return [address, fetchAddressByCoords];
};
export default useFetchAddressByCoords;
