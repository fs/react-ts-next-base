import React, { useEffect, useRef } from 'react';
import random from 'lodash/random';

import { VideoWrapper, Video, VideoLayout } from './styled';

const backgrounds = [
  {
    name: 'gold',
    opacity: 0.6,
  },
  {
    name: 'yacht',
    opacity: 0.2,
  },
];

const PromoVideo = () => {
  const { name, opacity } = backgrounds[random(backgrounds.length - 1)];
  const videoRef = useRef(null);

  useEffect(() => {
    const { current: video } = videoRef;
    video && (video.muted = true);
  }, []);

  return (
    <VideoWrapper name={name}>
      <Video ref={videoRef} loop autoPlay>
        <source src={`${process.env.ASSET_HOST}/videos/promo-bg/${name}.mp4`} type="video/mp4" />
      </Video>
      <VideoLayout opacity={opacity} />
    </VideoWrapper>
  );
};

export default PromoVideo;
