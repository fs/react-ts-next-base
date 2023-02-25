import React from 'react';
import { TCategories } from './types';

const Categories: React.FC<TCategories> = ({ category = {} }) => {
  const { name, parent } = category;

  return (
    <>
      {parent && (
        <>
          <Categories category={parent} /> /{' '}
        </>
      )}
      {name}
    </>
  );
};

export default Categories;
