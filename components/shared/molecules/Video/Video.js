import React from 'react';
import NiceModal from '@ebay/nice-modal-react';

import VideoModal from './VideoModal';
import { EmbedVideo } from './styled';

const Video = ({ url, testId }) => {
  const openVideo = () => {
    NiceModal.show(VideoModal, { url });
  };

  return (
    <>
      <EmbedVideo onClick={openVideo} data-testid={testId} data-cy={testId}>
        <source src={url} />
        Your browser does not support HTML5 video.
      </EmbedVideo>
    </>
  );
};

export default Video;
