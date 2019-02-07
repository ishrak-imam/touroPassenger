
export const getHash = s => {
  for (var i = 0, h = 0; i < s.length; i++) { h = Math.imul(31, h) + s.charCodeAt(i) | 0 }
  return String(h)
}

export const getExtension = fileUri => {
  const re = /(?:\.([^.]+))?$/
  return re.exec(fileUri)[0]
}

export const checkEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const checkBookingCode = code => {
  const re = /^[0-9]{6}$/
  return re.test(String(code))
}

export const checkSSN = ssn => {
  const re = /^(19|20)?(\d{6}(-|\s)\d{4}|(?!19|20)\d{10})$/
  return re.test(String(ssn))
}

export const checkZip = zip => {
  const re = /^(s-|S-){0,1}[0-9]{3}\s?[0-9]{2}$/
  return re.test(String(zip))
}

export const getImageName = url => {
  // const split = url.split('/')
  // return `${split[split.length - 2]}.jpg`
  const hash = getHash(url)
  return `${hash}.jpg`
}

export const stringShorten = (str, limit) => {
  return `${str.substring(0, limit)} ...`
}

export const tripNameFormatter = (str, limit) => {
  const splitted = str.split(' ')
  let title = ''
  let subtitle = ''
  let count = 0

  for (let i = 0; i < splitted.length; i++) {
    const temp = `${title}${splitted[i]} `
    if (temp.length > limit) break
    count = i
    title = temp
  }

  for (let i = count + 1; i < splitted.length; i++) {
    subtitle = `${subtitle}${splitted[i]} `
  }

  return {
    title: title.replace('/', ''),
    subtitle: subtitle
  }
}
