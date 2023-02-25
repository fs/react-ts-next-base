import { dateFormat } from 'helpers';
import React from 'react';
import { orderInvoiceTitles, orderInvoiceType } from './constants';

import DocumentItem from './DocumentItem';

import { DocumentsWrapper, Title, AccountsWrapper } from './styled';

const constructFileName = ({ type, number, date }) => {
  const formattedDate = dateFormat(date).split('.').join('-');

  let nameBody;
  switch (type) {
    case orderInvoiceType.CONTRACT:
      nameBody = 'эл_договор';
      break;
    case orderInvoiceType.AGENCY_FEE:
      nameBody = 'агентские';
      break;
    case orderInvoiceType.DELIVERY:
      nameBody = 'оплата_доставки';
      break;
    case orderInvoiceType.PRODUCT:
      nameBody = 'оплата_товара';
      break;
    default:
      nameBody = '';
  }

  return `Заказ${number}_${nameBody}_${formattedDate}.pdf`;
};

const OrderDocuments = ({ order, context }) => {
  const { id, pickupDate, contract } = order;
  return (
    <DocumentsWrapper>
      <Title>Электронный договор</Title>
      <DocumentItem
        context={context}
        url={contract.url}
        fileName={constructFileName({
          type: orderInvoiceType.CONTRACT,
          number: id,
          date: pickupDate,
        })}
        title={orderInvoiceTitles[orderInvoiceType.CONTRACT]}
      />
      <AccountsWrapper>
        <Title>Счета</Title>
        {order?.invoices?.map(({ url, invoiceType }, i) => {
          const fileName = constructFileName({
            type: invoiceType,
            number: id,
            date: pickupDate,
          });
          return (
            <DocumentItem
              context={context}
              url={url}
              fileName={fileName}
              title={orderInvoiceTitles[invoiceType]}
              key={i}
            />
          );
        })}
      </AccountsWrapper>
    </DocumentsWrapper>
  );
};

export default OrderDocuments;
