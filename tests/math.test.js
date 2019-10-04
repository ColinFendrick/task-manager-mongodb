const { calculateTip, farenheitToCelsius, celsiuToFarenheit, add } = require('../src/math')

test('Should calculate total with tip', () => {
  expect(calculateTip(5, 0.2)).toBe(6)
  expect(calculateTip(10)).toBe(12)
})

test('F to c', () => {
  expect(farenheitToCelsius(32)).toBe(0)
})

test('C to F', () => {
  expect(celsiuToFarenheit(0)).toBe(32)
})

test('Should add two numbers', done => {
  add(2, 3).then(sum => {
    expect(sum).toBe(5)
    done()
  })
})

test('Shoud add two numbers async/await', async () => {
  const sum = await add(10, 22)
  expect(sum).toBe(32)
})
