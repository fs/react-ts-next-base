import React, { useState } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

import Button from 'components/shared/atoms/Button';
import ActionLink from 'components/shared/atoms/ActionLink';
import ModalWindow from 'components/shared/atoms/ModalWindow';

import { useRequestDisputeSupport } from 'lib/apollo/hooks/actions/dispute';

import { TRequestDisputeHelpModal } from './types';
import { Description, LeftColumn, Wrapper, RightColumn, Text, Title, Logo, Block } from './styled';

const RequestDisputeHelpModal = NiceModal.create<TRequestDisputeHelpModal>(({ disputeId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestDisputeSupport] = useRequestDisputeSupport({});

  const { visible, remove } = useModal();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await requestDisputeSupport({ disputeId });
    setIsSubmitting(false);
    remove();
  };

  return (
    <ModalWindow isOpen={visible} setIsOpen={remove} isClosable={!isSubmitting} padding={0}>
      <Wrapper>
        <LeftColumn>
          <div>
            <Logo src={`${process.env.ASSET_HOST}/images/main-logo-white.png`} alt="mainLogo" />
            <Description>
              Команда Medagregator оперативно поможет вам в сложной ситуации. Если вы не можете
              договориться и прийти к удобному для обоих сторон решению спора, мы приложим все
              усилия для решения этой ситуации.
            </Description>
          </div>
          <div>
            <Block />
            <ActionLink onClick={remove} $color="white">
              Вернуться к спору
            </ActionLink>
          </div>
        </LeftColumn>
        <RightColumn>
          <div>
            <Title> Внимательно ознакомьтесь с условиями </Title>
            <Text>
              Если вы попросите помощи Medagregator, спор автоматически заблокируется и вы не
              сможете его редактировать и менять ранее принятые вами решения. Мы свяжемся с обоими
              сторона в течение указанного времени. В итоге будет принято удобное для обоих сторон
              решение спора.
            </Text>
          </div>
          <Button
            testId="request-dispute-support-button"
            $width="8.75rem"
            label="Принять"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          />
        </RightColumn>
      </Wrapper>
    </ModalWindow>
  );
});

export default RequestDisputeHelpModal;
