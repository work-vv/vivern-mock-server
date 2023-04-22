import { EntryTask, HttpRequestTask, MessageTask, Task } from '../../types'
import { processEntry } from './entry.task'
import { processHttpRequest } from './request.task'
import { processMessage } from './message.task'

export const processTask = (task: Task, variables: { [key: string]: unknown } = {}) => {
  switch (task.type) {
    case 'httpRequest':
      processHttpRequest(task as HttpRequestTask, variables)
      break
    case 'messageQueue':
      processMessage(task as MessageTask, variables)
      break
    case 'entry':
      processEntry(task as EntryTask, variables)
      break
  }
}
