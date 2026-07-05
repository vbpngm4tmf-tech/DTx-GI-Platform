import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

/**
 * 布局组件
 * 包含顶部导航栏、侧边栏和主内容区域
 * 实现响应式设计：移动端侧边栏可折叠
 */
export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // 窗口大小变化时关闭侧边栏
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 阻止滚动穿透
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航栏 */}
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />

      <div className="flex">
        {/* 侧边栏 */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* 主内容区域 */}
        <main className="flex-1 min-w-0">
          <div className="container mx-auto p-4 lg:p-6 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
