import { get } from 'lodash'
import { createSample } from '../utils/sample'
import { ParameterBag, ParseRule } from '../types'

const parseParameters = (parameterBag: ParameterBag, parseRules: ParseRule[] = [], projectVars: string[] = []) => {
  const parsedParams = parseRules.map((rule) => {
    const defaultValue = rule.sample ? createSample(rule.sample.type, rule.sample.args) : null
    return { [rule.name]: get(parameterBag, rule.path as string, defaultValue) }
  })
  return Object.assign(parameterBag, ...parsedParams, ...projectVars)
}

export { parseParameters }
