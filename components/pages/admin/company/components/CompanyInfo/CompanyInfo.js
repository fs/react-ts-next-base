import React, { useMemo } from 'react';
import useRouter from 'hooks/useRouter';
import { useModal } from '@ebay/nice-modal-react';

import {
  useAddCompanyToBlackList,
  useBanCompany,
  useRemoveCompanyFromBlacklist,
  useUnbanCompany,
} from 'lib/apollo/hooks/actions/companies';
import useNotifier from 'hooks/useNotifier';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import Fieldset from 'components/shared/atoms/Fieldset';
import LogoCompany from 'components/shared/atoms/LogoCompany';
import FilesSection from 'components/shared/molecules/FilesSection';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import { LogoWrapper } from 'components/pages/company/components/CompanyMainInfo/styled';
import { SectionTitle } from 'components/pages/admin/confirmProduct/components/styled';

import { BUYER, getCompanyDirection, SELLER } from 'config/constants/directions';
import {
  BANNED,
  BLACKLISTED,
  DELETED,
  DELETED_BY_CLIENT,
  OWNER_BLOCKED,
} from 'config/constants/status';
import { ADMIN_COMPANIES } from 'config/routes';

import {
  Col,
  CompanyDetails,
  Direction,
  Name,
} from 'components/shared/molecules/AdminCompanyInfo/styled';

import { getFields } from './utils';
import { initialReasonForBun, validationSchemaReasonForBun } from './config';

import ModalInput from './ModalInput/ModalInput';

import {
  SectionColumn,
  SectionHeader,
  SectionRow,
  SectionWrapper,
  Warning,
  ActionsWrapper,
} from './styled';

const CompanyInfo = ({ company }) => {
  const fields = getFields(company);
  const {
    direction,
    unofficialName,
    companyConfirmationRecords,
    id: companyId,
    status,
    deletionReason,
  } = company;

  const { pushRoute } = useRouter();
  const { setSuccess } = useNotifier();

  const onMoveToCompanyTab = () => {
    pushRoute({
      pathname: ADMIN_COMPANIES,
      query: {
        tab: direction === SELLER ? SELLER : BUYER,
      },
    });
  };

  const [confirmCompanyToBlackList] = useAddCompanyToBlackList({
    companyName: unofficialName,
    onSubmit: () =>
      pushRoute({
        pathname: ADMIN_COMPANIES,
        query: {
          tab: BLACKLISTED,
        },
      }),
  });
  const [removeCompanyFromBlackList] = useRemoveCompanyFromBlacklist({
    companyName: unofficialName,
    onSubmit: onMoveToCompanyTab,
  });
  const [banCompany] = useBanCompany({
    companyName: unofficialName,
    onSubmit: () =>
      pushRoute({
        pathname: ADMIN_COMPANIES,
        query: {
          tab: DELETED,
        },
      }),
  });
  const [unbanCompany] = useUnbanCompany({
    onSubmit: () => {
      setSuccess(
        deletionReason === BANNED
          ? `Компания ${unofficialName} разблокирована`
          : `Компания ${unofficialName} восстановлена`,
      );
      onMoveToCompanyTab();
    },
  });
  const addCompanyToBlackListModal = useModal(SimpleModal);
  const removeCompanyFromBlackListModal = useModal(SimpleModal);
  const banCompanyModal = useModal(SimpleModal);
  const unbanCompanyModal = useModal(SimpleModal);
  const restoreCompanyModal = useModal(SimpleModal);

  const showAddCompanyToBlackList = () => {
    addCompanyToBlackListModal.show({
      variant: 'change',
      roundedButton: true,
      onSubmit: async () => {
        await confirmCompanyToBlackList({ companyId });
      },
      title: 'Добавление компании в черный список',
      description: 'Нажимая “Подтвердить”, вы добавляете компанию в черный список.',
    });
  };

  const showRemoveCompanyFromBlackList = () => {
    removeCompanyFromBlackListModal.show({
      roundedButton: true,
      onSubmit: async () => {
        await removeCompanyFromBlackList({ companyId });
      },
      title: 'Удаление компании из черного списка',
      description: 'Нажимая “Подтвердить”, вы удаляете компанию из черного списка. ',
    });
  };

  const showBanCompany = () => {
    banCompanyModal.show({
      variant: 'alert',
      roundedButton: true,
      onSubmit: async values => {
        await banCompany({ companyId, deletionMessage: values.reason });
      },
      title: 'Блокировка компании',
      description: 'Нажимая “Заблокировать”, вы  удаляете компанию с сайта',
      acceptText: 'Заблокировать',
      form: {
        body: <ModalInput />,
        initialValues: initialReasonForBun,
        validationSchema: validationSchemaReasonForBun,
      },
    });
  };

  const showUnbanCompany = () => {
    unbanCompanyModal.show({
      roundedButton: true,
      onSubmit: async () => {
        await unbanCompany({ companyId });
      },
      title: 'Разблокировать компанию',
      description: 'Нажимая “Разблокировать”, вы  вернете компанию на сайт',
      acceptText: 'Разблокировать',
    });
  };

  const showRestoreCompany = () => {
    restoreCompanyModal.show({
      roundedButton: true,
      onSubmit: async () => {
        await unbanCompany({ companyId });
      },
      title: 'Восстановить компанию',
      description: 'Нажимая “Восстановить”, вы  вернете компанию на сайт',
      acceptText: 'Восстановить',
    });
  };

  const actionButtons = useMemo(() => {
    switch (deletionReason) {
      case BANNED:
        return (
          <Button
            label="Разблокировать"
            shape="rounded"
            testId="unban-company-button"
            onClick={showUnbanCompany}
          />
        );
      case DELETED_BY_CLIENT:
        return (
          <>
            <Warning>
              <Icon name="exclamation-square" $size={24} $mr={20} $color="orange" />
              Внимание! Эта компания была удалена ее руководителем.
            </Warning>
            <Button
              label="Восстановить"
              testId="restore-company-button"
              onClick={showRestoreCompany}
            />
          </>
        );
      case OWNER_BLOCKED:
        return (
          <Warning>
            <Icon name="exclamation-square" $size={24} $mr={20} $color="orange" />
            Вы не можете восстановить компанию, так как ее руководитель был заблокирован.
          </Warning>
        );
      default:
        break;
    }

    if (status === BLACKLISTED) {
      return (
        <Button
          label="Удалить из черного списка"
          shape="rounded"
          testId="remove-from-black-list-button"
          onClick={showRemoveCompanyFromBlackList}
        />
      );
    }

    return (
      <>
        <Button
          label="Добавить в черный список"
          variant="change"
          shape="rounded"
          testId="add-to-black-list-button"
          onClick={showAddCompanyToBlackList}
        />
        <Button
          label="Заблокировать"
          variant="alert"
          shape="rounded"
          testId="ban-company-button"
          onClick={showBanCompany}
        />
      </>
    );
  }, [status, deletionReason]);

  return (
    <SectionWrapper>
      <SectionHeader>Данные о компании</SectionHeader>

      <SectionRow>
        <CompanyDetails>
          <LogoWrapper>
            <LogoCompany company={company} />
          </LogoWrapper>

          <Col>
            <Name>{unofficialName}</Name>
            <Direction>
              Статус:&nbsp;<strong>{getCompanyDirection(direction)}</strong>
            </Direction>
          </Col>
        </CompanyDetails>
      </SectionRow>
      <SectionRow>
        {fields.map(({ name, value, title, width }) => (
          <Fieldset legend={title} $width={width || `100%`} key={`key-${name}`}>
            {value}
          </Fieldset>
        ))}
      </SectionRow>
      <SectionColumn>
        <SectionTitle> Логотип компании</SectionTitle>
        <LogoWrapper>
          <LogoCompany company={company} />
        </LogoWrapper>
      </SectionColumn>

      <SectionRow>
        <FilesSection
          title="Подтверждающие фото и видео"
          isTitleBold
          type="attachment"
          files={companyConfirmationRecords}
        />
      </SectionRow>

      <ActionsWrapper>{actionButtons}</ActionsWrapper>
    </SectionWrapper>
  );
};

export default CompanyInfo;
