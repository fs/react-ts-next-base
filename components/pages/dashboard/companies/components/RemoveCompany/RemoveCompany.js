import React, { useMemo } from 'react';
import { useModal } from '@ebay/nice-modal-react';

import { useDestroyCompany } from 'lib/apollo/hooks/actions/companies';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import Tooltip from 'components/shared/atoms/Tooltip';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import { TooltipWrapper } from './styled';

const RemoveCompany = ({
  companyId,
  companyName,
  lastEmployeeMembers,
  main,
  refetchCompaniesCheck,
}) => {
  const [destroyCompany] = useDestroyCompany({
    companyName,
    companyId,
    onSubmit: refetchCompaniesCheck,
  });
  const destroyCompanyModal = useModal(SimpleModal);

  const onRemoveCompanyAlertMessage = useMemo(() => {
    const lastEmployeeMembersEmails = lastEmployeeMembers.map(employee => employee.user.email);

    switch (lastEmployeeMembersEmails.length) {
      case 0:
        return 'Все добавленные пользователи, имеющие доступ к этой компании, потеряют на нее права.';
      case 1:
        return (
          <>
            Пользователь <strong>{lastEmployeeMembersEmails[0]}</strong>, имеющий доступ только к
            этой компании, будет удален.
          </>
        );
      default:
        return (
          <>
            Пользователи <strong>{lastEmployeeMembersEmails.map(email => email).join(', ')}</strong>
            , имеющие доступ только к этой компании, будут удалены.
          </>
        );
    }
  }, [lastEmployeeMembers]);

  const showRemoveCompany = () => {
    destroyCompanyModal.show({
      onSubmit: async () => {
        await destroyCompany(companyId);
      },
      title: 'Удаление компании',
      description: (
        <>
          Вы уверены что вы хотите удалить компанию <strong>{companyName}</strong>?
        </>
      ),
      subDescription: onRemoveCompanyAlertMessage,
    });
  };

  return (
    <>
      {main ? (
        <TooltipWrapper>
          <Tooltip text="Удаление данной компании невозможно, так как она является основной. Если вы хотите удалить компанию, выберите другую компанию основной.">
            <Button
              label="Удалить компанию"
              variant="change"
              iconType="leading"
              icon={<Icon name="trash-bin" $color="white" />}
              $width="100%"
              size="small"
              testId="button-remove-company"
              disabled
            />
          </Tooltip>
        </TooltipWrapper>
      ) : (
        <Button
          label="Удалить компанию"
          variant="change"
          iconType="leading"
          icon={<Icon name="trash-bin" $color="white" />}
          $width="100%"
          size="small"
          testId="button-remove-company"
          onClick={showRemoveCompany}
        />
      )}
    </>
  );
};

export default RemoveCompany;
