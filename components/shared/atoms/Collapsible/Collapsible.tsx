import React, { useEffect, useState } from 'react';
import CollapsibleComponent from 'react-collapsible';

import Icon from 'components/shared/atoms/Icon';

import { TCollapsible, TCollapsibleItem } from './types';
import { colorConfig, iconConfig } from './config';

import { AccordionWrapper, CollapsibleButton } from './styled';

const CollapsibleItem = ({ variant, item, disabled }: TCollapsibleItem) => {
  const { heading, content, noContent, open, ...props } = item;
  const [isOpen, setIsOpen] = useState(false);
  const [isShowContent, setIsShowContent] = useState(open);

  useEffect(() => {
    if (disabled) {
      setIsOpen(false);
      setIsShowContent(false);
    }
  }, [disabled]);

  return (
    <CollapsibleComponent
      transitionTime={200}
      easing="ease-in-out"
      // fix Warning: Prop aria-controls did not match https://github.com/glennflanagan/react-collapsible/issues/210
      contentElementId={`collapsible-content-${item.name}`}
      triggerElementProps={{ id: `trigger-element-${item.name}` }}
      trigger={
        <CollapsibleButton
          disabled={disabled}
          type="button"
          color={colorConfig[variant]}
          {...props}
        >
          {heading}
          <Icon
            name={iconConfig[variant]}
            $ml={16}
            $size={16}
            $rotate={isOpen ? '90deg' : '270deg'}
            $color={colorConfig[variant]}
          />
        </CollapsibleButton>
      }
      overflowWhenOpen="visible"
      onOpening={() => {
        setIsShowContent(true);
        setIsOpen(true);
      }}
      onClose={() => setIsOpen(false)}
      open={isShowContent || false}
    >
      {content || noContent}
    </CollapsibleComponent>
  );
};

const Collapsible: React.FunctionComponent<TCollapsible> = ({
  variant = 'primary',
  accordion = [],
  disabled = false,
  ...props
}) => {
  return (
    <AccordionWrapper disabled={disabled}>
      {accordion.map((item, i) => (
        <CollapsibleItem variant={variant} item={item} disabled={disabled} key={i} {...props} />
      ))}
    </AccordionWrapper>
  );
};

export default Collapsible;
