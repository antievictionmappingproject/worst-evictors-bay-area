import React, { useState, useEffect } from 'react'
import { asyncWait } from '../utils/misc'

type IntroProps = {
  setIsTransitioned: (arg0: boolean) => void
}

const Intro: React.FC<IntroProps> = ({ setIsTransitioned }) => {
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
    <div className="intro" style={{ opacity: isVisible ? 1 : 0 }}>
      <div>
        <h2>San Francisco and Oakland's</h2>
        <h1>Worst Evictors</h1>
      </div>
      <em>click anywhere to enter</em>
      <p>
        Brought to you by the Anti-Eviction Mapping Project and the
        San Francisco Anti-Displacement Coalition, with much thanks to
        JustFix.nyc
      </p>
    </div>
  )
}

export default Intro
