import { useState } from 'react'
import { Plus, Search, Eye, Edit2, X } from 'lucide-react'
import { cn, formatDate, getStatusColor } from '@/lib/utils'
import DataTable from '@/components/DataTable'

interface Patient {
  id: string
  code: string
  name: string
  age: number
  gender: string
  diagnosis: string
  treatmentPlan: string
  status: string
  admissionDate: string
  phone: string
}

const mockPatients: Patient[] = [
  {
    id: '1',
    code: 'P2024001',
    name: '张某某',
    age: 58,
    gender: '男',
    diagnosis: '胃癌（进展期）',
    treatmentPlan: '新辅助化疗 + 手术',
    status: '治疗中',
    admissionDate: '2024-01-15',
    phone: '138****1234',
  },
  {
    id: '2',
    code: 'P2024002',
    name: '李某某',
    age: 45,
    gender: '女',
    diagnosis: '结直肠癌',
    treatmentPlan: '腹腔镜手术',
    status: '术后康复',
    admissionDate: '2024-02-20',
    phone: '139****5678',
  },
  {
    id: '3',
    code: 'P2024003',
    name: '王某某',
    age: 62,
    gender: '男',
    diagnosis: '胃溃疡',
    treatmentPlan: '药物治疗',
    status: '随访',
    admissionDate: '2024-03-10',
    phone: '137****9012',
  },
  {
    id: '4',
    code: 'P2024004',
    name: '赵某某',
    age: 35,
    gender: '女',
    diagnosis: 'IBD（克罗恩病）',
    treatmentPlan: '生物制剂治疗',
    status: '治疗中',
    admissionDate: '2024-04-05',
    phone: '136****3456',
  },
  {
    id: '5',
    code: 'P2024005',
    name: '刘某某',
    age: 51,
    gender: '男',
    diagnosis: '胃间质瘤',
    treatmentPlan: '靶向治疗',
    status: '随访',
    admissionDate: '2024-05-12',
    phone: '135****7890',
  },
]

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredPatients = mockPatients.filter((p) =>
    p.name.includes(searchTerm) ||
    p.code.includes(searchTerm) ||
    p.diagnosis.includes(searchTerm)
  )

  const columns = [
    { key: 'code', title: '患者编号', dataIndex: 'code' as keyof Patient },
    { key: 'name', title: '姓名', dataIndex: 'name' as keyof Patient },
    { key: 'age', title: '年龄', dataIndex: 'age' as keyof Patient, align: 'center' as const },
    { key: 'gender', title: '性别', dataIndex: 'gender' as keyof Patient, align: 'center' as const },
    {
      key: 'diagnosis',
      title: '诊断',
      dataIndex: 'diagnosis' as keyof Patient,
    },
    {
      key: 'status',
      title: '状态',
      render: (record: Patient) => (
        <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', getStatusColor(record.status))}>
          {record.status}
        </span>
      ),
    },
    {
      key: 'actions',
      title: '操作',
      align: 'center' as const,
      render: (record: Patient) => (
        <button
          onClick={(e) => {
            e.stopPropagation()
            setSelectedPatient(record)
          }}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
        >
          <Eye className="h-3.5 w-3.5" />
          查看
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">患者管理</h1>
          <p className="text-muted-foreground mt-1">管理患者信息、治疗方案和随访记录</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          添加患者
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="搜索患者编号、姓名、诊断..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={cn(
            'w-full rounded-md border border-input bg-background pl-9 pr-4 py-2',
            'text-sm ring-offset-background',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredPatients}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        onRowClick={(record) => setSelectedPatient(record)}
      />

      {/* Detail Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedPatient(null)}>
          <div
            className="relative w-full max-w-lg rounded-lg bg-card p-6 shadow-lg m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPatient(null)}
              className="absolute right-4 top-4 rounded-md p-1 hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="text-xl font-bold mb-4">患者详情</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">患者编号</p>
                  <p className="font-medium">{selectedPatient.code}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">姓名</p>
                  <p className="font-medium">{selectedPatient.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">年龄</p>
                  <p className="font-medium">{selectedPatient.age} 岁</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">性别</p>
                  <p className="font-medium">{selectedPatient.gender}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">入院日期</p>
                  <p className="font-medium">{formatDate(selectedPatient.admissionDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">状态</p>
                  <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', getStatusColor(selectedPatient.status))}>
                    {selectedPatient.status}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">诊断</p>
                <p className="font-medium">{selectedPatient.diagnosis}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">治疗方案</p>
                <p className="font-medium">{selectedPatient.treatmentPlan}</p>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                <Edit2 className="h-4 w-4" />
                编辑
              </button>
              <button
                onClick={() => setSelectedPatient(null)}
                className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-accent"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowAddModal(false)}>
          <div
            className="relative w-full max-w-lg rounded-lg bg-card p-6 shadow-lg m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 rounded-md p-1 hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="text-xl font-bold mb-4">添加患者</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">姓名</label>
                  <input className="w-full rounded-md border border-input px-3 py-2 text-sm" placeholder="患者姓名" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">年龄</label>
                  <input type="number" className="w-full rounded-md border border-input px-3 py-2 text-sm" placeholder="年龄" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">诊断</label>
                <input className="w-full rounded-md border border-input px-3 py-2 text-sm" placeholder="初步诊断" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">治疗方案</label>
                <textarea className="w-full rounded-md border border-input px-3 py-2 text-sm" rows={3} placeholder="治疗方案" />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  保存
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-accent"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
