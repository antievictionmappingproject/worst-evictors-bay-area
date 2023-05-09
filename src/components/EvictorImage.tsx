import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

function EvictorImage(props) {
  return (
    <div className="evictor-image-container">
      <div className="evictor-image-column">
        <GatsbyImage
          className="background-cover-photo"
          imgClassName="background-cover-photo-image"
          image={props.image}
          alt={props.name}
        />
        <div className="photo-pattern" />
        <div className="photo-filter" />
      </div>
    </div>
  )
}

export default EvictorImage
