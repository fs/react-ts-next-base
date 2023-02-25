import { dateFormat } from 'helpers';
import React from 'react';
import { orderInvoiceTitles, orderInvoiceType } from './constants';

import DocumentItem from './DocumentItem';

import { DocumentsWrapper, Title, AccountsWrapper } from './styled';

const TransferDocuments = ({ operation, context }) => {
  const { createdAt, company, applicationUrl, invoice } = operation;
  const formattedDate = dateFormat(createdAt).split('.').join('-');
  const legalFormShortName = company?.legalForm?.shortName;
  const officialName = company?.officialName;

  return (
    <DocumentsWrapper>
      <AccountsWrapper>
        <Title>Заявление</Title>
        <DocumentItem
          context={context}
          url={applicationUrl}
          fileName={`${legalFormShortName}'${officialName}'_заявление_${formattedDate}.pdf`}
          title={orderInvoiceTitles[orderInvoiceType.APPLICATION]}
        />
      </AccountsWrapper>

      <AccountsWrapper>
        <Title>Счет</Title>
        <DocumentItem
          context={context}
          url={invoice.url}
          fileName={`${legalFormShortName}'${officialName}'_вывод_средств_${formattedDate}.pdf`}
          title={orderInvoiceTitles[orderInvoiceType.WITHDRAWAL]}
        />
      </AccountsWrapper>
    </DocumentsWrapper>
  );
};

export default TransferDocuments;
