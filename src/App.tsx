import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import AIModels from './pages/AIModels'
import Research from './pages/Research'

/**
 * 应用根组件
 * 提供主题上下文和路由配置
 */
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="dtx-gi-theme">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/ai-models" element={<AIModels />} />
          <Route path="/research" element={<Research />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
