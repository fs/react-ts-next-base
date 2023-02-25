import React, { useState } from 'react';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';

import EditReviewForm from './EditReviewForm';
import { ButtonWrapper, Comment, CommentText } from './styled';

const ReviewComment = ({ reviewBody, updateReview, editable }) => {
  const [editInProgress, setEditInProgress] = useState(false);

  const toggleEditForm = () => {
    setEditInProgress(!editInProgress);
  };

  return (
    <Comment>
      {editInProgress ? (
        <EditReviewForm action={updateReview} closeForm={toggleEditForm} reviewBody={reviewBody} />
      ) : (
        <>
          <CommentText data-testid="review-body"> {reviewBody} </CommentText>
          {editable && (
            <ButtonWrapper>
              <Button
                variant="change"
                iconType="only"
                icon={<Icon name="pencil" $color="white" $size={14} />}
                shape="rounded"
                testId="edit-review-button"
                onClick={toggleEditForm}
              />
            </ButtonWrapper>
          )}
        </>
      )}
    </Comment>
  );
};

export default ReviewComment;
