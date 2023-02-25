import React from 'react';

import Icon from 'components/shared/atoms/Icon';

import useHistory from 'hooks/useHistory';

import { StyledLink } from './styled';
import { TBreadcrumbs } from './types';
import { colorConfig, fontConfig } from './config';

const Breadcrumbs: React.FunctionComponent<TBreadcrumbs> = ({
  variant = 'primary',
  position = 'left',
  back = false,
  testId = 'breadcrumbs',
  url,
  text,
  params = {},
}) => {
  const { history, setHistory } = useHistory();

  const pathname = back && history?.length > 1 ? history[history?.length - 2].pathname : url;
  const query = back && history?.length > 1 ? history[history?.length - 2].query : params;

  const goBack = async () => {
    setHistory(history.slice(0, -1));
  };

  return (
    <StyledLink
      fontStyle={fontConfig[variant]}
      color={colorConfig[variant]}
      data-testid={testId}
      data-cy={testId}
      onClick={back ? goBack : () => {}}
      href={{ pathname, query }}
      passHref
    >
      {position === 'left' && (
        <Icon $color={colorConfig[variant]} $mr={12} name="arrow-chevron-left" $size={18} />
      )}
      {text}
      {position === 'right' && (
        <Icon $color={colorConfig[variant]} $ml={12} name="arrow-chevron-right" $size={18} />
      )}
    </StyledLink>
  );
};

export default Breadcrumbs;
