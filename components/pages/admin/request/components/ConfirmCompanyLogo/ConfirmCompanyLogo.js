import React from 'react';

import Photo from 'components/shared/molecules/Photos/Photo';

import CommentToggler from '../CommentToggler';
import CommentRejection from '../CommentRejection';

import { ConfirmCompanyLogoWrapper, Row, Title, PhotoWrapper } from './styled';

const ConfirmCompanyLogo = ({ name, logo, values, isEditable }) => {
  const { comment } = values;
  const isOpen = comment[name];

  return (
    <ConfirmCompanyLogoWrapper>
      <Row>
        <Title>
          Логотип
          <br />
          компании
        </Title>

        <PhotoWrapper>
          <Photo name="logo" url={logo} editable={false} />
        </PhotoWrapper>

        {isEditable && <CommentToggler name={name} />}
      </Row>
      {isOpen && <CommentRejection name={name} />}
    </ConfirmCompanyLogoWrapper>
  );
};

export default ConfirmCompanyLogo;
