import {
  AreaChart,
  Area,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  Users,
  Brain,
  FlaskConical,
  TrendingUp,
} from 'lucide-react'
import StatCard from '@/components/StatCard'

const patientTrendData = [
  { month: '1月', patients: 820, newCases: 120 },
  { month: '2月', patients: 880, newCases: 140 },
  { month: '3月', patients: 950, newCases: 160 },
  { month: '4月', patients: 1020, newCases: 180 },
  { month: '5月', patients: 1100, newCases: 200 },
  { month: '6月', patients: 1280, newCases: 220 },
]

const modelAccuracyData = [
  { month: '1月', gastric: 0.88, colorectal: 0.85, nlp: 0.92 },
  { month: '2月', gastric: 0.90, colorectal: 0.87, nlp: 0.93 },
  { month: '3月', gastric: 0.91, colorectal: 0.89, nlp: 0.94 },
  { month: '4月', gastric: 0.92, colorectal: 0.90, nlp: 0.94 },
  { month: '5月', gastric: 0.93, colorectal: 0.91, nlp: 0.95 },
  { month: '6月', gastric: 0.94, colorectal: 0.92, nlp: 0.95 },
]

const diagnosisData = [
  { name: '胃癌', value: 35, color: '#3b82f6' },
  { name: '结直肠癌', value: 28, color: '#8b5cf6' },
  { name: '胃溃疡', value: 20, color: '#22c55e' },
  { name: 'IBD', value: 12, color: '#f59e0b' },
  { name: '其他', value: 5, color: '#6b7280' },
]

const researchData = [
  { month: '1月', papers: 3, projects: 2 },
  { month: '2月', papers: 4, projects: 1 },
  { month: '3月', papers: 5, projects: 3 },
  { month: '4月', papers: 6, projects: 2 },
  { month: '5月', papers: 8, projects: 4 },
  { month: '6月', papers: 10, projects: 3 },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">数据看板</h1>
        <p className="text-muted-foreground mt-1">
          实时监控平台运营数据、AI模型性能和研究进展
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="总患者数"
          value="1,280"
          description="累计管理患者"
          icon={Users}
          trend={{ value: 12.5, positive: true }}
        />
        <StatCard
          title="AI 模型"
          value="12"
          description="已部署模型数量"
          icon={Brain}
          trend={{ value: 20, positive: true }}
        />
        <StatCard
          title="科研项目"
          value="8"
          description="进行中项目"
          icon={FlaskConical}
          trend={{ value: 33.3, positive: true }}
        />
        <StatCard
          title="本月论文"
          value="10"
          description="较上月增长"
          icon={TrendingUp}
          trend={{ value: 25, positive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Trend */}
        <div className="rounded-lg border bg-card p-4">
          <h3 className="font-semibold mb-4">患者增长趋势</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={patientTrendData}>
              <defs>
                <linearGradient id="patients" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="patients"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#patients)"
                name="总患者数"
              />
              <Area
                type="monotone"
                dataKey="newCases"
                stroke="#22c55e"
                fillOpacity={0}
                name="新增病例"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Model Accuracy */}
        <div className="rounded-lg border bg-card p-4">
          <h3 className="font-semibold mb-4">AI 模型准确率趋势</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={modelAccuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[0.8, 1]} tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="gastric" stroke="#3b82f6" name="胃癌诊断" strokeWidth={2} />
              <Line type="monotone" dataKey="colorectal" stroke="#8b5cf6" name="结直肠筛查" strokeWidth={2} />
              <Line type="monotone" dataKey="nlp" stroke="#22c55e" name="NLP模型" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Diagnosis Distribution */}
        <div className="rounded-lg border bg-card p-4">
          <h3 className="font-semibold mb-4">疾病分布</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={diagnosisData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
                nameKey="name"
              >
                {diagnosisData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Research Output */}
        <div className="rounded-lg border bg-card p-4">
          <h3 className="font-semibold mb-4">科研产出</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={researchData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
              />
              <Legend />
              <Bar dataKey="papers" fill="#3b82f6" name="论文发表" radius={[4, 4, 0, 0]} />
              <Bar dataKey="projects" fill="#22c55e" name="新项目" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
