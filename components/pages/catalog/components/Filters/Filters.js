import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import useRouter from 'hooks/useRouter';

import { useProperties } from 'lib/apollo/hooks/state/properties';
import { useProductManufactures } from 'lib/apollo/hooks/state/productManufacturers';
import { useProductSummary } from 'lib/apollo/hooks/state/productsSummary';
import useCurrentUser from 'hooks/useCurrentUser';

import Button from 'components/shared/atoms/Button';
import {
  prepareProperties,
  excludeSpecificProperties,
  typeMapper,
  prefixMapper,
  sanitizeProperties,
  getQueryParamsByCategory,
} from 'components/pages/catalog/utils';
import FiltersContent from 'components/pages/catalog/components/FiltersContent';
import { FiltersContainer, FiltersHeader, FiltersTitle } from './styled';
import { useCategory } from './useCategory';

const vatOption = [
  { name: 'Не облагается', id: 'false' },
  { name: 'Облагается', id: 'true' },
];

const Filters = ({ query, setSpecialFiltersQuery }) => {
  const {
    searchQuery,
    currentCategory,
    subcategory,
    section,
    subsection,
    minPrice,
    maxPrice,
    manufacturer,
    rating,
    companyRating,
    freeDelivery,
    newest,
    category,
    vatPresence,
  } = query;
  const generalQueryFilters = { searchQuery, category };

  const [lastChangedInput, setLastChangedInput] = useState('');

  const [key, setKey] = useState(0);
  const bufferFilters = {
    minPrice,
    maxPrice,
    rating,
    companyRating,
    freeDelivery,
    newest,
    currentCategory,
    subcategory,
    manufacturer,
    section,
    subsection,
  };
  const [filters, setFilters] = useState(bufferFilters);

  const { pushRoute } = useRouter();
  const { mainCompanyId } = useCurrentUser();

  const { productManufacturers } = useProductManufactures({ name: '' });

  const [selectedCategory, setSelectedCategory, baseCategories] = useCategory(
    { value: null },
    currentCategory,
  );
  const [selectedSubcategory, setSelectedSubcategory, subcategories] = useCategory(
    selectedCategory,
    subcategory,
  );

  const [selectedSection, setSelectedSection, sections] = useCategory(selectedSubcategory, section);

  const [selectedSubsection, setSelectedSubsection, subsections] = useCategory(
    selectedSection,
    subsection,
  );

  const onChangeCategory = ({ value, label }) => {
    setSelectedCategory({ value, label });
    setSelectedSubcategory({ value: '', label: '' });
    setSelectedSection({ value: '', label: '' });
    setSelectedSubsection({ value: '', label: '' });
  };

  const onChangeSubcategory = ({ value, label }) => {
    setSelectedSubcategory({ value, label });
    setSelectedSection({ value: '', label: '' });
    setSelectedSubsection({ value: '', label: '' });
  };

  const onChangeSection = ({ value, label }) => {
    setSelectedSection({ value, label });
    setSelectedSubsection({ value: '', label: '' });
  };

  const currentCategoryId =
    selectedSubsection?.value ||
    selectedSection?.value ||
    selectedSubcategory?.value ||
    selectedCategory?.value ||
    '';

  const { properties: specificFilters } = useProperties({ categoryIds: [currentCategoryId] });

  const {
    freeDelivery: excludeFreeDelivery,
    currentCategory: excludeCurrentCategory,
    subcategory: excludeSubcategory,
    section: excludeSection,
    subsection: excludeSubsection,
    ...restFilters
  } = filters;

  const productSummaryFilters = {
    ...restFilters,
    freeDeliveryCompanyId: excludeFreeDelivery ? mainCompanyId : undefined,
    categoryIds:
      excludeSubsection || excludeSection || excludeSubcategory || excludeCurrentCategory,
  };

  const routeFilters = {
    ...restFilters,
    freeDeliveryCompanyId: excludeFreeDelivery ? mainCompanyId : undefined,
    currentCategory: excludeCurrentCategory,
    subcategory: excludeSubcategory,
    section: excludeSection,
    subsection: excludeSubsection,
  };

  const productParams = sanitizeProperties({
    searchQuery,
    ...getQueryParamsByCategory(category),
    ...prepareProperties(productSummaryFilters),
  });

  const { totalCount, loading } = useProductSummary(productParams);

  const onSubmit = () => {
    setLastChangedInput('');
    const params = sanitizeProperties({
      ...generalQueryFilters,
      ...routeFilters,
    });

    const { textProperties = [], dictionaryProperties = [], integerProperties = [] } = filters;
    setSpecialFiltersQuery({ textProperties, dictionaryProperties, integerProperties });
    // TODO fix excludeSpecificProperties need because doesn't work routing
    pushRoute({ query: excludeSpecificProperties(params) });
  };

  const updateCurrentValues = debounce((values = {}) => {
    setFilters(prevFilters => ({ ...prevFilters, ...values }));
  }, 300);

  const specificFiltersWithOptionsNew = specificFilters.map(
    ({ __typename: type, id: propertyId, displayName }, index) => {
      return {
        // when we using prefix.number - it converts to array with empty items
        propertyId,
        name: `${prefixMapper(type)}.${index}`,
        type: typeMapper(type),
        title: displayName,
        isSpecificFilter: true,
        onChange: updateCurrentValues,
        fieldIndex: index,
        ...(prefixMapper(type) === 'integerProperties'
          ? {
              fields: [
                { title: 'от', range: 'min' },
                { title: 'до', range: 'max' },
              ],
            }
          : {}),
      };
    },
  );

  const handleClearFilter = async () => {
    setLastChangedInput('');
    setKey(Number(key) + 1);
    setSelectedCategory({
      value: '',
      label: '',
    });
    setSelectedSubcategory({ value: '', label: '' });
    setSelectedSection({ value: '', label: '' });
    setSelectedSubsection({ value: '', label: '' });
    setSpecialFiltersQuery({});
    setFilters({
      rating: null,
      companyRating: null,
      freeDelivery: null,
      newest: null,
      minPrice: null,
      maxPrice: null,
    });
    pushRoute({ query: { ...generalQueryFilters } });
  };

  const fields = [
    {
      title: 'Категория',
      name: 'currentCategory',
      type: 'select',
      options: baseCategories.map(option => ({ value: option.id, label: option.name })),
      onChange: (values, { value, label }) => {
        onChangeCategory({ value, label });
        updateCurrentValues({ ...values, subcategory: '', section: '', subsection: '' });
      },
      clearList: { subcategory: '', section: '', subsection: '' },
    },
    {
      title: 'Подкатегории',
      name: 'subcategory',
      type: 'select',
      options: subcategories.map(option => ({ value: option.id, label: option.name })),
      onChange: (values, { value, label }) => {
        onChangeSubcategory({ value, label });
        updateCurrentValues({ ...values, section: '', subsection: '' });
      },
      clearList: { section: '', subsection: '' },
    },
    {
      title: 'Раздел',
      name: 'section',
      type: 'select',
      options: sections.map(option => ({ value: option.id, label: option.name })),
      onChange: (values, { value, label }) => {
        onChangeSection({ value, label });
        updateCurrentValues({ ...values, subsection: '' });
      },
      clearList: { subsection: '' },
    },
    {
      title: 'Подраздел',
      name: 'subsection',
      type: 'select',
      options: subsections.map(option => ({ value: option.id, label: option.name })),
      onChange: (values, { value, label }) => {
        setSelectedSubsection({ value, label });
        updateCurrentValues(values);
      },
    },
    {
      title: 'Производитель',
      name: 'manufacturer',
      type: 'select',
      options: productManufacturers.map(({ name }) => ({ value: name, label: name })),
      onChange: updateCurrentValues,
    },
    {
      title: 'Цена',
      type: 'range',
      name: 'Price',
      onChange: updateCurrentValues,
      fields: [
        { title: 'от', range: 'min' },
        { title: 'до', range: 'max' },
      ],
    },
    {
      type: 'rate',
      name: 'rates',
      fields: [
        {
          title: 'Рейтинг товара',
          initialValue: bufferFilters.rating,
          name: 'rating',
          setRate: value => {
            setFilters(prevFilters => ({ ...prevFilters, rating: value }));
          },
        },
        {
          title: 'Рейтинг продавца',
          initialValue: bufferFilters.companyRating,
          name: 'companyRating',
          setRate: value => {
            setFilters(prevFilters => ({ ...prevFilters, companyRating: value }));
          },
        },
      ],
    },
    {
      type: 'checkbox',
      label: 'Бесплатная доставка',
      name: 'freeDelivery',
      reference: 'Добавьте адрес компании чтобы найти товары с бесплатной доставкой',
      disabled: !mainCompanyId,
      onChange: value => {
        setFilters(prevFilters => ({ ...prevFilters, freeDelivery: value }));
      },
      checked: filters.freeDelivery,
    },
    {
      type: 'checkbox',
      label: 'Новинки',
      name: 'newest',
      onChange: value => {
        setFilters(prevFilters => ({ ...prevFilters, newest: value }));
      },
      checked: filters.newest,
    },
    {
      title: 'НДС',
      name: 'vatPresence',
      type: 'select',
      options: vatOption,
      onChange: (_, { value }) => {
        setFilters(prevFilters => ({ ...prevFilters, vatPresence: value }));
      },
    },
    // TODO: need fix after BE tasks
    // ...(specificFiltersWithOptionsNew.length
    //   ? [
    //       {
    //         type: 'title',
    //         title: 'Специализированные фильтры',
    //       },
    //       ...specificFiltersWithOptionsNew,
    //     ]
    //   : []),
  ];

  return (
    <FiltersContainer>
      <FiltersHeader>
        <FiltersTitle>Фильтры</FiltersTitle>
        <Button
          label="Сбросить все фильтры"
          variant="hollow"
          size="small"
          onClick={handleClearFilter}
        />
      </FiltersHeader>
      <FiltersContent
        fields={fields}
        key={key}
        lastChangedInput={lastChangedInput}
        setLastChangedInput={setLastChangedInput}
        onSubmit={onSubmit}
        specificFilters={specificFiltersWithOptionsNew}
        productsAmount={totalCount}
        isLoading={loading}
        initialValues={{
          currentCategory,
          subcategory,
          section,
          subsection,
          manufacturer,
          minPrice,
          maxPrice,
          vatPresence,
        }}
      />
    </FiltersContainer>
  );
};

export default Filters;
