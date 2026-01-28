import { useState } from 'react'

export default function FeedbackWidget() {
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)

  function submit(e) {
    e.preventDefault()
    setSent(true)
    setText('')
  }

  return (
    <form onSubmit={submit} className="mt-6">
      <textarea data-testid="feedback-input" value={text} onChange={e => setText(e.target.value)} placeholder="Feedback" />
      <button data-testid="feedback-submit" type="submit">Submit</button>
      {sent && <div data-testid="feedback-success-message">Thanks for your feedback!</div>}
    </form>
  )
}
