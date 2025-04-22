import { isAbsolute } from 'node:path'

import { stackTrace } from '@mnrendra/stack-trace'

import { getFilePath } from './utils'

/**
 * Gets the caller's file path from a specific callee.
 *
 * Extracts the file name as an absolute path from the first call site in the
 * stack trace. If a callee is provided, the stack trace will start from the
 * caller of the callee.
 *
 * @param {((...args: any) => any) | null} [callee] - Optional callee function
 * or method to start tracing from. If `undefined` or `null`, tracing starts
 * from the current caller.
 *
 * @returns {string} A string representing the absolute path of the caller's
 * file.
 *
 * @see https://github.com/mnrendra/get-caller-file#readme
 */
const main = (
  callee?: ((...args: any) => any) | null
): string => {
  const [callSite] = stackTrace(callee ?? main, { limit: 1 })

  const fileName = callSite.getFileName()

  const filePath = getFilePath(fileName)

  if (!isAbsolute(filePath)) {
    throw new Error(`File path is not an absolute path: "${filePath}"`)
  }

  return filePath
}

export default main
