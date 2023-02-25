import { ReturnedShipmentStatusEnum } from 'graphql/types';
import { mockAuthorizationResultSuccess } from './mockAuthorizationResult';

export const mockReturnedShipment = {
  attachments: [
    {
      attachmentUrl: 'https://api.medagregator.ru/order_contracts/313.pdf',
      originalFilename: 'product.png',
      id: '1',
    },
  ],
  endDate: '2022-02-02',
  id: '1',
  rejectComment: 'reject comment',
  startDate: '2022-02-02',
  status: ReturnedShipmentStatusEnum.NotVerified,
  canConfirm: mockAuthorizationResultSuccess,
  canReject: mockAuthorizationResultSuccess,
  canUpdate: mockAuthorizationResultSuccess,
};
