import { HttpRequestTask } from '../../types'
import { replaceTemplateValues } from '../template-parser'
import axios from 'axios'
import https from 'https'
const httpsAgent = new https.Agent({ rejectUnauthorized: false })

export const processHttpRequest = (request: HttpRequestTask, variables: { [key: string]: unknown } = {}) => {
  const requestTemplate = replaceTemplateValues(request.body, variables)
  const requestRoute = request.route.startsWith('http') ? request.route : request.host + request.route
  axios
    .post(requestRoute, requestTemplate, { httpsAgent: httpsAgent })
    .then((res) => {
      console.log(`statusCode: ${res.status}`)
    })
    .catch((error) => {
      console.log(`errorCode: ${error.request}`)
    })
}
