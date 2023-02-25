import React from 'react';

import Button from 'components/shared/atoms/Button';

import { ActionsWrapper } from './styled';

const EditAdminAccountButtons = ({ editable, onToggleEditable, isSubmitting }) => {
  return (
    <ActionsWrapper>
      <Button
        label="Редактировать"
        disabled={isSubmitting}
        size="small"
        shape="rounded"
        testId="edit-profile-button"
        onClick={onToggleEditable}
        isLoading={isSubmitting}
      />
      <Button
        label="Сохранить"
        variant="confirm"
        size="small"
        shape="rounded"
        disabled={isSubmitting || !editable}
        type="submit"
        testId="submit-profile-button"
        isLoading={isSubmitting}
      />
    </ActionsWrapper>
  );
};

export default EditAdminAccountButtons;
