import { CategoryInfoFragment } from 'graphql/fragments/__generated__/categoryInfo.generated';

export type TCategories = {
  category?: CategoryInfoFragment & {
    parent?: CategoryInfoFragment | null;
  };
};
