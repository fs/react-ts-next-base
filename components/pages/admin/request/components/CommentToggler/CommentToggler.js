import React, { useEffect } from 'react';
import { useField } from 'formik';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';

import { TogglerWrapper } from './styled';

const CommentToggler = ({ name }) => {
  const [, { value: comment }, { setValue: setIsOpenComment }] = useField('comment');
  const [, , { setValue: setComment, setTouched }] = useField(name);
  const isOpen = comment[name];

  const toggleComment = () => {
    setIsOpenComment({ ...comment, [name]: !isOpen });
    setTouched(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setComment('');
    }
  }, [isOpen]);

  return (
    <TogglerWrapper>
      <Button
        label="Отменить"
        variant={isOpen ? 'primary' : 'change'}
        shape="rounded"
        iconType={isOpen ? 'none' : 'only'}
        icon={<Icon name="pencil" $color="white" $size={16} />}
        onClick={toggleComment}
      />
    </TogglerWrapper>
  );
};

export default CommentToggler;
