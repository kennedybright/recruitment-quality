'use strict'

module.exports.sleep = async (req, res) => {
  const timeToSleepInMs = parseInt(req.query.time)
  await sleep(timeToSleepInMs)
  res.status(200).json({
    sleepTime: timeToSleepInMs,
    sleepStatus: 'completed'
  })
}

async function sleep (ms) {
  await new Promise(resolve => setTimeout(resolve, ms))
}
