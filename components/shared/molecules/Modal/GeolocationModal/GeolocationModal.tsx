import React, { useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

import { useCities } from 'lib/apollo/hooks/state/cities';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import ModalWindow from 'components/shared/atoms/ModalWindow';
import AsyncSelect from 'components/shared/atoms/Selects/AsyncSelect';

import { useCity } from 'lib/apollo/hooks/state/clientSideState';
import { ModalWrapperColumn, ModalWrapperRow, CityLine, CityWrapper } from './styled';
import { cities } from './constants';
import { EStep, TGeolocationModal } from './types';

const GeolocationModal = NiceModal.create(
  ({ initialStep = EStep.ACCEPT_LOCATION }: TGeolocationModal) => {
    const {
      city: { id, name },
      setCity,
    } = useCity();

    const [step, setStep] = useState<EStep>(initialStep);
    const { visible, remove } = useModal();

    const isStepAcceptLocation = step === EStep.ACCEPT_LOCATION;
    const isStepChooseLocation = step === EStep.CHOOSE_LOCATION;

    const fetchCities = useCities();

    const fetchCityId = async (cityName: string) => {
      const { nodes } = await fetchCities({
        after: null,
        name: cityName.toLowerCase(),
        strict: true,
      });

      const [cityNode] = nodes;
      return cityNode;
    };

    const fetchAndSetCity = (cityName: string) => async () => {
      const city = await fetchCityId(cityName);
      if (city) {
        setCity({ id: city.id, name: city.name });
        setTimeout(remove, 0);
      } else {
        console.error('НЕТ ГОРОДА');
      }
    };

    return (
      <>
        <ModalWindow
          isOpen={visible}
          setIsOpen={remove}
          onClose={fetchAndSetCity(name)}
          title={isStepChooseLocation ? 'Выберите ваш город' : ''}
          $width="52rem"
          position="top"
          rounded
        >
          {isStepAcceptLocation && (
            <ModalWrapperRow>
              <Icon name="pin" $size={30} $mr={22} />
              <div>Ваш город {name}?</div>
              <Button $ml="auto" onClick={fetchAndSetCity(name)}>
                Да верно
              </Button>
              <Button
                variant="outlined-primary"
                $ml={16}
                onClick={() => setStep(EStep.CHOOSE_LOCATION)}
              >
                Нет другой
              </Button>
            </ModalWrapperRow>
          )}
          {isStepChooseLocation && (
            <ModalWrapperColumn>
              <Formik initialValues={{}} onSubmit={() => {}}>
                {() => (
                  <FormikForm
                    onKeyDown={keyEvent => {
                      if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
                        keyEvent.preventDefault();
                      }
                    }}
                  >
                    <AsyncSelect
                      name="cityId"
                      onChange={option => {
                        if (option?.label) {
                          fetchAndSetCity(option.label)();
                        }
                      }}
                      initialValue={{ value: id, label: name }}
                      title="Город"
                      height="9.5rem"
                      placeholder="Город"
                      fetchFn={fetchCities}
                      disabled={false}
                      $mb={20}
                    />
                    <CityLine>
                      {cities.map((city, index) => {
                        return (
                          <CityWrapper key={index}>
                            <Button $width="100%" onClick={fetchAndSetCity(city)}>
                              {city}
                            </Button>
                          </CityWrapper>
                        );
                      })}
                    </CityLine>
                  </FormikForm>
                )}
              </Formik>
            </ModalWrapperColumn>
          )}
        </ModalWindow>
      </>
    );
  },
);

export default GeolocationModal;
