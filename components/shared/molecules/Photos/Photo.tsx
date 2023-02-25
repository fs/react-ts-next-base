import React, { useMemo } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import Video from 'components/shared/molecules/Video';
import Tooltip from 'components/shared/atoms/Tooltip';

import { getExtension } from 'helpers';
import { TPhoto } from './types';
import {
  PhotoWrapper,
  PhotoContainer,
  PhotoImage,
  RemovePhoto,
  EmbedPdf,
  DownloadLink,
} from './styled';

const tooltipTypes = ['.avi'];

const Photo: React.FunctionComponent<TPhoto> = ({
  name,
  url,
  fileName = '',
  aviFileCount = 0,
  onRemovePhoto = () => {},
  editable = true,
  zoomable = true,
}) => {
  const type = getExtension(name, url);

  const showTooltip = tooltipTypes.includes(type);
  const renderItem = useMemo(() => {
    switch (type) {
      case '.pdf':
        return !zoomable ? (
          <EmbedPdf
            src={url}
            data-testid={`photo-${name}`}
            data-cy={`photo-${name}`}
            width="72"
            height="72"
            scrolling="no"
          />
        ) : (
          <a target="_blank" href={url} rel="noreferrer">
            <EmbedPdf
              src={url}
              data-testid={`photo-${name}`}
              data-cy={`photo-${name}`}
              width="72"
              height="72"
              scrolling="no"
            />
          </a>
        );
      case '.avi':
        return (
          <DownloadLink href={url} download={fileName}>
            AVI {aviFileCount}
          </DownloadLink>
        );
      case '.mp4':
      case '.mpg':
      case '.mov':
      case '.mkv':
      case '.m4v':
        return <Video url={url} testId={`video-${name}`} />;
      default:
        return !zoomable ? (
          <PhotoImage
            alt="photo"
            src={url}
            data-testid={`photo-${name}`}
            data-cy={`photo-${name}`}
          />
        ) : (
          <Zoom zoomMargin={20} overlayBgColorEnd="#ffffffa6">
            <PhotoImage
              alt="photo"
              src={url}
              data-testid={`photo-${name}`}
              data-cy={`photo-${name}`}
            />
          </Zoom>
        );
    }
  }, [type, aviFileCount, zoomable]);

  return (
    <PhotoWrapper>
      <Tooltip active={showTooltip} $width="" offset={[0, 4]} text={fileName}>
        <PhotoContainer withPhoto>{renderItem}</PhotoContainer>
      </Tooltip>
      {editable && (
        <RemovePhoto>
          <Button
            variant="shadowed"
            iconType="only"
            icon={<Icon name="close" $color="greyA4" />}
            size="extra-small"
            shape="circle"
            onClick={() => onRemovePhoto(name)}
            data-testid="remove-photo"
          />
        </RemovePhoto>
      )}
    </PhotoWrapper>
  );
};

export default Photo;
