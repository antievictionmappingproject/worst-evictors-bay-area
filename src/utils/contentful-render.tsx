import React, {ReactNode} from 'react'
import {MARKS, INLINES} from '@contentful/rich-text-types'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'

const contentfulOptions = {
  renderMark: {
    [MARKS.UNDERLINE]: (text: ReactNode) => <span>{text}</span>,
  },
  renderNode: {
    [INLINES.HYPERLINK]: ({data}, children) => {
      if((data.uri).includes("youtube.com/embed") || (data.uri).includes("soundcloud.com/player")) {
        return <iframe title="Unique Title 002" src={data.uri}
          width="100%" height="360" 
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
      } 
      return <a href={data.uri} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    },
  },
}

const renderContent = (node: { raw: string }) => {
  return documentToReactComponents(
    JSON.parse(node.raw),
    contentfulOptions
  )
}

export default renderContent
