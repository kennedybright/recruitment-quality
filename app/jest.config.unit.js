console.log('RUNNING UNIT TESTS')

module.exports = {
  ...require('./jest.config'),
  modulePathIgnorePatterns: ['tests-integration']
}
