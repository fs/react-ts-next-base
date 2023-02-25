import { useEffect } from 'react';
import NiceModal from '@ebay/nice-modal-react';

import GeolocationModal from 'components/shared/molecules/Modal/GeolocationModal/GeolocationModal';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';

const useCheckGeolocation = ({ skipCheck = false }) => {
  const { isFirstCheck } = useCity();
  useEffect(() => {
    if (isFirstCheck && !skipCheck) {
      NiceModal.show(GeolocationModal);
    }
  }, [isFirstCheck, skipCheck]);
};

export default useCheckGeolocation;
