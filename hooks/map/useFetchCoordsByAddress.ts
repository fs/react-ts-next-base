import { useCallback, useState } from 'react';

const apikey = process.env.API_KEY_MAP;
const defaultCoordinates = [process.env.DEFAULT_LATITUDE, process.env.DEFAULT_LONGITUDE];

const useFetchCoordsByAddress = () => {
  const [coords, setCoords] = useState(defaultCoordinates);

  const fetchCoordsByAddress = useCallback((address = '') => {
    try {
      fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apikey}&geocode=${address}`)
        .then(res => res.json())
        .then(result => {
          const point = result?.response?.GeoObjectCollection?.featureMember[0];
          if (point) {
            setCoords(point.GeoObject.Point.pos.split(' ').reverse());
          }
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return [coords, fetchCoordsByAddress];
};
export default useFetchCoordsByAddress;
