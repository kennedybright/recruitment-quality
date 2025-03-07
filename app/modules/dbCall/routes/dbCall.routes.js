'use strict'

const express = require('express')
const router = express.Router()
const versionRouter = require('express-version-route')
const orm = require('../../../lib/db').pgInstance.models
const { loadRoute } = require('../../../lib/updateManifest')
const DBCallController = require('../controller/dbCall.controller')

// Load dbCallController for each Sequelize model
const models = Object.entries(orm).map(([modelName, model]) => ({
    name: modelName,
    controller: new DBCallController(modelName),
    api: model.api, // API DB Resource URL
    methods: model.crud
}))

models.forEach(({ name, controller, api, methods }) => {
    const pk = controller.pk
    const dynamicURL = `/${Object.values(api).join('/')}`
    const byId = `${pk.join(' and ')}`
    const context = `${Object.values(api).join('-')}`
    const restActions = []

    // Load routes into router by controller's CRUD settings
    if (methods.includes('create')) {
        const createDbMap = new Map()
        createDbMap.set('default', controller.createRecord)
        router.post(dynamicURL, versionRouter.route(createDbMap))

        // restActions.push({
        //     routePath: `${dynamicURL}$`,
        //     displayPath: dynamicURL,
        //     method: 'POST',
        //     description: `Post ${context} values`
        // })
    }

    if (methods.includes('update')) {
        const updateDbMap = new Map()
        updateDbMap.set('default', controller.updateRecord)
        router.put(`${dynamicURL}/:id`, versionRouter.route(updateDbMap))

        // restActions.push({
        //     routePath: `${dynamicURL}/[0-9]+`,
        //     displayPath: `${dynamicURL}/:id`,
        //     method: 'PUT',
        //     description: `Put ${context} value by ${byId}`
        // })
    }

    if (methods.includes('delete')) {
        const deleteDbMap = new Map()
        deleteDbMap.set('default', controller.deleteRecord)
        router.delete(`${dynamicURL}/:id`, versionRouter.route(deleteDbMap))

        // restActions.push({
        //     routePath: `${dynamicURL}/[0-9]+`,
        //     displayPath: `${dynamicURL}/:id`,
        //     method: 'DELETE',
        //     description: `Delete ${context} value by ${byId}`
        // })
     }

    if (methods.includes('findById')) {
        const getDbMap = new Map()
        getDbMap.set('default', controller.getRecordById)
        router.get(`${dynamicURL}/:id`, versionRouter.route(getDbMap))

        restActions.push({
            routePath: `${dynamicURL}/[0-9]+`,
            displayPath: `${dynamicURL}/:id`,
            method: 'GET',
            description: `Get ${context} value by ${byId}`
        })
    }

    if (methods.includes('findAll')) {
        const getAllDbMap = new Map()
        getAllDbMap.set('default', controller.getAllRecords)
        router.get(dynamicURL, versionRouter.route(getAllDbMap))

        // restActions.push({
        //     routePath: `${dynamicURL}$`,
        //     displayPath: dynamicURL,
        //     method: 'GET',
        //     description: `Get all ${context} values`
        // })
    }

    // Update manifest file and add new rest actions
    // if (name !== 'TestTable') {
    //     restActions.forEach(({ routePath, displayPath, method, description }) =>
    //         loadRoute(routePath, displayPath, method, description)
    //     )
    // }
})

module.exports = router
