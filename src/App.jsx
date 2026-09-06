import { useRef, useState } from 'react'
import SmartButton from './components/SmartButton'
import './App.css'

function App() {
  const buttonRef = useRef(null)
  const [state, setState] = useState('idle')
  const stateLabels = { idle: 'Ready for a message', loading: 'Working on it...', success: 'Message sent successfully', error: 'Message failed. A retry is ready.' }

  return (
    <main className="page-shell">
      <header className="masthead"><p className="eyebrow">Interaction study / 001</p><span className="signal" aria-hidden="true" /></header>
      <section className="intro" aria-labelledby="page-title">
        <p className="kicker">A button with a memory</p>
        <h1 id="page-title">Buttons with<br /><em>a Brain</em></h1>
        <p className="intro__copy">A focused study in feedback, timing, and the tiny moments that make an interaction feel considered.</p>
      </section>

      <section className="demo-panel" aria-labelledby="demo-title">
        <div className="demo-panel__topline"><div><p className="section-label">Live component</p><h2 id="demo-title">Message delivery</h2></div><span className={`state-chip state-chip--${state}`}><span className="state-chip__dot" aria-hidden="true" />{state}</span></div>
        <div className="button-stage"><SmartButton ref={buttonRef} onStateChange={setState} /><p id="smart-button-status" className="status-message" aria-live="polite">{stateLabels[state]}</p></div>
        <div className="controls" aria-label="Deterministic outcome controls"><span className="controls__label">Test an outcome</span><div className="controls__buttons"><button type="button" className="outcome-control outcome-control--success" onClick={() => buttonRef.current?.submit('success')} disabled={state === 'loading'}><span aria-hidden="true">↗</span> Force Success</button><button type="button" className="outcome-control outcome-control--error" onClick={() => buttonRef.current?.submit('error')} disabled={state === 'loading'}><span aria-hidden="true">!</span> Force Error</button></div></div>
      </section>

      <section className="motion-notes" aria-labelledby="notes-title"><div><p className="section-label">Motion notes</p><h2 id="notes-title">The pause is part<br />of the answer.</h2></div><p>Transitions use a 280ms ease-out for responsive state changes. Loading resolves after 1.4 seconds, then success holds for 1.7 seconds before returning to idle. Only opacity and transform are animated, keeping the interaction smooth and light.</p></section>
      <footer className="footer-note"><span>React / plain JavaScript</span><span>Designed for clarity</span></footer>
    </main>
  )
}

export default App
