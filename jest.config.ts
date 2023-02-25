import type { Config } from 'jest';

process.env.TZ = 'UTC';

const config: Config = {
  verbose: true,
  clearMocks: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/jest.setEnvVars.js', 'jest-extended'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/helpers',
    '<rootDir>/__tests__/mocks',
  ],
  transform: {
    '\\.(gql|graphql)$': '@graphql-tools/jest-transform',
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__tests__/mocks/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__tests__/mocks/styleMock.js',
    '\\.svg': '<rootDir>/__tests__/mocks/svgrMock.js',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['node_modules', '<rootDir>'],
};

export default config;
