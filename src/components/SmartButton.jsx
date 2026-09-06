import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'

const OPERATION_DELAY = 1400
const SUCCESS_RESET_DELAY = 1700

const SmartButton = forwardRef(function SmartButton({ onStateChange }, ref) {
  const [state, setState] = useState('idle')
  const requestId = useRef(0)
  const timers = useRef([])

  const updateState = useCallback((nextState) => {
    setState(nextState)
    onStateChange?.(nextState)
  }, [onStateChange])

  const startOperation = useCallback((outcome = 'success') => {
    if (state === 'loading') return

    const currentRequest = requestId.current + 1
    requestId.current = currentRequest
    updateState('loading')

    timers.current.push(window.setTimeout(() => {
      if (requestId.current !== currentRequest) return

      updateState(outcome)

      if (outcome === 'success') {
        timers.current.push(window.setTimeout(() => {
          if (requestId.current === currentRequest) updateState('idle')
        }, SUCCESS_RESET_DELAY))
      }
    }, OPERATION_DELAY))
  }, [state, updateState])

  useImperativeHandle(ref, () => ({ submit: startOperation }), [startOperation])

  useEffect(() => () => {
    timers.current.forEach(window.clearTimeout)
  }, [])

  const isLoading = state === 'loading'
  const buttonText = { idle: 'Send Message', loading: 'Sending', success: 'Sent', error: 'Try Again' }[state]

  return (
    <button
      className={`smart-button smart-button--${state}`}
      type="button"
      disabled={isLoading}
      aria-describedby="smart-button-status"
      onClick={() => startOperation('success')}
    >
      <span className="smart-button__icon" aria-hidden="true">
        {state === 'loading' && <span className="spinner" />}
        {state === 'success' && <span className="check-mark">✓</span>}
        {state === 'error' && <span className="error-mark">!</span>}
        {state === 'idle' && <span className="send-mark">↗</span>}
      </span>
      <span className="smart-button__label">{buttonText}</span>
    </button>
  )
})

export default SmartButton