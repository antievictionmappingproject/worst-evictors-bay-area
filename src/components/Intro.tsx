import React, {useState, useEffect} from 'react'
import {asyncWait} from '../utils/misc'
import arrow from '../images/arrow.svg'
import {OutboundLink} from './OutboundLink'

type IntroProps = {
  setIsTransitioned: (arg0: boolean) => void
}

const Intro: React.FC<IntroProps> = ({setIsTransitioned}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const performTransition = async () => {
      setIsVisible(false)
      await asyncWait(1000)
      setIsTransitioned(true)
    }
    document.addEventListener('click', performTransition)
    return () =>
      document.removeEventListener('click', performTransition)
  }, [])

  /* the text here should eventually be put into contentful,
   * but who cares*/
  return (
    <div className="intro" style={{opacity: isVisible ? 1 : 0}}>
      <div>
        <h2>San Francisco and Oakland's</h2>
        <h1>Worst Evictors</h1>
      </div>
      <div className="click-prompt">
        <span>click anywhere to enter</span>
        <img src={arrow} />
      </div>
      <p>
        Brought to you by the{' '}
        <OutboundLink href="https://antievictionmap.com/">
          Anti&#8209;Eviction Mapping Project
        </OutboundLink>{' '}
        and the{' '}
        <OutboundLink href="https://sfadc.org/">
          San Francisco Anti-Displacement Coalition
        </OutboundLink>, with many thanks to{' '}
        <OutboundLink href="https://www.justfix.org">
          JustFixNYC
        </OutboundLink>{' '}
      </p>
    </div>
  )
}

export default Intro
