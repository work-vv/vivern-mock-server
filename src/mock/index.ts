import { Request, Response, NextFunction } from 'express'
import { ResponseProcessor } from './response-processor'
import { ProjectConfig } from '../types'

export const mockResponse = (config: ProjectConfig) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = new ResponseProcessor()
    await response.processRequest(config, req)
    await response.processRequestTaskGroups()
    await response.sendResponse(res)
    await response.processOperationTaskGroups()
  } catch (err) {
    console.log(err)
    next(err)
  }
}
