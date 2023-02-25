import { useQuery } from '@apollo/client';

import { companySidebarVar, cityVar } from 'lib/clientSideState/clientSideState';
import clientSideState from 'graphql/queries/clientSideState.graphql';
import useLocalStorage from 'hooks/useLocalStorage';

const defaultCity = { id: '510', name: 'Москва' };

export const useCompanySidebar = () => {
  const { data } = useQuery(clientSideState);

  return {
    companySidebar: data?.companySidebar,
    toggleIsShowFinances: () => {
      companySidebarVar({
        ...companySidebarVar(),
        isShowFinances: !data?.companySidebar?.isShowFinances,
      });
    },
  };
};

export const useCity = () => {
  const { data } = useQuery(clientSideState);
  const [localCity, setLocalCity] = useLocalStorage('city');
  const isFirstCheck = !(data?.city || localCity);
  return {
    city: data?.city || localCity || defaultCity,
    setCity: city => {
      cityVar(city);
      setLocalCity(city);
    },
    isFirstCheck,
  };
};
