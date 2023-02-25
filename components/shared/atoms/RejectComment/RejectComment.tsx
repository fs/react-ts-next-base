import React from 'react';

import { TRejectComment } from './types';
import { CommentWrapper, Comment } from './styled';

const RejectComment: React.FunctionComponent<TRejectComment> = ({ comment, testId }) => {
  return (
    <CommentWrapper data-testid={testId}>
      <span>Комментарий администратора:</span>
      <Comment>{comment}</Comment>
    </CommentWrapper>
  );
};

export default RejectComment;
