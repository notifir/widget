import { normalize } from '../locale'

describe('format', () => {
  it('should normalize locale string', () => {
    expect(normalize(undefined)).toBeUndefined()

    expect(normalize('en_KK_PH')).toBeUndefined()

    expect(normalize('-')).toBeUndefined()

    expect(normalize('_')).toBeUndefined()

    expect(normalize('sv-se')).toEqual('sv-SE')

    expect(normalize('sv-SE')).toEqual('sv-SE')

    expect(normalize('sv')).toEqual('sv')

    expect(normalize('en_GB')).toEqual('en-GB')
  })
})
