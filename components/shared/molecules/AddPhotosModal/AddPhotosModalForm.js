import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import Photos from 'components/shared/molecules/Photos';
import FileInput from 'components/shared/molecules/FileInput';

import { Wrapper, AddPhoto, Text, ButtonWrapper } from './styled';

const AddPhotosModalForm = ({
  temporaryUrl = [],
  setIsOpen,
  onChange,
  onRemovePhoto,
  loading = false,
  setLoading,
  documentFormats = ['photo'],
  testId,
  limitUpload,
}) => {
  const typeNamesMapper = {
    photo: 'фотографии',
    video: 'видео',
    pdf: 'документы',
  };

  return (
    <Wrapper>
      <Formik>
        <FormikForm>
          <AddPhoto>
            <Icon name="camera-add" $size={48} $color="greyCC" />
            <Text>
              Перетащите{' '}
              {documentFormats.length > 1 ? 'файлы' : typeNamesMapper[documentFormats[0]]} сюда{' '}
              <br />
              или кликните чтобы выбрать
            </Text>
            <FileInput
              name="load-photo-input"
              testId={`load-photo-input--${testId}`}
              action={onChange}
              setLoading={setLoading}
              format={documentFormats}
              disabled={loading}
              limitUpload={limitUpload}
            />
          </AddPhoto>
          <ButtonWrapper noPhotos={!temporaryUrl.length && !loading}>
            {!temporaryUrl.length && !loading && <span>или</span>}
            <Button label="Загрузите файлы" testId="add-photo-button" isLoading={loading}>
              <FileInput
                name="load-photo-input-button"
                testId={`load-photo-input-button--${testId}`}
                action={onChange}
                setLoading={setLoading}
                format={documentFormats}
                disabled={loading}
                limitUpload={limitUpload}
              />
            </Button>
          </ButtonWrapper>

          <Photos loading={loading} images={temporaryUrl} onRemovePhoto={onRemovePhoto} $mt={16} />

          {(!!temporaryUrl.length || loading) && (
            <ButtonWrapper>
              <Button
                label="Подтвердить"
                onClick={() => setIsOpen(false)}
                testId={`add-photo-submit-button--${testId}`}
              />
            </ButtonWrapper>
          )}
        </FormikForm>
      </Formik>
    </Wrapper>
  );
};

export default AddPhotosModalForm;
