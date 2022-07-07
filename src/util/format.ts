export function formatString(fmt: string, obj: any): string {
  if (typeof fmt !== typeof '')
    throw new TypeError('fmt should be string.')

  const keys = fmt.match(/{[^}]*/g) || ['']
  const keyNames = keys?.map((x: any) => x.split('{').pop().split('}').shift())
  const values = typeof obj == 'string' ? JSON.parse(obj) : obj
  let res: string = fmt

  keyNames.forEach((key: any) => {
    const toReplace = new RegExp(`{${key}}`, 'g')
    res = res.replace(toReplace, values[key])
  })

  return res
}

export const toCorrectDateFormat = (value: any) => {
  return typeof value === 'string' && value[value.length - 3] !== ':'
    ? [value.slice(0, value.length - 2), ':', value.slice(value.length - 2)].join('')
    : value
}

export const formatDate = (value: any, locale: string) => {
  return value
    ? `${new Date(toCorrectDateFormat(value)).toLocaleDateString(locale || 'en', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    })}`
    : ''
}
