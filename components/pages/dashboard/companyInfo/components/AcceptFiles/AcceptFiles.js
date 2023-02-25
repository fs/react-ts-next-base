import React from 'react';

import AcceptFilesUpload from './AcceptFilesUpload';

import { AcceptFilesTitle, AcceptFilesInfo, AcceptFilesCondition } from './styled';

const AcceptFiles = ({ values, setFieldValue }) => {
  return (
    <>
      <AcceptFilesTitle>Подтверждающие фото и видео</AcceptFilesTitle>
      <AcceptFilesInfo>
        Загрузите фото и видео вашего производства, чтобы подтвердить существование вашей компании.
        <br />
        Необходимы фото снаружи(вход, общий вид объекта), фото внутри, режимник, сертификат(ы)
        разрешающий изготовление продукции, фото документов подтверждающие открытие компании, план
        объекта, видеообращение руководителя компании к сайту.
      </AcceptFilesInfo>

      <AcceptFilesUpload
        name="companyConfirmationRecords"
        setFieldValue={setFieldValue}
        values={values}
      />
      <AcceptFilesCondition>
        <div>Доступные форматы загрузки: jpeg, png, pdf, bmp, mpg-4, avi, mov, mkv.</div>
        <div>Размер загружаемых файлов не должен превышать 20 Мб/видео и 2 Мб/файл или фото</div>
      </AcceptFilesCondition>
    </>
  );
};

export default AcceptFiles;
