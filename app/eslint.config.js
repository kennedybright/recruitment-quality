promise = require('eslint-plugin-promise')

module.exports = {
    //files: ["**/*.js"],
    //ignores: ["coverage/", "jest.*", "package*",],
    plugins: {
        promise
    },
    /*rules: {
        semi: ["error", "never"],
        "promise/always-return": "warn",
        "promise/no-return-wrap": "error",
        "promise/param-names": "error",
        "promise/catch-or-return": "warn",
        "promise/no-nesting": "warn",
        "promise/no-promise-in-callback": "warn",
        "promise/no-callback-in-promise": "warn",
        "promise/avoid-new": "warn",
    },*/
}