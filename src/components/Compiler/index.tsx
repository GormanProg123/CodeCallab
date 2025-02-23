import { useState } from 'react'

export const Compiler = ({
  code,
  onCompilation,
}: {
  code: string
  onCompilation: (result: string) => void
}) => {
  const [compiling, setCompiling] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const compileCode = () => {
    setCompiling(true)
    setError(null)

    onCompilation('')

    setTimeout(() => {
      try {
        let output = ''

        const originalConsoleLog = console.log
        console.log = (...args) => {
          output += args.join(' ') + '\n'
        }

        eval(code)

        console.log = originalConsoleLog

        onCompilation(output || 'Code executed successfully!')
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
          onCompilation(err.message)
        } else {
          setError('An unknown error occurred')
          onCompilation('An unknown error occurred')
        }
      } finally {
        setCompiling(false)
      }
    }, 1000)
  }

  return (
    <div>
      <button onClick={compileCode} disabled={compiling}>
        {compiling ? 'Compiling...' : 'Compile Code'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}
