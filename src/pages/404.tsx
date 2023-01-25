import React from 'react'
import Layout from '../components/layout'
import {OutboundLink} from '../components/outbound-link'

const NotFoundPage = () => (
  <Layout>
    <div
      style={{
        display: 'flex',
        placeItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1 className="text-center">NOT FOUND</h1>
      <p className="text-center">
        You just hit a page that doesn&#39;t exist :0
        <br />
        If you think there should be content here, please let us know
        via our{' '}
        <OutboundLink href="https://docs.google.com/forms/d/e/1FAIpQLSesFbaDWKqv3ANxJomqfeOb6hRGzs6KoBA3dSQvIVM1-yRVsQ/viewform?usp=sf_link">
          feedback form.
        </OutboundLink>{' '}
        Thank you so much!
      </p>
    </div>
  </Layout>
)

export default NotFoundPage
