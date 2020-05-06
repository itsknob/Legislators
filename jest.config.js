module.exports = {
  rootDir: './',
  projects: [
    '<rootDir>/frontend/jest.config.js',
    '<rootDir>/backend/jest.config.js',
  ],
  coverageDirectory: './coverage/',
  collectCoverageFrom: ['./frontend/**/*.js', './backend/**/*.js'],
  moduleDirectories: [
    '<rootDir>/frontend/node_modules',
    '<rootDir>/backend/node_modules',
    '<rootDir>/backend/graphql',
  ],
}
