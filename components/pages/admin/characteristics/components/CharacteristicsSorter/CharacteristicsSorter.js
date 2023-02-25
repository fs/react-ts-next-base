import React, { useEffect, useState } from 'react';
import { Form as FormikForm, useFormik, FormikProvider } from 'formik';
import useRouter from 'hooks/useRouter';

import SelectCategoryItem from 'components/shared/atoms/SelectCategoryItem';

import { SortersWrapper } from './styled';

const CharacteristicsSorter = ({ query }) => {
  const { pushRoute } = useRouter();
  const [options, setOptions] = useState(Array(4).fill([]));

  const initialCategories = () => {
    const initial = Array(4).fill(null);

    return initial.map((_, i) => query[`parentIdDepth${i}`] || null);
  };

  const formik = useFormik({
    initialValues: { categories: initialCategories(), ...query },
  });

  const { values } = formik;

  const { categories } = values;
  const categoryFields = [
    {
      name: 'categories.0',
      placeholder: 'Категория товара',
      fieldIndex: 0,
    },
    {
      name: 'categories.1',
      disabled: !categories[0],
      placeholder: 'Подкатегория товара',
      fieldIndex: 1,
    },
    {
      name: 'categories.2',
      disabled: !categories[1],
      placeholder: 'Раздел',
      fieldIndex: 2,
    },
    {
      name: 'categories.3',
      disabled: !categories[2],
      placeholder: 'Подраздел',
      fieldIndex: 3,
    },
  ];

  useEffect(() => {
    const newQuery = categories.reduce(
      (obj, item, i) => ({ ...obj, [`parentIdDepth${i}`]: item }),
      {},
    );

    pushRoute({ query: { ...query, ...newQuery } });
  }, [values]);

  return (
    <FormikProvider value={formik}>
      <FormikForm>
        <SortersWrapper>
          {categoryFields.map((field, i) => (
            <SelectCategoryItem
              key={i}
              field={field}
              options={options}
              setOptions={setOptions}
              rounded
            />
          ))}
        </SortersWrapper>
      </FormikForm>
    </FormikProvider>
  );
};

export default CharacteristicsSorter;
