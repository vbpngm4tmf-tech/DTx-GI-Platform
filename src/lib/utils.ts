import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 合并 Tailwind CSS 类名
 * 使用 clsx 处理条件类名，再用 tailwind-merge 合并冲突
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 格式化日期
 * @param date 日期字符串或 Date 对象
 * @returns 格式化后的日期字符串 (YYYY年MM月DD日)
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * 格式化日期时间
 * @param date 日期字符串或 Date 对象
 * @returns 格式化后的日期时间字符串
 */
export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * 格式化数字为百分比
 * @param value 数值 (0-1)
 * @param decimals 小数位数
 * @returns 百分比字符串
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`
}

/**
 * 格式化数字，添加千分位分隔符
 * @param value 数值
 * @returns 格式化后的字符串
 */
export function formatNumber(value: number): string {
  return value.toLocaleString('zh-CN')
}

/**
 * 获取状态对应的颜色类名
 * @param status 状态字符串
 * @returns Tailwind 颜色类名
 */
export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    '活跃': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    '进行中': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    '已完成': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    '已暂停': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    '待审核': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    '已通过': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    '已拒绝': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    '训练中': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    '训练完成': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    '训练失败': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    '未开始': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  }
  return statusMap[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
}
