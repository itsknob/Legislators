module.exports = {
  projects: ['./frontend/jest.config.js', './backend/jest.config.js'],
  coverageDirectory: './coverage/',
  collectCoverageFrom: ['./frontend/**/*.js', './backend/**/*.js'],
  moduleDirectories: [
    './frontend/node_modules',
    './backend/node_modules',
    './backend/graphql',
  ],
}
