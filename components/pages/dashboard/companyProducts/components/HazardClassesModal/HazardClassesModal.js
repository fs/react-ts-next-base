import React, { useState } from 'react';

import ModalWindow from 'components/shared/atoms/ModalWindow';

import hazardClasses from './hazardClasses';
import HazardClassesGroup from './HazardClassesGroup';

import { Header, Link } from './styled';

const HazardClassesModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Link onClick={() => setIsOpen(true)} data-testid="hazard-classes-modal-button">
        Подробнее <br />о классах опасности
      </Link>

      <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} $width="45.875rem">
        <Header data-testid="hazard-classes-title">Классы опасности</Header>
        {hazardClasses.map((group, i) => (
          <HazardClassesGroup group={group} key={i} />
        ))}
      </ModalWindow>
    </>
  );
};

export default HazardClassesModal;
