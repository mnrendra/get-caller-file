import { fileURLToPath } from 'node:url'

const getFilePath = (
  fileName?: string | null
): string => {
  if (typeof fileName !== 'string') {
    throw new Error(`File name is not a string: \`${fileName}\``)
  }

  try {
    return fileURLToPath(fileName)
  } catch {
    return fileName
  }
}

export default getFilePath
