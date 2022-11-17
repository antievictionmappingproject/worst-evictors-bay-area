const BASE = 'evictorbook.com/api/owner'

/** ts for some reason keeps wanting an async function (even though no
 * await ??) so... */
async function getSlice(
  ebName: string,
  type: string,
  slice: string,
  city: string
): Promise<any> {
  const escaped = encodeURI(`https://${city}.${BASE}/${type}/${ebName}/${slice}`)

  return fetch(escaped)
    .then((res) => res.json())
    .then((data) => ({
      [slice]: data,
    }))
    .catch((err) => {
      console.error(`Error at ${ebName}, ${escaped}: ${err}`)
    })
}

export default async function getEBEntry(
  ebName: string,
  type: string,
  city: string
) {
  const slices = [
    'details',
    'evictions',
    'networkDetails',
    'relatedNetworks',
    'portfolio',
  ]

  const escaped = encodeURI(
    `https://${city}.evictorbook.com/owner?search=${ebName}&be=${type}`
  )
  const result = await Promise.all(
    slices.map((slice) => getSlice(ebName, type, slice, city))
  )

  // array of objects with single (unique) property into single object
  return result.reduce(
    (prev, curr) => ({...prev, ...curr, ebUrl: escaped}),
    {}
  )
}
