import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Brain,
  FlaskConical,
  Home,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * 导航项配置
 */
const navigation = [
  { name: '首页', href: '/', icon: Home },
  { name: '数据看板', href: '/dashboard', icon: LayoutDashboard },
  { name: '患者管理', href: '/patients', icon: Users },
  { name: 'AI 模型', href: '/ai-models', icon: Brain },
  { name: '科研管理', href: '/research', icon: FlaskConical },
]

/**
 * 侧边栏导航组件
 * 包含主导航链接和移动端关闭按钮
 */
export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()

  return (
    <>
      {/* 移动端遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* 侧边栏 */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 border-r bg-background',
          'transform transition-transform duration-300 ease-in-out',
          'lg:translate-x-0 lg:static lg:z-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* 移动端关闭按钮 */}
        <div className="flex items-center justify-between h-14 px-4 border-b lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-primary-foreground font-bold text-sm">DTx</span>
            </div>
            <span className="font-semibold">DTx-GI 平台</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 hover:bg-accent"
            aria-label="关闭侧边栏"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 导航菜单 */}
        <nav className="flex flex-col gap-1 p-3">
          {/* 桌面端 Logo 区域 */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-4 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg">
              <span className="text-primary-foreground font-bold text-lg">DTx</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">DTx-GI</span>
              <span className="text-xs text-muted-foreground">数字疗法平台</span>
            </div>
          </div>

          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
            主导航
          </div>

          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            const Icon = item.icon

            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => {
                  // 移动端点击后关闭侧边栏
                  if (window.innerWidth < 1024) {
                    onClose()
                  }
                }}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className={cn('h-5 w-5', isActive && 'text-primary')} />
                {item.name}
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* 底部信息 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">所属机构</p>
            <p className="text-sm font-medium">空军军医大学西京医院</p>
            <p className="text-xs text-muted-foreground mt-1">胃肠外科</p>
          </div>
        </div>
      </aside>
    </>
  )
}
