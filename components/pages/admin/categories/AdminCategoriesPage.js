import React, { useEffect } from 'react';
import { Form as FormikForm, useFormik, FormikProvider } from 'formik';
import useRouter from 'hooks/useRouter';

import withAuth from 'lib/auth/withAuth';
import withRoutesRules from 'lib/roles/withRoutesRules';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';

import AdminTemplate from 'components/shared/templates/AdminTemplate';

import Category from './components/Category';

import { Wrapper } from './styled';

export const AdminCategoriesPage = ({ query }) => {
  const { pushRoute } = useRouter();

  const initialCategories = () => {
    const initial = Array(4).fill(null);

    return initial.map((_, i) => query[`parentIdDepth${i}`] || null);
  };

  const formik = useFormik({
    initialValues: { categories: initialCategories(), ...query },
  });
  const { values } = formik;

  useEffect(() => {
    const newQuery = values.categories.reduce(
      (obj, item, i) => ({ ...obj, [`parentIdDepth${i}`]: item }),
      {},
    );

    pushRoute({ query: { ...query, ...newQuery } });
  }, [values]);

  return (
    <AdminTemplate title="Категории" testId="admin-categories-page">
      <Wrapper>
        <FormikProvider value={formik}>
          <FormikForm>
            <Category parentId={null} />
          </FormikForm>
        </FormikProvider>
      </Wrapper>
    </AdminTemplate>
  );
};

export default withGetDataFromTree(
  withAuth(withAuthSecurity(withRoutesRules(AdminCategoriesPage))),
);
