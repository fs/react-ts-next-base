import React, { useState } from 'react';
import useRouter from 'hooks/useRouter';
import { Formik, Form as FormikForm } from 'formik';

import { CATALOG } from 'config/routes';

import { catalogCategories } from 'components/pages/catalog/constants';

import Icon from 'components/shared/atoms/Icon';
import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';

import Catalog from './Catalog';

import { TopBarWrapper, Wrapper, TopBarContent, SearchForm } from './styled';

const TopBar = ({ query }) => {
  const [isCatalogOpened, setIsCatalogOpened] = useState(false);

  const { pushRoute } = useRouter();

  const toggleCatalog = () => {
    setIsCatalogOpened(!isCatalogOpened);
  };

  const onSubmit = ({ topBarSearch }) => {
    pushRoute({
      pathname: CATALOG,
      query: {
        ...query,
        category: catalogCategories.ALL,
        searchQuery: topBarSearch,
      },
    });
  };

  return (
    <TopBarWrapper>
      <Formik onSubmit={onSubmit} initialValues={{ topBarSearch: '' }}>
        <FormikForm>
          <Wrapper>
            <TopBarContent>
              <Button
                variant="secondary"
                label="Каталог товаров"
                iconType="leading"
                icon={
                  isCatalogOpened ? (
                    <Icon name="close" $color="white" />
                  ) : (
                    <Icon name="menu" $color="white" />
                  )
                }
                onClick={toggleCatalog}
              />

              <SearchForm>
                <Input
                  type="text"
                  name="topBarSearch"
                  testId="topBarSearch"
                  placeholder="Хочу купить..."
                  $mb={0}
                />
                <Button
                  type="submit"
                  variant="secondary"
                  iconType="only"
                  icon={<Icon name="search" $color="white" />}
                  $ml={16}
                />
              </SearchForm>
            </TopBarContent>
          </Wrapper>

          {isCatalogOpened && <Catalog onClose={toggleCatalog} />}
        </FormikForm>
      </Formik>
    </TopBarWrapper>
  );
};

export default TopBar;
