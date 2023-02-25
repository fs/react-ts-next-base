import React, { useState, useEffect, useRef } from 'react';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';

import { ArrowWrapper } from '../VariantsTable/styled';
import { TableNumber, TableVariantsWrapper, TableVariants } from './styled';

const VariantsInfoTable = ({ variants, colWidth, cols }) => {
  const { variantProperties } = variants[0] || { variantProperties: [] };

  const [scrollProperties, setScrollProperties] = useState(0);
  const refProperties = useRef(null);

  const onMoveTable = direction => {
    refProperties.current.scrollLeft =
      direction === 'left'
        ? scrollProperties - ((scrollProperties % colWidth) - 1 || colWidth)
        : scrollProperties + (colWidth - (scrollProperties % colWidth) || colWidth) + 1;
  };

  const scrollHandler = () => setScrollProperties(refProperties.current?.scrollLeft);

  const subscribeScroll = () => window.addEventListener('scroll', scrollHandler, true);
  const unsubscribeScroll = () => window.removeEventListener('scroll', scrollHandler, true);

  useEffect(() => {
    subscribeScroll();
    return () => unsubscribeScroll();
  }, []);

  return (
    <>
      <TableNumber>
        <tbody>
          <tr>
            <td>№</td>
          </tr>
          {variants.map((_, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
            </tr>
          ))}
        </tbody>
      </TableNumber>
      <TableVariantsWrapper ref={refProperties}>
        <TableVariants scrolled={variantProperties?.length > cols - 1} colWidth={colWidth}>
          <tbody>
            <tr>
              {variantProperties.map(({ property: { displayName } }, i) => (
                <td key={i}>{displayName}</td>
              ))}
            </tr>
            {variants.map((_, i) => (
              <tr key={i}>
                {variants[i].variantProperties.map(
                  ({ dictionaryPropertyOption, integerValue, stringValue }, index) => (
                    <td key={index}>
                      {integerValue || stringValue || dictionaryPropertyOption?.name}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </TableVariants>
      </TableVariantsWrapper>
      {variantProperties?.length > cols && scrollProperties > 5 && (
        <ArrowWrapper direction="left">
          <Button
            iconType="only"
            shape="circle"
            size="small"
            icon={<Icon name="arrow-chevron-left" $color="white" />}
            onClick={() => onMoveTable('left')}
          />
        </ArrowWrapper>
      )}
      {variantProperties?.length > cols &&
        (variantProperties?.length - cols) * colWidth - scrollProperties > 5 && (
          <ArrowWrapper direction="right">
            <Button
              iconType="only"
              shape="circle"
              size="small"
              icon={<Icon name="arrow-chevron-right" $color="white" />}
              onClick={() => onMoveTable('right')}
            />
          </ArrowWrapper>
        )}
    </>
  );
};

export default VariantsInfoTable;
