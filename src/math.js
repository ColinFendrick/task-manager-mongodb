const calculateTip = (total, tip = 0.2) => total + (total * tip)

const farenheitToCelsius = temp => (temp - 32)/1.8

const celsiuToFarenheit = temp => (temp * 1.8) + 32

const add = (a, b) => new Promise((res, rej) => {
    setTimeout(() => {
      if (a < 0 | b < 0) {
        return rej('Must be positive numbers')
      }

      res(a + b)
    }, 2000)
  })

module.exports = { calculateTip, farenheitToCelsius, celsiuToFarenheit, add }