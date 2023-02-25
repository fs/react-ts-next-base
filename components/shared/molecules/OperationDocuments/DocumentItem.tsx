import React from 'react';

import useFileDownload from 'hooks/useFileDownload';

import Button from 'components/shared/atoms/Button';

import { TDocumentItem } from './types';
import { DocumentContainer, ButtonsWrapper } from './styled';

const DocumentItem: React.FunctionComponent<TDocumentItem> = ({
  context,
  url,
  fileName,
  title,
}) => {
  const [fetchDocument, isSubmitting] = useFileDownload({
    ctx: context,
    url,
    fileName,
  });

  return (
    <DocumentContainer>
      <div data-testid="document-item-title"> {title} </div>
      <ButtonsWrapper>
        <Button
          label="Скачать"
          variant="change"
          $width="8rem"
          onClick={() => fetchDocument('download')}
          testId="download-document-button"
          disabled={!!isSubmitting}
          isLoading={!!isSubmitting}
        />
        <Button
          label="Просмотреть"
          $width="8rem"
          disabled={!!isSubmitting}
          isLoading={!!isSubmitting}
          onClick={() => fetchDocument('open')}
          testId="open-document-button"
        />
      </ButtonsWrapper>
    </DocumentContainer>
  );
};

export default DocumentItem;
