export const formatDate = (value: any, locale: string) => {
  return value
    ? `${new Date(value).toLocaleDateString(locale || 'en', {
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
