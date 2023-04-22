import { MessageTask } from '../../types'

export const processMessage = (entry: MessageTask, variables: { [key: string]: unknown } = {}) => {
  console.log(variables?.id + entry.type + 'processed')
}
