const { createRequestContext } = require('@nielsen-media/express-request-context')

async function resolveContext (req, res, next) {
  let context
  if (req.jwt_payload) {
    const jwt = req.jwt_payload
    context = {
      request_id: jwt.request_id,
      session_id: jwt.session_id,
      entity_id: jwt.entity_id,
      infra_user_id: jwt.user_id,
      data_scope: jwt.data_scope,
      impersonated_entity_id: jwt.impersonated_entity_id,
      username: jwt.sub
    }
    createRequestContext(context, context.request_id)
  }
  next()
}

module.exports = (app) => app.use(resolveContext)
