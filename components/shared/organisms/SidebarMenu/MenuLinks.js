import React from 'react';
import Link from 'next/link';

import { Links, MenuLink } from './styled';

const MenuLinks = ({ items, isSidebarSettingsActive }) => {
  return (
    <Links items={items.length} isSidebarSettingsActive={isSidebarSettingsActive}>
      {items.map(({ text, url, params = {}, type, testId = '', onClick = () => {} }, i) => {
        return (
          <MenuLink key={i}>
            {type === 'action' ? (
              <button data-cy={testId} type="button" onClick={onClick}>
                {text}
              </button>
            ) : (
              <Link href={{ pathname: url, query: params }}>{text}</Link>
            )}
          </MenuLink>
        );
      })}
    </Links>
  );
};

export default MenuLinks;
