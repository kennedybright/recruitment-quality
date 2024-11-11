console.log('RUNNING INTEGRATION TESTS')

module.exports = {
  ...require('./jest.config'),
  testMatch: [
    '**/tests-integration/**/*.test.js'
  ]
}
