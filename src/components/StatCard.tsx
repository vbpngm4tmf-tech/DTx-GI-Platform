import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    positive: boolean
  }
  className?: string
}

/**
 * 统计卡片组件
 * 用于展示关键指标数据，支持趋势指示
 */
export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card p-4 shadow-sm',
        'hover:shadow-md transition-shadow',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground truncate">
            {title}
          </p>
          <p className="mt-1.5 text-2xl font-bold tracking-tight">
            {value}
          </p>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">
              {description}
            </p>
          )}
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={cn(
                  'inline-flex items-center text-xs font-medium',
                  trend.positive
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                )}
              >
                {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-muted-foreground">较上月</span>
            </div>
          )}
        </div>
        <div className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  )
}
