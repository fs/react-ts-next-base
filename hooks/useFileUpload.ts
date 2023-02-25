import { Presign, Uploader } from 'graphql/types';

export const useFileUpload = (): [(variables: Presign, file: File) => Promise<Uploader | null>] => {
  const uploadFile = async ({ fields, url, headers, presignMethod }: Presign, file: File) => {
    if (fields.length > 0 && url) {
      const [storage, id] = fields.find(({ key }) => key === 'key')?.value.split('/') || [];

      const formData = new FormData();
      fields.forEach(({ key, value }) => {
        formData.append(key, value);
      });
      formData.append('file', file);

      const fetchParams =
        presignMethod === 'PUT'
          ? {
              method: presignMethod,
              body: formData.get('file'),
              headers: headers.reduce((obj, { name, value }) => ({ ...obj, [name]: value }), {}),
            }
          : {
              method: presignMethod,
              body: formData,
            };

      try {
        await fetch(url, fetchParams);
        return {
          id,
          metadata: {
            size: file.size,
            filename: file.name,
            mimeType: file.type,
          },
          storage,
        };
      } catch (e) {
        return Promise.reject(e);
      }
    }

    return null;
  };

  return [uploadFile];
};
