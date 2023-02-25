import React, { useEffect, useState } from 'react';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';

import { TNotification } from './types';
import { NotificationWrapper, Content, Text } from './styled';

const Notification: React.FunctionComponent<TNotification> = ({
  text,
  isShow = true,
  ...props
}) => {
  const [isShowNotification, setIsShowNotification] = useState<boolean>(false);

  useEffect(() => {
    setIsShowNotification(isShow);
  }, [isShow]);

  return (
    <>
      {isShowNotification && (
        <NotificationWrapper {...props}>
          <Content>
            <Icon name="exclamation" $size={16} $color="white" $mr={12} />
            <Text>{text}</Text>
          </Content>
          <Button
            size="small"
            variant="hollow"
            iconType="only"
            icon={<Icon name="close" $color="white" />}
            onClick={() => setIsShowNotification(false)}
            $ml={26}
          />
        </NotificationWrapper>
      )}
    </>
  );
};

export default Notification;
