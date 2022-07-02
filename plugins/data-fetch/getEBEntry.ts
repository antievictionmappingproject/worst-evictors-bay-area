/** ts for some reason keeps wanting an async function so... */
async function getSlice(
  ebName: string,
  type: string,
  slice: string
): Promise<any> {
  const BASE = "https://evictorbook.com/api/owner"
  const escaped = encodeURI(`${BASE}/${type}/${ebName}/${slice}`)

  return fetch(escaped)
    .then((res) => res.json())
    .then((data) => ({
      [slice]: data,
    }))
    .catch((err) => {
      console.log({ slice, ebName, type })
      console.error(err)
    })
}

export default async function getEBEntry(
  ebName: string,
  type: string
) {
  const slices = [
    "details",
    "evictions",
    "networkDetails",
    "relatedNetworks",
    "portfolio",
  ]
  const result = await Promise.all(
    slices.map((slice) => getSlice(ebName, type, slice))
  )

  // array of objects with single (unique) property into single object
  return result.reduce((prev, curr) => ({ ...prev, ...curr }), {})
}

/*
fs.writeFile(
  "test.json",
  JSON.stringify(await getEBEntry("LANDMARK REALTY LLC", "lp"))
)
*/
