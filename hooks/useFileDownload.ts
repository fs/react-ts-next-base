import { useCallback, useState } from 'react';
import { TUseFileDownload, actionType } from './types';

const useFileDownload = ({ ctx, url, fileName }: TUseFileDownload) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const accessToken = ctx?.accessTokenManager?.accessToken;

  const fetchParams = accessToken
    ? {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    : undefined;

  const fetchDocument = useCallback(
    (type: `${actionType}`) => {
      setIsSubmitting(true);
      try {
        fetch(url, fetchParams)
          .then(res => (res.status === 200 ? res.blob() : undefined))
          .then(blob => {
            if (!blob) return;

            const blobUrl = window.URL.createObjectURL(blob);

            if (type === 'download') {
              const downloadLink = document.createElement('a');
              downloadLink.style.display = 'none';
              downloadLink.href = blobUrl;
              downloadLink.setAttribute('download', fileName);

              document.body.appendChild(downloadLink);
              downloadLink.click();
              document.body.removeChild(downloadLink);
            }

            if (type === 'open') {
              window.open(blobUrl, '_blank');
            }
          });
      } catch (error) {
        console.error(error);
      }
      setIsSubmitting(false);
    },
    [url, fetchParams],
  );

  return [fetchDocument, isSubmitting] as const;
};
export default useFileDownload;
