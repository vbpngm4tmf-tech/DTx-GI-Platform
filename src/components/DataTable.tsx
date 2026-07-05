import { useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Column<T> {
  key: string
  title: string
  dataIndex?: keyof T
  render?: (record: T) => React.ReactNode
  sorter?: (a: T, b: T) => number
  width?: string
  align?: 'left' | 'center' | 'right'
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  rowKey: keyof T
  title?: string
  description?: string
  pagination?: {
    pageSize: number
    showSizeChanger?: boolean
  }
  className?: string
  onRowClick?: (record: T) => void
}

type SortOrder = 'asc' | 'desc' | null

interface SortState {
  key: string | null
  order: SortOrder
}

/**
 * 数据表格组件
 * 支持排序、分页、行点击等功能
 */
export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  title,
  description,
  pagination,
  className,
  onRowClick,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sort, setSort] = useState<SortState>({ key: null, order: null })

  const pageSize = pagination?.pageSize || 10
  const totalPages = Math.ceil(data.length / pageSize)

  // 处理排序
  const handleSort = (column: Column<T>) => {
    if (!column.sorter) return

    if (sort.key === column.key) {
      setSort({
        key: sort.order === 'desc' ? null : column.key,
        order: sort.order === 'asc' ? 'desc' : sort.order === 'desc' ? null : 'asc',
      })
    } else {
      setSort({ key: column.key, order: 'asc' })
    }
  }

  // 排序后的数据
  const sortedData = [...data].sort((a, b) => {
    if (!sort.key || !sort.order) return 0
    const column = columns.find((c) => c.key === sort.key)
    if (!column || !column.sorter) return 0
    return sort.order === 'asc' ? column.sorter(a, b) : column.sorter(b, a)
  })

  // 分页数据
  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData

  // 获取排序图标
  const getSortIcon = (column: Column<T>) => {
    if (!column.sorter) return null
    if (sort.key !== column.key) return <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/50" />
    if (sort.order === 'asc') return <ArrowUp className="h-3.5 w-3.5 text-primary" />
    if (sort.order === 'desc') return <ArrowDown className="h-3.5 w-3.5 text-primary" />
    return <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/50" />
  }

  return (
    <div className={cn('rounded-lg border bg-card shadow-sm overflow-hidden', className)}>
      {/* 表格头部 */}
      {(title || description) && (
        <div className="border-b px-4 py-3">
          {title && <h3 className="text-base font-semibold">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
        </div>
      )}

      {/* 表格 */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-4 py-3 text-left font-medium text-muted-foreground',
                    column.sorter && 'cursor-pointer select-none hover:text-foreground',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right'
                  )}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column)}
                >
                  <div className={cn('flex items-center gap-1', column.align === 'center' && 'justify-center', column.align === 'right' && 'justify-end')}>
                    {column.title}
                    {getSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  暂无数据
                </td>
              </tr>
            ) : (
              paginatedData.map((record, index) => (
                <tr
                  key={String(record[rowKey])}
                  className={cn(
                    'border-b transition-colors',
                    index % 2 === 0 ? 'bg-background' : 'bg-muted/20',
                    onRowClick && 'cursor-pointer hover:bg-muted/50'
                  )}
                  onClick={() => onRowClick?.(record)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        'px-4 py-3',
                        column.align === 'center' && 'text-center',
                        column.align === 'right' && 'text-right'
                      )}
                    >
                      {column.render
                        ? column.render(record)
                        : column.dataIndex
                        ? String(record[column.dataIndex] ?? '-')
                        : '-'}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-muted-foreground">
            共 {data.length} 条记录，第 {currentPage}/{totalPages} 页
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className={cn(
                'inline-flex items-center justify-center rounded-md p-1.5',
                'hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              aria-label="第一页"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={cn(
                'inline-flex items-center justify-center rounded-md p-1.5',
                'hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              aria-label="上一页"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm px-2">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={cn(
                'inline-flex items-center justify-center rounded-md p-1.5',
                'hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              aria-label="下一页"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className={cn(
                'inline-flex items-center justify-center rounded-md p-1.5',
                'hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              aria-label="最后一页"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
