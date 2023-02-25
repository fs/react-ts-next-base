import React, { useEffect, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Container, ContainerChild } from './styled';
import { TElement, TChild } from './types';
import InfinityList from '../index';

const Child = ({ elements }: TChild) => {
  return (
    <>
      {elements.map(({ text }, idx) => {
        return <ContainerChild key={idx}>{text}</ContainerChild>;
      })}
    </>
  );
};
const containerId = 'test-target';
export default {
  title: 'organisms/InfinityList',
  component: InfinityList,
  argTypes: {
    scrollableTarget: String,
  },
  args: {
    scrollableTarget: containerId,
    hasNextPage: true,
    onLoadMore: () => {},
    loading: false,
  },
  decorators: [
    Story => (
      <Container id={containerId}>
        {`Container id = ${containerId} = scrollableTarget`}
        {Story()}
      </Container>
    ),
  ],
} as ComponentMeta<typeof InfinityList>;

export const Demo: ComponentStory<typeof InfinityList> = args => {
  const [data, setData] = useState<TElement[]>(new Array(15).fill({ text: 'wow!' }));

  const onLoadMore = () => {
    const arr: TElement[] = new Array(3).fill({ text: 'wow!' });
    setTimeout(() => {
      setData([...data, ...arr]);
    }, 1000);
  };
  useEffect(() => {}, []);

  return (
    <InfinityList {...args} dataLength={data.length} onLoadMore={onLoadMore}>
      <Child elements={data} />
    </InfinityList>
  );
};
