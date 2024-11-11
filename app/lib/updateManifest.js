const fs = require('fs')
const path = require('path')

const manifestPath = path.join(__dirname,'/../../deployment/manifest.json')

module.exports.loadRoute = (routePath, displayPath, method, description) => {
    // Read current manifest.json
    try {
        manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
    } catch(err) {
        console.error('Error reading manifest.json: ', err)
        process.exit(1)
    }

    const routeNdx = manifest.rest_actions.findIndex(action => action.path === routePath)
    if (routeNdx === -1) {
        manifest.rest_actions.push({
            "path": routePath,
            "display_path": displayPath,
            "methods": [
                {
                "method": method,
                "description": description,
                "force_user": true,
                "force_source_app": false
                }
            ]
        })
    } else {
        const methodExists = manifest.rest_actions[routeNdx].methods.some(m => m.method === method)
        if (!methodExists) {
            manifest.rest_actions[routeNdx].methods.push({
                "method": method,
                "description": description,
                "force_user": true,
                "force_source_app": false
            })
        } else {
            return
        }
    }

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
    console.log(`Route ${method} ${routePath} added to manifest.json.`)
}
