export function normalize(value?: string, delimiter = '-') {
  if (!value)
    return undefined

  const parts = value.replace(/_/g, '-').split('-')

  if (!parts.length || parts.length > 2)
    return undefined

  const language = parts.shift()
  if (!language)
    return undefined

  let result: string = language.toLowerCase()

  if (!parts.length)
    return result

  const country = parts.pop()
  if (country)
    result += `${delimiter}${country.toUpperCase()}`

  return result
}
