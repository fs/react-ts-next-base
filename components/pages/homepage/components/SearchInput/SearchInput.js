import React from 'react';
import Link from 'next/link';
import useRouter from 'hooks/useRouter';

import { CATALOG } from 'config/routes';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';

import { catalogCategories } from 'components/pages/catalog/constants';
import {
  Wrapper,
  Content,
  Input,
  Menu,
  Col,
  Notification,
  Form,
  InstructionLink,
  MouseIcon,
} from './styled';

const SearchInput = ({ query }) => {
  const { pushRoute } = useRouter();

  const onSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const inputValue = formData.get('startSearch');
    pushRoute({
      pathname: CATALOG,
      query: {
        ...query,
        category: catalogCategories.ALL,
        searchQuery: inputValue,
      },
    });
  };

  return (
    <Wrapper>
      <Notification>
        <MouseIcon />
        <div>
          Смело покупайте! <br />
          Сделка безопасна и застрахована, 100% гарантия возврата денег.
        </div>
      </Notification>
      <Content>
        <Link href={CATALOG}>
          <Menu>
            <Icon name="menu" $color="white" $size={22} $mr={10} />
            Каталог товаров
          </Menu>
        </Link>
        <Col>
          <Form onSubmit={onSubmit}>
            <Input name="startSearch" />
            <Button
              type="submit"
              variant="hollow"
              iconType="only"
              icon={<Icon name="search" $color="white" />}
              size="large"
            />
          </Form>
        </Col>

        <InstructionLink>
          <Button
            label="ИНСТРУКЦИЯ"
            variant="ghost"
            size="large"
            $width="10.5rem"
            target="_blank"
            rel="noreferrer"
            href={`${process.env.ASSET_HOST}/files/instruction.pdf`}
          />
        </InstructionLink>
      </Content>
    </Wrapper>
  );
};

export default SearchInput;
