import React from 'react';
import '@testing-library/jest-dom';
import failOnConsole from 'jest-fail-on-console';

jest.setTimeout(30000);

// hotfix https://github.com/vercel/next.js/issues/15543
jest.mock('next/link', () => {
  return ({ children, ...props }: { [key: string]: string }) => {
    return (
      <a data-testid={props['data-testid']} data-cy={props['data-cy']}>
        {children}
      </a>
    );
  };
});

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    route: '',
  })),
}));

global.URL.createObjectURL = jest.fn();

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

Object.defineProperty(window, 'scroll', {
  value: jest.fn(),
});

failOnConsole();
