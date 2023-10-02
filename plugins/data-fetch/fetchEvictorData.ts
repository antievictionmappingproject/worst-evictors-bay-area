import 'dotenv/config'
import {createClient} from 'contentful'
import type {EntryCollection} from 'contentful'
import getEBEntry from './getEBEntry'

export default async function fetchEvictorData() {
  const client = createClient({
    space: process.env.SPACE_ID,
    environment: 'master',
    accessToken: process.env.ACCESS_TOKEN,
  })

  // changed content_type id from sfEvictors to just evictors on the
  // online GUI but it's not updating for the API response LOL
  const result = (await client
    .getEntries({content_type: 'sfEvictors'})
    .catch(console.error)) as EntryCollection<any>

  const evictors = result.items
    .map(async (item) => {
      try {
        // pullQuote + citywideListDescription has way too many fields to query
        // ergonomically, so we'll just grab it as a string
        // this is how the contentful cms presents it too
        const {ebEntry, name, pullQuote, citywideListDescription} =
          item.fields

        if (!ebEntry?.length) {
          console.warn(
            `${name} doesn't have an Evictorbook entry entered on Contentful`
          )
        }

        const ebData = await Promise.all(
          ebEntry.map((business: string) =>
            getEBEntry(business).catch((err) => {
              console.error(`Error on ${name}, ${ebEntry}: ${err}`)
            })
          )
        )

        /* Validation for common missing data types
         * Added on Contentful, but contentful does not perform validation for existing entries
         * */
        if (typeof item.fields.nonprofitOrLowIncome === 'undefined') {
          console.warn(`${name} is missing nonprofit status`)
        }
        if (!item.fields.photo) {
          console.warn(`${name} is missing photo`)
        }
        if (!pullQuote) {
          console.warn(`${name} is missing pull quote`)
        }

        // Count unique evictions
        const uniqueEvictions: { [evictionId: string]: any } = {}
        ebData.forEach((business) => {
          business.evictions.forEach((eviction) => {
            uniqueEvictions[eviction.evict_id] = eviction
          })
        })
        const totalEvictions = Object.keys(uniqueEvictions).length

        // same thing but for properties, logic is slightly different.
        const uniqueUnits: { [parcelId: string]: number } = {}
        ebData.forEach((business) => {
          business.portfolio.forEach((parcel) => {
            uniqueUnits[parcel.parcel_id] = parcel.units
          })
        })
        const totalUnits = Object.values(uniqueUnits).reduce(
          (prev, number) => {
            return prev + number
          },
          0
        )

        // some related metadata
        const activeSince = Math.min(
          ...ebData.map((business) => {
            return Number(
              business.details[0].creation_date.toString().slice(0, 4)
            )
          })
        )

        if (!totalEvictions) {
          console.error(
            `Wanted a positive integer for ${name}'s eviction count, but received: ${totalEvictions}`
          )
        }
        if (!totalUnits) {
          console.error(
            `Wanted a positive integer for ${name}'s unit count, but received: ${totalEvictions}`
          )
        }

        return {
          ...item.fields,
          id: item.sys.id,
          ebData,
          totalEvictions,
          activeSince,
          totalUnits,
          evictions: Object.values(uniqueEvictions),
          pullQuote: {raw: JSON.stringify(pullQuote)},
          citywideListDescription: {
            raw: JSON.stringify(citywideListDescription),
          },
        }
      } catch (e) {
        console.error(`${e}: ${item.fields.name}`)
      }
    })
    .filter((evictor) => evictor) // 'undefined' is falsy

  const resolved = (await Promise.all(evictors)).sort(
    (a, b) => a.rank - b.rank
  )

  return resolved
}
