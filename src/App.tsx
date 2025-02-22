import { Header } from './components/Header'
import { MainContent } from './components/MainContent'
export const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MainContent />
    </div>
  )
}
