import { pathToRegexp, match } from 'path-to-regexp'
import { parseParameters } from './request-parser'
import { replaceTemplateValues } from './template-parser'
import { ApiError } from '../exceptions/api-error'
import { Request, Response } from 'express'
import { ProjectConfig, TaskGroup, OperationResponse } from '../types'
import { processTask } from './tasks'

export class ResponseProcessor {
  private operationTaskGroups: TaskGroup[] = []
  private variables = {}
  private responses: OperationResponse[] = []
  private requestTaskGroups: TaskGroup[] = []
  processRequest({ projectVariables, operations }: ProjectConfig, req: Request) {
    const pattern: [RegExp, (p1: string, p2: string) => string] = [RegExp(/\{([^/}]+)}/g), (p1, p2) => `:${p2}`]
    const mock = operations.find((operation) => {
      const pathPattern = operation.request.route.replace(...pattern)
      const pathFinder = pathToRegexp(pathPattern)
      return (
        pathFinder.exec(req.path.toLowerCase()) && operation.request.method.toLowerCase() === req.method.toLowerCase()
      )
    })
    if (!mock) throw new ApiError('Operation mock not found for path:' + req.path)

    this.requestTaskGroups = mock.requestTaskGroups || []
    this.responses = mock.responses || []
    this.operationTaskGroups = mock.operationTaskGroups || []
    const bodyParams = req.body
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const pathParams = match(mock.request.route.replace(...pattern))(req.path)?.params
    const queryParams = req.query
    const headerParams = req.header
    this.variables = parseParameters(
      {
        body: bodyParams,
        path: pathParams,
        query: queryParams,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        header: headerParams
      },
      mock.request.parses,
      projectVariables || []
    )
  }

  processRequestTaskGroups() {
    this.requestTaskGroups.forEach((group) => group.tasks.forEach((task) => processTask(task)))
  }

  sendResponse(res: Response) {
    const response = this.responses[0] || {} // todo add rules for different responses later
    const responseBody = replaceTemplateValues(
      // todo check responses types
      response.body.value,
      this.variables
    )
    if (res) res.status(response.status || 200).send(responseBody)
  }

  processOperationTaskGroups() {
    this.operationTaskGroups.forEach((group) => group.tasks.forEach((task) => processTask(task)))
  }
}
