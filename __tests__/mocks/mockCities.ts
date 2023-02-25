import { mockPageInfo } from './mockPageInfo';

export const mockCities = [
  {
    id: '1',
    name: 'Казань',
    cityType: '',
    fiasId: '1',
    kladrId: '1',
    region: 'k',
  },
  {
    id: '1',
    name: 'Москва',
    cityType: '',
    fiasId: '1',
    kladrId: '1',
    region: 'm',
  },
  {
    id: '3',
    name: 'Санкт-Петербург',
    cityType: '',
    fiasId: '3',
    kladrId: '3',
    region: 's',
  },
];

export const mockCitiesData = {
  cities: {
    edges: mockCities.map(city => ({ node: city, cursor: null })),
    pageInfo: mockPageInfo,
  },
};
