export const getFieldsVariants = (variant = {}) => {
  const { id, price, stock, minShipmentLot, wholesalePrice } = variant;

  return [
    {
      name: 'id',
      initialValue: id,
      value: id,
    },
    {
      name: 'price',
      initialValue: price || undefined,
    },
    {
      name: 'stock',
      initialValue: stock || undefined,
    },
    {
      name: 'minShipmentLot',
      initialValue: minShipmentLot || undefined,
    },
    {
      name: 'wholesalePrice',
      initialValue: wholesalePrice || undefined,
    },
  ];
};
