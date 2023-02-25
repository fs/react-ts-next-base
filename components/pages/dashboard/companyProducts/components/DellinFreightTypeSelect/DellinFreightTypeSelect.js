import React from 'react';

import SelectField from 'components/shared/atoms/Selects/SelectField';

const DellinFreightTypeSelect = ({ options, readOnly = false }) => {
  return (
    <SelectField
      readOnly={readOnly}
      name="dellinFreightTypeId"
      options={options}
      title="Характер груза"
      placeholder="Характер груза"
    />
  );
};

export default DellinFreightTypeSelect;
