export const mockDeepCategories = [
  {
    __typename: 'Category',
    parent: {
      __typename: 'Category',
      parent: {
        __typename: 'Category',
        parent: null,
        depth: 0,
        id: '4',
        name: 'Медицинские расходные материал',
        position: 4,
        canDestroy: {
          __typename: 'AuthorizationResult',
          value: false,
          message: 'У вас нет прав для выполнения этого действия',
        },
      },
      depth: 1,
      id: '26',
      name: 'Маски медицинские',
      position: 2,
      canDestroy: {
        __typename: 'AuthorizationResult',
        value: false,
        message: 'У вас нет прав для выполнения этого действия',
      },
    },
    depth: 2,
    id: '234',
    name: 'Маски медецинские детские',
    position: 1,
    canDestroy: {
      __typename: 'AuthorizationResult',
      value: false,
      message: 'У вас нет прав для выполнения этого действия',
    },
  },
];
