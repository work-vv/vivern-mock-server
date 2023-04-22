const express = require('express')
const app = express()
const {PORT, HOST, API_PREFIX, REQUEST_MAX_SIZE, REQUEST_PARAM_LIMIT} = require('./config/app')
const {apiRouter} = require('./routes')
const hbs = require('hbs')

app.set('env development')
hbs.registerHelper('stringify', function (obj) {
  return JSON.stringify(obj)
})

app.use(express.json({extended: false, limit: REQUEST_MAX_SIZE}))
app.use(express.urlencoded({extended: false, limit: REQUEST_MAX_SIZE, parameterLimit: REQUEST_PARAM_LIMIT}))

app.use(API_PREFIX, apiRouter)

app.use((err, req, res, next) => {
  // format error
  if (res.headersSent) {
    return next(err)
  }

  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  })
})

app.listen(PORT, HOST)
console.log(`App running on http://${HOST}:${PORT}`)
