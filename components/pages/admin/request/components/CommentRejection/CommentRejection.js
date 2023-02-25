import React from 'react';

import Icon from 'components/shared/atoms/Icon';
import Input from 'components/shared/atoms/Input';
import Tooltip from 'components/shared/atoms/Tooltip';

import { InputWrapper, CommentTitle, TooltipWrapper } from './styled';

const CommentRejection = ({ name }) => {
  return (
    <InputWrapper>
      <CommentTitle>
        Поясняющий комментарий
        <TooltipWrapper>
          <Tooltip
            $width="17rem"
            text="Опишите что не понравилось в заполненной заявке или добавьте какой-то комментарий от себя (Например: “Некачественное фото” или “Вы прикрепили логотип чужой компании”)."
          >
            <Icon name="question" $color="greyA4" $size={21} />
          </Tooltip>
        </TooltipWrapper>
      </CommentTitle>
      <Input
        type="textarea"
        name={name}
        testId={name}
        placeholder="Впишите комментарий..."
        rounded
      />
    </InputWrapper>
  );
};

export default CommentRejection;
