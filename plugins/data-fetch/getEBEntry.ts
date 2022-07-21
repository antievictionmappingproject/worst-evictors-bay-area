const BASE = "https://evictorbook.com/api/owner";
/** ts for some reason keeps wanting an async function (even though no
 * await ??) so... */
async function getSlice(
  ebName: string,
  type: string,
  slice: string
): Promise<any> {
  const escaped = encodeURI(`${BASE}/${type}/${ebName}/${slice}`);

  return fetch(escaped)
    .then((res) => res.json())
    .then((data) => ({
      [slice]: data,
    }))
    .catch((err) => {
      console.error(err);
    });
}

export default async function getEBEntry(ebName: string, type: string) {
  const slices = [
    "details",
    "evictions",
    "networkDetails",
    "relatedNetworks",
    "portfolio",
  ];

  const escaped = encodeURI(
    `https://evictorbook.com/owner?search=${ebName}&be=${type}`
  );
  const result = await Promise.all(
    slices.map((slice) => getSlice(ebName, type, slice))
  );

  // array of objects with single (unique) property into single object
  return result.reduce(
    (prev, curr) => ({ ...prev, ...curr, ebUrl: escaped }),
    {}
  );
}
