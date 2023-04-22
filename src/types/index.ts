type ParameterBag = {
  query: { [key: string]: unknown }
  body: { [key: string]: unknown }
  path: { [key: string]: unknown }
  header: { [key: string]: unknown }
}

type SampleRule = {
  type: string
  args: never[]
}

type ParseRule = {
  name: string
  path: string | null
  sample: SampleRule
}

type ProjectConfig = {
  name: string
  pathPrefix: string
  projectVariables: string[]
  operations: Operation[]
}

type Operation = {
  request: OperationRequest
  requestTaskGroups: TaskGroup[]
  responses: OperationResponse[]
  operationTaskGroups: TaskGroup[]
}

type TaskGroup = {
  type: string
  tasks: Task[]
}

type Task = {
  type: string
  parses: ParseRule[]
}

type EntryTask = Task & {
  resource: string
  operator: string
}

type HttpRequestTask = Task & {
  host: string
  route: string
  method: string
  body: string
}

type MessageTask = Task & {
  broker: string
  body: string
}

type OperationRequest = {
  route: string
  method: string
  parses: ParseRule[]
}

type OperationResponse = {
  body: {
    type: string
    value: string
  }
  status: number
}

export {
  ParameterBag,
  ParseRule,
  SampleRule,
  ProjectConfig,
  Operation,
  OperationRequest,
  OperationResponse,
  TaskGroup,
  Task,
  HttpRequestTask,
  EntryTask,
  MessageTask
}
