import './styles/Terminal.css'

interface TerminalProps {
  output: string
}

export const Terminal = ({ output }: TerminalProps) => {
  return (
    <div className="terminal-container">
      <pre>{output}</pre>
    </div>
  )
}
