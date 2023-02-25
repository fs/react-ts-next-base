import React, { useState } from 'react';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import ModalWindow from 'components/shared/atoms/ModalWindow';

import AddPhotosModalForm from './AddPhotosModalForm';

const AddPhotosModal = ({
  testId,
  onChange,
  onRemovePhoto,
  loading,
  setLoading,
  temporaryUrl,
  isDisabled,
  documentFormats,
  limitUpload = 10,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="dashed-primary"
        size="extra-large"
        shape="extra-rounded"
        iconType="only"
        icon={<Icon name="camera" $color="blue" />}
        onClick={() => setIsOpen(true)}
        testId={testId}
        disabled={isDisabled}
      />
      <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} $width="min-content">
        <AddPhotosModalForm
          temporaryUrl={temporaryUrl}
          onRemovePhoto={onRemovePhoto}
          onChange={onChange}
          setIsOpen={setIsOpen}
          loading={loading}
          setLoading={setLoading}
          documentFormats={documentFormats}
          testId={testId}
          limitUpload={limitUpload}
        />
      </ModalWindow>
    </>
  );
};

export default AddPhotosModal;
