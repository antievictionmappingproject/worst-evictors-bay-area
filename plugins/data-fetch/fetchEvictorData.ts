import "dotenv/config";
import { createClient } from "contentful";
import type { EntryCollection } from "contentful";
import getEBEntry from "./getEBEntry";

export default async function fetchEvictorData() {
  const client = createClient({
    space: process.env.SPACE_ID,
    environment: "master",
    accessToken: process.env.ACCESS_TOKEN,
  });

  // changed content_type id from sfEvictors to just evictors on the
  // online GUI but it's not updating for the API response LOL
  const result = (await client
    .getEntries({ content_type: "sfEvictors" })
    .catch(console.error)) as EntryCollection<any>;

  const evictors = result.items
    .map(async (item) => {
      // pullQuote + citywideListDescription has way too many fields to query
      // ergonomically, so we'll just grab it as a string
      // this is how the contentful cms presents it too
      const { ebLink, type, pullQuote, citywideListDescription } = item.fields;
      if (!ebLink || !type) return;
      const ebData = await getEBEntry(ebLink, type);

      const totalEvictions = ebData.portfolio.property_portfolio.reduce(
        (prev, curr) => prev + curr.num_evictions,
        0
      );
      return {
        ...item.fields,
        id: item.sys.id,
        ebData,
        totalEvictions,
        pullQuote: { raw: JSON.stringify(pullQuote) },
        citywideListDescription: {
          raw: JSON.stringify(citywideListDescription),
        },
      };
    })
    .filter((evictor) => evictor); // 'undefined' is falsy

  const resolved = (await Promise.all(evictors))
    .sort((a, b) => b.totalEvictions - a.totalEvictions)
    .map((evictor, i) => ({ ...evictor, rank: i + 1 }));

  return resolved;
}
