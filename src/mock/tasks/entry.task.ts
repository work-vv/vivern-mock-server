import { EntryTask } from '../../types'

export const processEntry = (entry: EntryTask, variables: { [key: string]: unknown } = {}) => {
  console.log(variables?.id + entry.type + 'processed')
}
