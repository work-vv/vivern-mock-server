import express, { Application } from 'express'
import { appConfig } from './config/app'
import { apiRouter } from './routes'

// Boot express
const { PORT, HOST, API_PREFIX, REQUEST_MAX_SIZE, REQUEST_PARAM_LIMIT } = appConfig
const app: Application = express()

app.use(express.json({ limit: REQUEST_MAX_SIZE }))
app.use(express.urlencoded({ extended: false, limit: REQUEST_MAX_SIZE, parameterLimit: REQUEST_PARAM_LIMIT }))

app.use(API_PREFIX, apiRouter)

app.listen(PORT)
console.log(`App running on ${HOST}:${PORT}`)
// Start server
