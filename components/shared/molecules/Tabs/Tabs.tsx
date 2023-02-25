import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Tab from './Tab';
import { TTabs } from './types';
import { gapConfig, delimiterConfig } from './config';
import { TabsWrapper, TabList, TabsContent } from './styled';

const Tabs: React.FunctionComponent<TTabs> = ({
  tabs = [],
  activeId,
  withTransition = false,
  variant = 'default',
}) => {
  const [toggler, setToggler] = useState(false);

  const handleClick = (action: () => void) => {
    setToggler(!toggler);
    action();
  };

  const currentContent = tabs.find(({ id }) => id === activeId)?.content;

  const timeout = withTransition ? 500 : 0;

  return (
    <TabsWrapper>
      <TabList gap={gapConfig[variant]} role="tablist" data-cy="form-toggler">
        {tabs.map(({ id, name, action }, i) => {
          const isActive = id === activeId;
          const withRightDelimiter =
            delimiterConfig[variant] &&
            !isActive &&
            i < tabs.length - 1 &&
            tabs[i + 1].id !== activeId;
          return (
            <Tab
              key={id}
              name={name}
              isActive={isActive}
              onClick={() => {
                if (!isActive) {
                  handleClick(action);
                }
              }}
              variant={variant}
              testId={`tab-${id}`}
              withRightDelimiter={withRightDelimiter}
            />
          );
        })}
      </TabList>
      {currentContent ? (
        <CSSTransition in={toggler} classNames="tab" timeout={timeout}>
          <TabsContent data-testid="tabs-content">{currentContent}</TabsContent>
        </CSSTransition>
      ) : null}
    </TabsWrapper>
  );
};

export default Tabs;
