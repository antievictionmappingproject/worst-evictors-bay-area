import React from 'react'
import Helmet from 'react-helmet'

import Footer from './Footer'
import NavMenu from './Menu'

type Props = {
  children: React.ReactNode
  customTitle?: string
  customDescription?: string
  customUrl?: string
  customImage?: string
  className?: string
  hideFooter?: boolean
  hideNavMenu?: boolean
}

const Layout = ({
  children,
  customTitle,
  customDescription,
  customUrl,
  customImage,
  className,
  hideFooter,
  hideNavMenu,
}: Props) => {
  const title =
    customTitle || 'The Worst Evictors of San Francisco and Oakland'
  const description =
    customDescription ||
    'Data from the Anti-Eviction Mapping Project\'s (AEMP) Evictorbook tool and research gathered by AEMP researchers finds these landlords guilty of serial evictions.'
  const url = customUrl || 'https://www.worstevictorsbayarea.org'
  const shareImageURL =
    customImage || 'https://i.imgur.com/NIFo6iC.png'

  return (
    <div className={className}>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="oakland, san francisco, sf, worst, evictions, evictors, lawsuits, cases, rtc, right, to, counsel, tenant, organizing, landlord, map, covid, covid-19, housing court, eviction filings"
        />
        <meta
          name="author"
          content="The Anti-Eviction Mapping Project and the San Francisco Anti-Displacement Coalition."
        />
        <meta property="og:site_name" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={shareImageURL} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@antievictionmap" />
        <meta name="twitter:creator" content="@antievictionmap" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:image" content={shareImageURL} />
        <meta
          name="twitter:image:alt"
          content="The Worst Evictors of San Francisco and Oakland"
        />
      </Helmet>
      {!hideNavMenu && <NavMenu />}
      <div className="page-content">{children}
      {!hideFooter && <Footer />}
      </div>
    </div>
  )
}

export default Layout
