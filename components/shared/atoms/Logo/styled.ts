import styled from 'styled-components';
import Link from 'next/link';

export const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;

  height: fit-content;

  &:hover {
    cursor: pointer;
  }
`;
