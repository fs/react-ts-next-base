import React from 'react';

import Button from 'components/shared/atoms/Button';

const SectionItem = ({ section }) => {
  const { icon, title, route } = section;

  return (
    <Button
      variant="outlined-neutral"
      iconType="leading"
      icon={icon}
      size="large"
      href={route}
      disabled={!route}
    >
      {title}
    </Button>
  );
};

export default SectionItem;
