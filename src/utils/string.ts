export const AddAmongOthers = (array: string[]) => {
  const lastElem = array.slice(-1)[0] + ' (Among Others)'
  return array.slice(0, -1).concat([lastElem])
}

export const FormatListAsArray = (list: string) => {
  const rawArray = list.split(',').map((item) => item.trim())
  return AddAmongOthers(rawArray)
}

export const FormatPublicFundingSources = (sources: string[]) => {
  if (sources.includes('Other')) {
    const mainSources = sources.filter((s) => s !== 'Other')
    return mainSources.length
      ? AddAmongOthers(mainSources)
      : ['Other (not HPD or HDC)']
  } else return sources
}

export const FormatBusinessAddress = (addr: string) => {
  const addressPartsAsArray = addr.split(' ')
  const formattedAddress = addressPartsAsArray.reduce(
    (address, part) => {
      if (
        /[a-zA-Z]/.test(part.charAt(0)) &&
        part !== 'NY' &&
        part !== 'CT'
      ) {
        return (
          address +
          ' ' +
          part.charAt(0).toUpperCase() +
          part.toLowerCase().slice(1)
        )
      } else return address + ' ' + part.toUpperCase()
    },
    ''
  )
  return formattedAddress
}

export const formatLink = (name: string) => {
  return name
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll(',', '')
    .replaceAll('\'', '')
}

export const exceptionWords = ['LLC', 'LP', 'NA']

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat('en-us').format(number)
}

export const titleCase = (name: string) => {
  return name
    .split(' ')
    .map((word) =>
      exceptionWords.includes(word)
        ? word.toUpperCase()
        : word
          .split('')
          .map((str, index) =>
            index === 0 ? str.toUpperCase() : str.toLowerCase()
          )
          .join('')
    )
    .join(' ')
}
