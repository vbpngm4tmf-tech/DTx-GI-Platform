import { Moon, Sun, Bell, Search, Menu } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { cn } from '@/lib/utils'

interface HeaderProps {
  onMenuClick: () => void
  sidebarOpen: boolean
}

/**
 * 顶部导航栏组件
 * 包含Logo、搜索框、通知和主题切换
 */
export default function Header({ onMenuClick, sidebarOpen }: HeaderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 gap-4">
        {/* 移动端菜单按钮 */}
        <button
          onClick={onMenuClick}
          className={cn(
            "inline-flex items-center justify-center rounded-md p-2 text-sm font-medium",
            "hover:bg-accent hover:text-accent-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "lg:hidden"
          )}
          aria-label="切换侧边栏"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Logo 区域 */}
        <div className="flex items-center gap-2 min-w-fit">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-primary-foreground font-bold text-sm">DTx</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-none hidden sm:inline-block">
              DTx-GI
            </span>
            <span className="text-[10px] text-muted-foreground leading-none hidden sm:inline-block mt-0.5">
              数字疗法平台
            </span>
          </div>
        </div>

        {/* 搜索框 */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索患者、项目、模型..."
              className={cn(
                "w-full rounded-md border border-input bg-background pl-9 pr-4 py-1.5",
                "text-sm ring-offset-background",
                "placeholder:text-muted-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            />
          </div>
        </div>

        {/* 右侧操作区 */}
        <div className="flex items-center gap-2 ml-auto">
          {/* 通知按钮 */}
          <button
            className={cn(
              "relative inline-flex items-center justify-center rounded-md p-2",
              "text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
            aria-label="通知"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* 主题切换按钮 */}
          <button
            onClick={toggleTheme}
            className={cn(
              "inline-flex items-center justify-center rounded-md p-2",
              "text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
            aria-label="切换主题"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* 用户信息 */}
          <div className="flex items-center gap-2 ml-2 pl-2 border-l">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">洪</span>
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="text-sm font-medium leading-none">洪流教授</span>
              <span className="text-xs text-muted-foreground leading-none mt-0.5">主任医师</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
