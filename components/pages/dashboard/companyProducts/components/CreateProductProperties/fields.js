export const getFieldsVariants = (variant = {}) => {
  const {
    id: variantId,
    expirationDate,
    variantProperties,
    variantCertificates,
    variantInstructions,
    variantPhotos,
    unitQuantity,
  } = variant;

  return [
    {
      name: 'id',
      initialValue: variantId,
      value: variantId,
    },
    {
      name: 'initial',
      initialValue: true,
    },
    {
      name: 'unitQuantity',
      initialValue: unitQuantity,
    },
    {
      name: 'expirationDate',
      initialValue: expirationDate ? new Date(expirationDate).toISOString() : null,
    },
    {
      name: 'variantCertificates',
      initialValue: variantCertificates.map(({ id, attachmentUrl }) => ({
        image: { id, url: attachmentUrl },
      })),
    },
    {
      name: 'variantInstructions',
      initialValue: variantInstructions.map(({ id, attachmentUrl }) => ({
        image: { id, url: attachmentUrl },
      })),
    },
    {
      name: 'variantPhotos',
      initialValue: variantPhotos.map(({ id, imageUrl }) => ({ image: { id, url: imageUrl } })),
    },
    {
      name: 'variantProperties',
      initialValue: variantProperties.map(
        ({
          integerValue,
          dictionaryPropertyOption,
          stringValue,
          property: { __typename: type },
          property,
        }) => ({
          propertyType: type,
          propertyId: property.id,
          propertyLabel: property.displayName,
          propertyValue: dictionaryPropertyOption
            ? dictionaryPropertyOption.id
            : integerValue || stringValue,
        }),
      ),
    },
  ];
};
