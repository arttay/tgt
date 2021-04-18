export const sanitizeString = (str) => {
 // eslint-disable-next-line no-useless-escape
    return str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"").trim()
  }