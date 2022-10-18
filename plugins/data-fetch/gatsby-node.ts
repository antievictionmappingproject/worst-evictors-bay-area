import {
  createRemoteFileNode,
  CreateRemoteFileNodeArgs,
} from 'gatsby-source-filesystem'
import fetchEvictorData from './fetchEvictorData'
import type {EntryCollection} from 'contentful'

// meh
type Merge<A, B> = {
  [K in keyof (A | B)]: K extends keyof B ? B[K] : A[K]
}
type Evictor = Merge<EntryCollection<any>, any>

const NODE_TYPE = 'Evictor'
/** turns the data fetched in ./fetchEvictorData.ts into
 * GraphQL nodes that the frontend can access
 * wanted to implement caching but it looks like it's kinda hard :'D
 * */
export const sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  cache,
}) => {
  const {createNode} = actions

  const evictors: Evictor[] = await fetchEvictorData()

  // loop through data and create Gatsby nodes
  evictors.forEach((evictor) => {
    if (!evictor?.id) return
    createNode({
      ...evictor,
      id: createNodeId(`${NODE_TYPE}-${evictor.id}`),
      parent: null,
      children: [],
      internal: {
        type: NODE_TYPE,
        content: JSON.stringify(evictor),
        contentDigest: createContentDigest(evictor),
      },
      cache,
    })
  })

  return
}

// for image caching and optimization
export const onCreateNode = async ({
  node,
  actions: {createNode, createNodeField},
  createNodeId,
  cache,
}) => {
  if (!node.photo?.fields?.file?.url) return
  if (node.internal.type === NODE_TYPE) {
    const fileNode = await createRemoteFileNode({
      // the url of the remote image to generate a node for
      // contentful api returns URLs of the form '//images.cdn.com...'
      // so we need to stick https in front
      url: 'https:' + node.photo.fields.file.url,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
    } as CreateRemoteFileNodeArgs)
    if (fileNode) {
      createNodeField({node, name: 'localFile', value: fileNode.id})
    }
  }
}

//
export const createSchemaCustomization = ({actions}) => {
  const {createTypes} = actions
  createTypes(`
    type Evictor implements Node {
      localFile: File @link(from: "fields.localFile")
    }
  `)
}
