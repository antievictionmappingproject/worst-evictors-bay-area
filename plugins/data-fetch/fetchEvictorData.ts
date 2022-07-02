import "dotenv/config"
import { createClient } from "contentful"
import type { EntryCollection } from "contentful"
import getEBEntry from "./getEBEntry"
import { promises as fs } from "fs"

export default async function fetchEvictorData() {
  const client = createClient({
    space: process.env.SPACE_ID,
    environment: "master",
    accessToken: process.env.ACCESS_TOKEN,
  })

  // changed content_type id from sfEvictors to just evictors on the
  // online GUI but it's not updating for the API response LOL
  const result = (await client
    .getEntries({ content_type: "sfEvictors" })
    .catch(console.error)) as EntryCollection<any>

  const evictors = result.items
    .map(async (item) => {
      const { ebLink, type } = item.fields
      if (!ebLink || !type) return
      const ebData = await getEBEntry(ebLink, type)
      return { ...item.fields, id: item.sys.id, ebData }
    })
    .filter((evictor) => evictor) // 'undefined' is falsy, ...

  return Promise.all(evictors)
}
