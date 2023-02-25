import React from 'react';

import { AGREEMENT, CONTRACT } from 'config/routes';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import ActionLink from 'components/shared/atoms/ActionLink';

import { DocumentsWrapper, DocumentWrapper, DocumentInfo, LinkWrap } from './styled';

const Documents = () => {
  const documents = [
    {
      label: 'Агентский договор коммерческого представительства',
      icon: <Icon name="contract" $size={66} $color="blue" />,
      url: CONTRACT,
    },
    {
      label: 'Соглашение с политикой обработки персональных данных',
      icon: <Icon name="agreement" $size={66} $color="blue" />,
      url: AGREEMENT,
    },
  ];

  return (
    <DocumentsWrapper>
      {documents.map(({ label, icon, url }, i) => {
        return (
          <DocumentWrapper key={i}>
            {icon}
            <DocumentInfo>
              <LinkWrap>
                <ActionLink href={url} target="_blank" rel="no-referrer" size={18}>
                  {label}
                </ActionLink>
              </LinkWrap>
              <Button
                label="Подробнее"
                variant="primary"
                href={url}
                target="_blank"
                rel="no-referrer"
              />
            </DocumentInfo>
          </DocumentWrapper>
        );
      })}
    </DocumentsWrapper>
  );
};

export default Documents;
