import { faker } from '@faker-js/faker'
import { ApiError } from '../exceptions/api-error'

const createSample = (sampleType: string, args = []) => {
  let sample = sampleType
  const sampleConfig = sampleType.split('.')
  const sampleProvider = sampleConfig.shift()
  const firstPart = sampleConfig[0] || null
  const secondPart = sampleConfig[1] || null
  try {
    switch (sampleProvider) {
      case 'faker':
        // eslint-disable-next-line no-case-declarations,@typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line no-case-declarations
        const fakerExpression = firstPart && secondPart ? faker[firstPart][secondPart] : null
        if (fakerExpression instanceof Function) {
          sample = fakerExpression(...args)
        }
        break
    }
  } catch (Error) {
    throw new ApiError('Incorrect sample alias')
  }

  return sample
}

export { createSample }
