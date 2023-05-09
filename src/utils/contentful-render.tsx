import React, { ReactNode } from "react"
import { MARKS, INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const contentfulOptions = {
  renderMark: {
    [MARKS.UNDERLINE]: (text: ReactNode) => <span>{text}</span>,
  },
  renderNode: {
    [INLINES.HYPERLINK]: ({ data }, children) => (
      <a href={data.uri} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
}

const renderContent = (node: { raw: string }) => {
  return documentToReactComponents(
    JSON.parse(node.raw),
    contentfulOptions
  )
}

export default renderContent
