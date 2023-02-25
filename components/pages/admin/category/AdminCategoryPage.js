import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withRoutesRules from 'lib/roles/withRoutesRules';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import { useProperties } from 'lib/apollo/hooks/state/properties';

import { useCategory } from 'lib/apollo/hooks/state/category';

import ErrorPage from 'pages/_error';
import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import AdminTemplate from 'components/shared/templates/AdminTemplate';
import EmptyListMessage from 'components/shared/molecules/EmptyListMessage';
import CharacteristicInfo from 'components/shared/molecules/PropertyInfo';

import { ADMIN_CATEGORIES } from 'config/routes';
import { DEPTH_DECLENSION_DICTIONARY } from 'config/constants/categories';

import { Wrapper } from './styled';

export const AdminCategoryPage = ({ query }) => {
  const { categoryId } = query;

  const {
    category,
    loading: loadingCategories,
    error: errorCategories,
  } = useCategory({ id: categoryId });

  const {
    properties,
    loading: loadingProperties,
    errorProperties,
  } = useProperties({
    categoryIds: [categoryId],
  });

  if ((!loadingProperties && errorProperties) || (!loadingCategories && errorCategories))
    return <ErrorPage statusCode={404} />;

  if (loadingProperties || loadingCategories) {
    return (
      <AdminTemplate testId="admin-category-page">
        <Loader testId="admin-category-page-loader" />
      </AdminTemplate>
    );
  }

  const titleText = `Характеристики ${DEPTH_DECLENSION_DICTIONARY[
    category?.depth
  ].toLowerCase()}: ${category?.name}`;

  return (
    <AdminTemplate title={titleText} testId="admin-category-page">
      <Breadcrumbs back url={ADMIN_CATEGORIES} text="Вернуться к категориям" />
      <Wrapper>
        {properties.length === 0 ? (
          <EmptyListMessage text="Здесь нет доступных характеристик" />
        ) : (
          properties.map(({ id, name }) => <CharacteristicInfo name={name} id={id} key={id} />)
        )}
      </Wrapper>
    </AdminTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(AdminCategoryPage))));
