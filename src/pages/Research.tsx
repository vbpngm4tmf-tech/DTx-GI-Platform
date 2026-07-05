import { useState } from 'react'
import {
  FlaskConical,
  Shield,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
} from 'lucide-react'
import { cn, formatDate, getStatusColor } from '@/lib/utils'
import DataTable from '@/components/DataTable'

interface ResearchProject {
  id: string
  name: string
  pi: string
  institution: string
  status: string
  startDate: string
  endDate: string
  progress: number
}

interface EthicsReview {
  id: string
  projectName: string
  reviewType: string
  status: string
  submissionDate: string
  approvalDate?: string
}

interface Paper {
  id: string
  title: string
  authors: string
  journal: string
  status: string
  submitDate: string
}

const projects: ResearchProject[] = [
  {
    id: '1',
    name: '多中心胃癌早期筛查研究',
    pi: '洪流',
    institution: '西京医院',
    status: '进行中',
    startDate: '2024-01-01',
    endDate: '2026-12-31',
    progress: 35,
  },
  {
    id: '2',
    name: 'IBD 数字疗法临床试验',
    pi: '洪流',
    institution: '西京医院',
    status: '进行中',
    startDate: '2024-06-01',
    endDate: '2025-06-01',
    progress: 15,
  },
]

const ethicsReviews: EthicsReview[] = [
  {
    id: '1',
    projectName: '多中心胃癌早期筛查研究',
    reviewType: '初始审查',
    status: '已通过',
    submissionDate: '2024-01-15',
    approvalDate: '2024-02-01',
  },
  {
    id: '2',
    projectName: 'IBD 数字疗法临床试验',
    reviewType: '初始审查',
    status: '待审核',
    submissionDate: '2024-06-20',
  },
  {
    id: '3',
    projectName: 'AI辅助病理诊断验证',
    reviewType: '修正案审查',
    status: '需修改',
    submissionDate: '2024-05-10',
  },
  {
    id: '4',
    projectName: '患者预后预测模型',
    reviewType: '年度跟踪',
    status: '已通过',
    submissionDate: '2024-03-01',
    approvalDate: '2024-03-15',
  },
]

const papers: Paper[] = [
  {
    id: '1',
    title: '基于深度学习的胃癌早期诊断模型：多中心回顾性研究',
    authors: '洪流, 张三, 李四等',
    journal: '中华医学杂志',
    status: '已发表',
    submitDate: '2024-02-01',
  },
  {
    id: '2',
    title: 'Digital Therapeutics for IBD: A Randomized Controlled Trial',
    authors: 'Hong L, Zhang S, Wang W et al.',
    journal: 'Gastroenterology',
    status: '审稿中',
    submitDate: '2024-05-15',
  },
  {
    id: '3',
    title: '结直肠息肉AI检测系统的临床应用评估',
    authors: '洪流, 赵六, 孙七等',
    journal: '中华消化内镜杂志',
    status: '撰写中',
    submitDate: '2024-07-01',
  },
]

type TabType = 'projects' | 'ethics' | 'papers'

export default function Research() {
  const [activeTab, setActiveTab] = useState<TabType>('projects')
  const [selectedProject, setSelectedProject] = useState<ResearchProject | null>(null)

  const tabs = [
    { key: 'projects' as TabType, label: '研究项目', icon: FlaskConical },
    { key: 'ethics' as TabType, label: '伦理审查', icon: Shield },
    { key: 'papers' as TabType, label: '论文发表', icon: FileText },
  ]

  const projectColumns = [
    { key: 'name', title: '项目名称', dataIndex: 'name' as keyof ResearchProject },
    { key: 'pi', title: 'PI', dataIndex: 'pi' as keyof ResearchProject },
    { key: 'status', title: '状态', render: (r: ResearchProject) => (
      <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', getStatusColor(r.status))}>
        {r.status}
      </span>
    )},
    { key: 'progress', title: '进度', render: (r: ResearchProject) => (
      <div className="w-24">
        <div className="flex justify-between text-xs mb-1">
          <span>{r.progress}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${r.progress}%` }}
          />
        </div>
      </div>
    )},
    {
      key: 'actions',
      title: '操作',
      render: (r: ResearchProject) => (
        <button
          onClick={(e) => {
            e.stopPropagation()
            setSelectedProject(r)
          }}
          className="text-sm text-primary hover:underline"
        >
          详情
        </button>
      ),
    },
  ]

  const ethicsColumns = [
    { key: 'projectName', title: '项目名称', dataIndex: 'projectName' as keyof EthicsReview },
    { key: 'reviewType', title: '审查类型', dataIndex: 'reviewType' as keyof EthicsReview },
    {
      key: 'status',
      title: '状态',
      render: (r: EthicsReview) => (
        <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', getStatusColor(r.status))}>
          {r.status}
        </span>
      ),
    },
    { key: 'submissionDate', title: '提交日期', render: (r: EthicsReview) => formatDate(r.submissionDate) },
    { key: 'approvalDate', title: '批准日期', render: (r: EthicsReview) => r.approvalDate ? formatDate(r.approvalDate) : '-' },
  ]

  const paperColumns = [
    { key: 'title', title: '标题', dataIndex: 'title' as keyof Paper },
    { key: 'authors', title: '作者', dataIndex: 'authors' as keyof Paper },
    { key: 'journal', title: '期刊', dataIndex: 'journal' as keyof Paper },
    {
      key: 'status',
      title: '状态',
      render: (r: Paper) => (
        <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', getStatusColor(r.status))}>
          {r.status}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">科研管理</h1>
        <p className="text-muted-foreground mt-1">管理研究项目、伦理审查和论文发表</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card p-4 flex items-center gap-4">
          <div className="rounded-lg bg-blue-500/10 p-3">
            <FlaskConical className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{projects.length}</p>
            <p className="text-sm text-muted-foreground">研究项目</p>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4 flex items-center gap-4">
          <div className="rounded-lg bg-green-500/10 p-3">
            <Shield className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{ethicsReviews.filter(e => e.status === '已通过').length}</p>
            <p className="text-sm text-muted-foreground">已通过伦理</p>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4 flex items-center gap-4">
          <div className="rounded-lg bg-purple-500/10 p-3">
            <FileText className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{papers.filter(p => p.status === '已发表').length}</p>
            <p className="text-sm text-muted-foreground">已发表论文</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors',
                activeTab === tab.key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'projects' && (
        <DataTable
          columns={projectColumns}
          data={projects}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}

      {activeTab === 'ethics' && (
        <DataTable
          columns={ethicsColumns}
          data={ethicsReviews}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}

      {activeTab === 'papers' && (
        <DataTable
          columns={paperColumns}
          data={papers}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedProject(null)}>
          <div
            className="relative w-full max-w-lg rounded-lg bg-card p-6 shadow-lg m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 rounded-md p-1 hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedProject.name}</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-muted-foreground">PI</p><p className="font-medium">{selectedProject.pi}</p></div>
                <div><p className="text-xs text-muted-foreground">机构</p><p className="font-medium">{selectedProject.institution}</p></div>
                <div><p className="text-xs text-muted-foreground">开始日期</p><p className="font-medium">{formatDate(selectedProject.startDate)}</p></div>
                <div><p className="text-xs text-muted-foreground">结束日期</p><p className="font-medium">{formatDate(selectedProject.endDate)}</p></div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">进度</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${selectedProject.progress}%` }} />
                  </div>
                  <span className="text-sm font-medium">{selectedProject.progress}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
