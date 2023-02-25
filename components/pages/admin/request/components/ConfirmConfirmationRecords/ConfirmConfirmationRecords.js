import React from 'react';

import Photos from 'components/shared/molecules/Photos';

import CommentRejection from '../CommentRejection';
import CommentToggler from '../CommentToggler';

import {
  ConfirmationRecordsWrapper,
  Title,
  Description,
  PhotosWrapper,
  TogglerWrapper,
} from './styled';

const ConfirmConfirmationRecords = ({ name, companyConfirmationRecords, values, isEditable }) => {
  const { comment } = values;
  const isOpen = comment[name];

  return (
    <ConfirmationRecordsWrapper>
      <Title>Подтверждающие фото и видео</Title>
      <Description>
        Фото и видео, подтверждающие существование компании. <br />
        Необходимы фото снаружи(вход, общий вид объекта), фото внутри, режимник, домовой знак,
        сертификат(ы) разрешающий(е) изготовление или продажу продукции, фото документов
        подтверждающие открытие компании.
      </Description>
      {companyConfirmationRecords.length ? (
        <PhotosWrapper>
          <Photos images={companyConfirmationRecords} editable={false} />

          {isEditable && (
            <TogglerWrapper>
              <CommentToggler name={name} />
            </TogglerWrapper>
          )}
        </PhotosWrapper>
      ) : (
        'Отсутствуют'
      )}
      {isOpen && <CommentRejection name={name} />}
    </ConfirmationRecordsWrapper>
  );
};

export default ConfirmConfirmationRecords;
