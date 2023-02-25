export const mockPackingMaterials = [
  {
    id: '1',
    name: 'картон',
    __typename: 'PackingMaterial',
  },
  {
    id: '2',
    name: 'полиэтилен',
    __typename: 'PackingMaterial',
  },
  {
    id: '3',
    name: 'стекло',
    __typename: 'PackingMaterial',
  },
];

export const mockPackingMaterialsData = {
  packingMaterials: {
    edges: [
      {
        cursor: '',
        node: {
          id: '1',
          name: 'картон',
          __typename: 'PackingMaterial',
        },
        __typename: 'PackingMaterialEdge',
      },
      {
        cursor: '',
        node: {
          id: '2',
          name: 'полиэтилен',
          __typename: 'PackingMaterial',
        },
        __typename: 'PackingMaterialEdge',
      },
      {
        cursor: '',
        node: {
          id: '3',
          name: 'стекло',
          __typename: 'PackingMaterial',
        },
        __typename: 'PackingMaterialEdge',
      },
    ],
    __typename: 'PackingMaterialConnection',
  },
};
