import React from 'react';

import { EView } from 'public/styles/config/view';

import Icon from 'components/shared/atoms/Icon';

import { ViewTogglerWrapper, IconWrapper } from './styled';

const ViewToggler = ({ view, setView }) => {
  return (
    <ViewTogglerWrapper view={view}>
      <IconWrapper onClick={() => setView(EView.row)}>
        <Icon name="view-rows" $color="blue" $size={22} />
      </IconWrapper>
      <IconWrapper onClick={() => setView(EView.tile)}>
        <Icon name="view-tiles" $color="blue" $size={22} />
      </IconWrapper>
    </ViewTogglerWrapper>
  );
};

export default ViewToggler;
