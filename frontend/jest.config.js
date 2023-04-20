module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'cobertura'],
  forceCoverageMatch: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testTimeout: 20000,
};
