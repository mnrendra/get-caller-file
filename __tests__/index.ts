import mockedStackTrace from '@tests/mocks/stackTrace'
import unmockStackTrace from '@tests/unmocks/stackTrace'

import { getCallerFile } from '..'

jest.mock('@mnrendra/stack-trace', () => ({
  stackTrace: jest.fn()
}))

describe('Test all APIs:', () => {
  describe('Test `getCallerFile` API:', () => {
    describe('By mocking `stackTrace` to return an invalid call site, where `getFileName` returns `undefined`:', () => {
      beforeEach(() => {
        mockedStackTrace.mockReturnValue([{
          getFileName: () => undefined
        } as unknown as NodeJS.CallSite])
      })

      afterEach(() => {
        unmockStackTrace(mockedStackTrace)
      })

      it('Should throw an error when the returned value of `getFileName` is not a string!', () => {
        const received = (): string => getCallerFile()
        const expected = Error('File name is not a string: `undefined`')
        expect(received).toThrow(expected)
      })
    })

    describe('By mocking `stackTrace` to return an invalid call site, where `getFileName` returns `null`:', () => {
      beforeEach(() => {
        mockedStackTrace.mockReturnValue([{
          getFileName: () => null
        } as unknown as NodeJS.CallSite])
      })

      afterEach(() => {
        unmockStackTrace(mockedStackTrace)
      })

      it('Should throw an error when the returned value of `getFileName` is not a string!', () => {
        const received = (): string => getCallerFile()
        const expected = Error('File name is not a string: `null`')
        expect(received).toThrow(expected)
      })
    })

    describe('By mocking `stackTrace` to return an invalid call site, where `getFileName` returns a non-absolute path:', () => {
      beforeEach(() => {
        mockedStackTrace.mockReturnValue([{
          getFileName: () => './index.js'
        } as unknown as NodeJS.CallSite])
      })

      afterEach(() => {
        unmockStackTrace(mockedStackTrace)
      })

      it('Should throw an error when the returned value of `getFileName` is a non-absolute path!', () => {
        const received = (): string => getCallerFile()
        const expected = Error('File path is not an absolute path: "./index.js"')
        expect(received).toThrow(expected)
      })
    })

    describe('Without mocking anything:', () => {
      it('Should return `__filename` when given no argument!', () => {
        const caller = (): string => getCallerFile()
        const received = caller()
        const expected = __filename
        expect(received).toBe(expected)
      })

      it('Should return `__filename` when given `null` as the argument!', () => {
        const caller = (): string => getCallerFile(null)
        const received = caller()
        const expected = __filename
        expect(received).toBe(expected)
      })

      it('Should return the caller file path when given a callee as the argument!', () => {
        const caller = (): string => getCallerFile(caller)
        const received = caller()
        const expected = __filename
        expect(received).toBe(expected)
      })
    })
  })
})
