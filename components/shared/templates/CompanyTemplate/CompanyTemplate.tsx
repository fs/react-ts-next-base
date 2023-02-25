import React from 'react';

import { DASHBOARD } from 'config/routes';

import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import CompanySidebar from 'components/shared/molecules/CompanySidebar';
import Dashboard from 'components/shared/organisms/Dashboard';
import LayoutTemplate from 'components/shared/templates/LayoutTemplate';

import { TCompanyTemplate } from './types';

const CompanyTemplate: React.FunctionComponent<TCompanyTemplate> = ({
  children,
  testId,
  company,
}) => {
  const { direction } = company || {};

  return (
    <LayoutTemplate testId={testId}>
      <Dashboard
        sidebarContent={
          <div>
            <Breadcrumbs
              url={DASHBOARD}
              params={{ direction }}
              text="Вернуться к списку компаний"
              testId="breadcrumbs-company-sidebar"
              variant="light"
            />
            {company && <CompanySidebar company={company} />}
          </div>
        }
      >
        {children}
      </Dashboard>
    </LayoutTemplate>
  );
};

export default CompanyTemplate;
