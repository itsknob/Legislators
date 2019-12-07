const packageName = 'backend'

module.exports = {
  collectCoverageFrom: ['./**/*.js'],
  name: `${packageName}`,
  displayName: `${packageName}`,
  moduleDirectories: [`./node_modules`],
  modulePaths: ['./'],
}
