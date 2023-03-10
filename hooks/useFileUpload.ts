import { ImageUploader, Presign } from 'graphql/types';

export const useFileUpload = () => {
  const uploadFile = async ({ fields, url }: Presign, file: File): Promise<ImageUploader> => {
    const keyField = fields.find(({ key }) => key === 'key');

    if (!keyField) {
      throw new Error('Field with key="key" not found');
    }

    const [storage, id] = keyField.value.split('/');

    const formData = new FormData();
    fields.forEach(({ key, value }) => {
      formData.append(key, value);
    });
    formData.append('file', file);

    await fetch(url, {
      method: 'POST',
      body: formData,
    });
    return {
      storage,
      id,
      metadata: {
        size: file.size,
        filename: file.name,
        mimeType: file.type,
      },
    };
  };

  return [uploadFile] as const;
};
