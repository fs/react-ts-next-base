import React from 'react';
import { FieldArray } from 'formik';
import uniqueId from 'lodash/uniqueId';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';

import License from './License';

import { LicenseTextWrapper, TextLicense } from './styled';

const LicensesList = ({ values, title, setFieldValue }) => {
  const onAddLicense = ({ push }) => {
    push({ number: '', id: uniqueId(), companyLicensePhotos: [] });
  };

  return (
    <FieldArray name="companyLicenses">
      {({ push, remove }) => (
        <>
          <LicenseTextWrapper>
            <Icon name="exclamation-square" $size={30} $color="orange" />
            <TextLicense>{title}</TextLicense>
          </LicenseTextWrapper>

          {values.companyLicenses.map(({ id, destroy }, index) => {
            if (destroy) return null;
            return (
              <License
                setFieldValue={setFieldValue}
                values={values}
                remove={remove}
                key={id}
                licenseIndex={index}
              />
            );
          })}

          <Button
            label={
              values.companyLicenses.some(
                ({ destroy, initial }) => !initial || (initial && !destroy),
              )
                ? 'Добавить еще одну лицензию'
                : 'Добавить лицензию'
            }
            variant="confirm"
            size="large"
            shape="extra-rounded"
            iconType="leading"
            icon={<Icon name="plus" $color="white" $size={16} />}
            testId="add-license-button"
            onClick={() => onAddLicense({ push })}
            disabled={values.companyLicenses.some(({ number, destroy }) => !number && !destroy)}
          />
        </>
      )}
    </FieldArray>
  );
};

export default LicensesList;
