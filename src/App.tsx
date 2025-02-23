import { Header } from './components/Header'
import { MainContent } from './components/MainContent'
import { CodeEditor } from './components/CodeEditor'
export const App = () => {
  return (
    <div>
      <Header />
      <MainContent />
      <CodeEditor />
    </div>
  )
}
