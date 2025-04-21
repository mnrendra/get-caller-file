import main from '..'

describe('Test all APIs:', () => {
  describe('Test main API:', () => {
    it('Should return "Hello, World!"!', () => {
      const received = main()
      const expected = 'Hello, World!'
      expect(received).toBe(expected)
    })
  })
})
