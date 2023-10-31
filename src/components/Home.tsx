import React, { useState } from "react"
import { getImage } from "gatsby-plugin-image"
import Header from "./Header"
import EvictorImage from "./EvictorImage"
import pin from "../images/pin.svg"
import useIndexQuery from "../queries/index"
import { formatLink } from "../utils/string"
import { sortEvictors } from "../utils/misc"
import renderContent from "../utils/contentful-render"

const LandingPage = () => {
  const { allEvictor, contentfulLandingPage } = useIndexQuery()
  const evictors = sortEvictors(allEvictor.nodes)
  /* temp measure */
  const fallback = evictors.filter(
    (evictor) => evictor.localFile?.childImageSharp
  )[0]

  return (
    <div className="homepage">
      <Header isDescription />
      <div>
        <div className="evictor-names-list">
          {Object.entries({
            sf: "San Francisco",
            oakland: "Oakland",
          }).map(([abbrev, city]) => {
            const cityEvictors = evictors.filter(
              (evictor) => evictor.city === abbrev
            )
            return (
              <div className="city-section" id={formatLink(city)}>
                <div className="city-name">
                  <img src={pin} />
                  <h2>{city}</h2>
                </div>
                {[false, true].map((isNonprofit) => {
                  const typeEvictors = cityEvictors.filter(
                    (evictor) =>
                      city === "Oakland" ||
                      evictor.nonprofitOrLowIncome === isNonprofit
                  )
                  if (isNonprofit && city === "Oakland") {
                    return null
                  }
                  return (
                    <>
                      <div className="section-header">
                        {city === "San Francisco" && (
                          <>
                            <h3>
                              {isNonprofit
                                ? "nonprofit + low-income housing evictors"
                                : "corporate evictors"}
                            </h3>
                            <p>
                              {isNonprofit &&
                                renderContent(
                                  contentfulLandingPage.nonprofitEvictorSummary
                                )}
                            </p>
                          </>
                        )}
                      </div>

                      <div className="type-list">
                        <div className="text">
                          <ol>
                            {typeEvictors.map((e, i: number) => {
                              const [isHover, setIsHover] =
                                useState(false)
                              return (
                                <a
                                  href={`/list#${formatLink(e.name)}`}
                                >
                                  <li
                                    key={i}
                                    onMouseOut={() => {
                                      setIsHover(false)
                                    }}
                                    onMouseOver={() =>
                                      setIsHover(true)
                                    }
                                    style={{
                                      background: isHover
                                        ? "red"
                                        : "",
                                    }}
                                  >
                                    <span className="counter">
                                      {(i + 1).toString().length > 1
                                        ? i + 1
                                        : "0" + (i + 1).toString()}
                                    </span>
                                    <span className="name">
                                      {e.name}
                                    </span>
                                    <span className="spacer" />
                                    <div className="description">
                                      {e.tags && (
                                        <em>{e.tags[0]} ⋅ </em>
                                      )}
                                      <em>{e.corporation}</em>
                                    </div>
                                  </li>
                                </a>
                              )
                            })}
                          </ol>
                        </div>
                        <div className="images">
                          {typeEvictors.map(
                            (e: EvictorDetails, i) => {
                              const image = e.localFile
                                ?.childImageSharp
                                ? getImage(e?.localFile)
                                : getImage(fallback?.localFile)
                              return (
                                <a
                                  href={`/list#${formatLink(e.name)}`}
                                  className="evictor-container"
                                >
                                  <EvictorImage
                                    width={250}
                                    rank={i}
                                    name={e.name}
                                    image={image}
                                  />
                                </a>
                              )
                            }
                          )}
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default LandingPage
