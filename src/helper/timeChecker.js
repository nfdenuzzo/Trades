export default {
  validateTime (value) {
    let length = value.length
    let temp = value.replace(/[^0-9]/gi, '')

    let h1 = temp.charAt(0)
    let h2 = temp.charAt(1)
    let h3 = temp.charAt(0) + temp.charAt(1)

    let m1 = temp.charAt(2)
    let m2 = temp.charAt(3)
    let m3 = temp.charAt(2) + temp.charAt(3)

    // check hours
    if (length >= 1) {
      if (h1 < 0 || h1 > 2) {
        h1 = ''
      }
    }

    if (length >= 2) {
      if (h1 === 0 && (h2 < 1 || h2 > 9)) {
        h2 = ''
      }
      if (h1 === 1 && (h2 < 0 || h2 > 9)) {
        h2 = ''
      }
      if (h1 === 2 && (h2 < 0 || h2 > 4)) {
        h2 = ''
      }
    }

    if (length >= 2) {
      if (h3 < 0 || h3 > 23) {
        h2 = ''
      }
    }

    // check min
    if (length >= 3) {
      if (m1 < 0 || m1 > 5) {
        m1 = ''
      }
    }

    if (length >= 4) {
      if (m2 < 0 || m2 > 9) {
        m2 = ''
      }
    }

    if (length >= 4) {
      if (m3 < 0 || m3 > 59) {
        m2 = ''
      }
    }

    // check for 23
    if (h3 === '23') {
      if (m1 < 0 || m1 > 5) {
        m1 = ''
      }
      if (m2 < 0 || m2 > 9) {
        m2 = ''
      }
      if (m3 < 0 || m3 > 59) {
        m2 = ''
      }
    }

    var output = ''
    if (length >= 3) {
      output = `${h1}${h2}:${m1}${m2}`
    } else {
      output = `${h1}${h2}`
    }

    return output
  }
}
