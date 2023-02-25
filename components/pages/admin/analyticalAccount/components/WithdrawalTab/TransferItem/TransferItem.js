import React from 'react';
import { useModal } from '@ebay/nice-modal-react';

import { useAcceptTransfer } from 'lib/apollo/hooks/actions/transferAdmin';

import { ACCOUNT_OPERATION_STATUS } from 'config/constants/accountOperations';
import { numberFormat, dateFormat, timeFormat } from 'helpers';
import { getCompanyDirection } from 'config/constants/directions';
import { ADMIN_ANALYTICAL_ACCOUNT_DOCUMENTS } from 'config/routes';
import { ANALYTICAL_OPERATION } from 'config/constants/analyticalAccount';

import Button from 'components/shared/atoms/Button';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import {
  OperationWrapper,
  LogoWrapper,
  OperationLogo,
  InfoContainer,
  Bold,
  Amount,
  Row,
  ButtonsWrapper,
  ContentWrapper,
  RightColumnWrapper,
} from './styled';

const TransferItem = ({ transfer, isShowLookCheck, refetch = () => {} }) => {
  const {
    id,
    company: { officialName, direction, logoUrl },
    amount,
    transferType,
    createdAt,
    accountOperation: { status },
  } = transfer;

  const canConfirm = status === ACCOUNT_OPERATION_STATUS.PENDING;
  const isIncrease = transferType === 'INCREASE';

  const [acceptTransfer] = useAcceptTransfer({ transferId: id });
  const acceptTransferModal = useModal(SimpleModal);

  const showAcceptTransfer = () =>
    acceptTransferModal.show({
      variant: 'confirm',
      roundedButton: true,
      onSubmit: async () => {
        await acceptTransfer();
        refetch();
      },
      title: 'Вывод средств',
      description: (
        <>
          Нажимая “Подтвердить”, вы списываете средства с Аналитического счета компании{' '}
          <b>{officialName}</b>. После нажатия кнопки “Подтвердить” отправьте счет в бухгалтерию.
        </>
      ),
    });

  return (
    <OperationWrapper>
      <ContentWrapper>
        <LogoWrapper>
          <OperationLogo src={logoUrl} />
        </LogoWrapper>

        <InfoContainer>
          <Row>
            <Bold>{officialName}</Bold>
            <Bold>
              <RightColumnWrapper>
                СУММА: &nbsp;
                <Amount color={isIncrease ? 'green' : 'blue'}>
                  {isIncrease ? '+' : '-'}&nbsp;{numberFormat(amount)} руб.
                </Amount>
              </RightColumnWrapper>
            </Bold>
          </Row>
          <Row>
            <p>● Статус: {getCompanyDirection(direction)}</p>
            <p>
              <RightColumnWrapper>
                Дата запроса: {dateFormat(createdAt)} {timeFormat(createdAt)}
              </RightColumnWrapper>
            </p>
          </Row>
        </InfoContainer>
      </ContentWrapper>

      <ButtonsWrapper>
        {canConfirm && (
          <Button
            label="Подтвердить"
            variant="confirm"
            shape="rounded"
            $width="9rem"
            onClick={showAcceptTransfer}
          />
        )}
        {isShowLookCheck && (
          <Button
            label="Посмотреть счет"
            shape="rounded"
            $width="9rem"
            href={{
              pathname: ADMIN_ANALYTICAL_ACCOUNT_DOCUMENTS,
              query: { type: ANALYTICAL_OPERATION.TRANSFER, id },
            }}
          />
        )}
      </ButtonsWrapper>
    </OperationWrapper>
  );
};

export default TransferItem;
