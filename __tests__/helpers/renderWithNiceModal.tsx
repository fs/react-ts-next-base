import React, { ReactElement } from 'react';
import NiceModal from '@ebay/nice-modal-react';

export default function renderWithNiceModal(component: ReactElement): ReactElement {
  return <NiceModal.Provider>{component}</NiceModal.Provider>;
}
