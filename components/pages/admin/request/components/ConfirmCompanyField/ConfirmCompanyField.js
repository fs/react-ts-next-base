import React from 'react';

import CommentRejection from '../CommentRejection';
import CommentToggler from '../CommentToggler';

import { ConfirmCompanyFieldWrapper, Col, ValueWrapper, Title } from './styled';

const ConfirmCompanyField = ({ field, values, isEditable }) => {
  const { name, value, title, width } = field;
  const isOpen = values.comment[name];

  return (
    <ConfirmCompanyFieldWrapper width={width}>
      <Col>
        <ValueWrapper isOpen={isOpen}>
          {value}
          <Title>{title}</Title>
        </ValueWrapper>

        {isOpen && <CommentRejection name={name} />}
      </Col>

      {isEditable && <CommentToggler name={name} />}
    </ConfirmCompanyFieldWrapper>
  );
};

export default ConfirmCompanyField;
