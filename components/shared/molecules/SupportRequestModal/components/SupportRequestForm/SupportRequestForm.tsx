import React, { useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';

import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';
import Photos from 'components/shared/molecules/Photos';
import FileInput from 'components/shared/molecules/FileInput';

import { TSupportRequestForm } from '../../types';
import { FileContainer, FileNotes, ButtonWrapper } from './styled';
import {
  publicInitialValues,
  initialValues,
  publicValidation,
  validation,
  publicFields,
  fields,
} from './fields';

const SupportRequestForm: React.FunctionComponent<TSupportRequestForm> = ({
  onSubmit,
  onRemovePhoto,
  onAddPhoto,
  temporaryUrls,
  isGuest = false,
  initialSubject,
}) => {
  const [loading, setLoading] = useState(false);
  const limitPhotos = 10;
  const islimitPhotosExceeded = temporaryUrls.length >= limitPhotos;

  const formInitialValues = isGuest
    ? publicInitialValues(initialSubject)
    : initialValues(initialSubject);
  const validationSchema = isGuest ? publicValidation : validation;
  const formFields = isGuest ? publicFields : fields;

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={formInitialValues}
        validationSchema={Yup.object().shape(validationSchema)}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, status, values }) => (
          <FormikForm>
            {formFields.map(({ type, name, testId, title, placeholder }, i) => {
              return (
                <div key={i}>
                  <Input
                    type={type}
                    name={name}
                    testId={testId}
                    title={title}
                    placeholder={placeholder}
                  />
                </div>
              );
            })}

            <FileContainer>
              <Button disabled={islimitPhotosExceeded} label="Прикрепить" isLoading={loading}>
                {!islimitPhotosExceeded && (
                  <FileInput
                    name="help-file-input"
                    testId="help-file-input"
                    action={onAddPhoto}
                    setLoading={setLoading}
                    format={['photo', 'pdf']}
                    disabled={loading}
                    limitUpload={limitPhotos - temporaryUrls.length}
                  />
                )}
              </Button>
              <FileNotes>
                Размер загружаемых файлов <br />
                не должен превышать 2 Мб/файл или фото
              </FileNotes>
            </FileContainer>

            <Photos loading={loading} images={temporaryUrls} onRemovePhoto={onRemovePhoto} />

            <ButtonWrapper>
              <Button
                label="Отправить"
                type="submit"
                testId="submit-button"
                disabled={isSubmitting || Object.values(values).some(item => !item)}
                isLoading={isSubmitting}
              />
            </ButtonWrapper>

            {!!status && <div>{status}</div>}
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default SupportRequestForm;
