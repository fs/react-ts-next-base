import Link from 'next/link';
import styled from 'styled-components';

export const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;

  height: fit-content;

  &:hover {
    cursor: pointer;
  }
`;
