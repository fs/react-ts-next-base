import React from 'react';
import useRouter from 'hooks/useRouter';
import { useFormik, FormikProvider, FormikHelpers } from 'formik';

import Input from 'components/shared/atoms/Input';
import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';

import { Form } from './styled';
import { TSearchForm, TFormValues, TField } from './types';

const SearchForm = ({
  placeholder = 'Поиск...',
  rounded = false,
  customFields,
  searchInputName = 'searchQuery',
  ...props
}: TSearchForm) => {
  const { query, pushRoute } = useRouter();
  const searchQuery = query[searchInputName];
  const initValueState = searchQuery && !Array.isArray(searchQuery) ? searchQuery : '';

  const onSubmit = (values: TFormValues) => {
    const valuesQuery = Object.entries(values).reduce(
      (obj, [key, value]) => ({ ...obj, [key]: value || null }),
      {},
    );

    pushRoute({
      query: {
        ...query,
        ...valuesQuery,
      },
    });
  };

  const onSubmitHandle = (values: TFormValues, helpers: FormikHelpers<TFormValues>) => {
    onSubmit(values);
    helpers.setSubmitting(false);
  };

  const defaultField: TField = {
    placeholder,
    name: searchInputName,
    testId: 'search-input',
    initialValue: initValueState,
  };

  const fields = customFields || [defaultField];
  const initialValues = fields.reduce(
    (obj, item) => Object.assign(obj, { [item.name]: item.initialValue }),
    {},
  );

  const formik = useFormik<TFormValues>({
    initialValues,
    onSubmit: onSubmitHandle,
  });
  const { values, setFieldValue } = formik;

  const onInputClear = (name: string) => {
    setFieldValue(name, '');
    onSubmit({ ...values, [name]: '' });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, name: string) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onInputClear(name);
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form {...props}>
        {fields.map(({ placeholder: inputPlaceholder, testId, name, width }, key) => (
          <Input
            $width={width}
            placeholder={inputPlaceholder}
            rounded={rounded}
            testId={testId}
            name={name}
            iconType="trailing"
            key={key}
            value={values[name]}
            onKeyDown={e => onKeyDown(e, name)}
            icon={
              values[name] && (
                <Button
                  variant="hollow"
                  iconType="only"
                  icon={<Icon name="close" $color="greyA3" />}
                  size="small"
                  onClick={() => onInputClear(name)}
                  testId={`clear-input-button-${name}`}
                />
              )
            }
          />
        ))}

        <Button
          type="submit"
          shape={rounded ? 'rounded' : 'none'}
          iconType="only"
          icon={<Icon name="search" $color="white" />}
          data-testid="search-button"
        />
      </Form>
    </FormikProvider>
  );
};
export default SearchForm;
