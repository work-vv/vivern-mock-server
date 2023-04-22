import express from 'express'
import { appConfig } from '../config/app'
import { mockResponse } from '../mock'

const router = express.Router()

appConfig.PROJECTS.forEach((name: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
  const project = require(`../projects/${name}.json`)
  router.use(project.pathPrefix, mockResponse(project))
})

export default router
