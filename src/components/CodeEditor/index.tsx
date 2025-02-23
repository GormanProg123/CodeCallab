import MonacoEditor from 'react-monaco-editor'
import './styles/CodeEditor.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Spinner } from './layout/Spinner'
import { Terminal } from '../Terminal'
import { Compiler } from '../Compiler'

export const CodeEditor = () => {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [output, setOutput] = useState('')

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/code')
        if (response.data) {
          setCode(response.data.code || '// Start writing code...')
        }
      } catch (error) {
        console.error('Error fetching code:', error)
        toast.error('Failed to load code.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCode()
  }, [])

  const handleEditorChange = (newCode: string) => {
    setCode(newCode)
  }

  const handleSaveCode = async () => {
    setIsSaving(true)
    try {
      await axios.post('http://localhost:5000/api/code', { code })
      toast.success('Code saved successfully!')
    } catch (error) {
      console.error('Error saving code:', error)
      toast.error('Failed to save code.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCompilationResult = (result: string) => {
    setOutput(result)
  }

  return (
    <div className="editor-container">
      <ToastContainer position="top-right" autoClose={3000} />

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="editor-wrapper">
            <MonacoEditor
              language="javascript"
              theme="vs-dark"
              value={code}
              options={{
                selectOnLineNumbers: true,
                minimap: { enabled: false },
                automaticLayout: true,
              }}
              onChange={handleEditorChange}
            />
          </div>

          <div className="button-container">
            <button onClick={handleSaveCode} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save code'}
            </button>
            <Compiler code={code} onCompilation={handleCompilationResult} />
          </div>

          <div className="terminal-wrapper">
            <Terminal output={output} />
          </div>
        </>
      )}
    </div>
  )
}
