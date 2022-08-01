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
