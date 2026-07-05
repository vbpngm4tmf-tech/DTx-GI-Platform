import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import { Play, Square, RotateCw, Brain, TrendingUp, AlertCircle } from 'lucide-react'
import { cn, getStatusColor } from '@/lib/utils'

interface AIModel {
  id: string
  name: string
  type: string
  version: string
  accuracy: number
  loss: number
  status: string
  lastTrained: string
  datasetSize: number
}

const mockModels: AIModel[] = [
  {
    id: '1',
    name: '胃癌病理诊断模型',
    type: 'CNN',
    version: 'v2.3',
    accuracy: 0.94,
    loss: 0.08,
    status: '训练中',
    lastTrained: '2024-06-15',
    datasetSize: 15000,
  },
  {
    id: '2',
    name: '结直肠息肉检测',
    type: 'YOLOv8',
    version: 'v1.8',
    accuracy: 0.92,
    loss: 0.12,
    status: '训练完成',
    lastTrained: '2024-06-10',
    datasetSize: 8200,
  },
  {
    id: '3',
    name: '医学NLP模型',
    type: 'Transformer',
    version: 'v3.0',
    accuracy: 0.95,
    loss: 0.05,
    status: '训练完成',
    lastTrained: '2024-06-12',
    datasetSize: 50000,
  },
]

const trainingHistory = [
  { epoch: 1, accuracy: 0.72, loss: 0.45, valAccuracy: 0.70, valLoss: 0.48 },
  { epoch: 10, accuracy: 0.82, loss: 0.28, valAccuracy: 0.80, valLoss: 0.30 },
  { epoch: 20, accuracy: 0.88, loss: 0.18, valAccuracy: 0.86, valLoss: 0.20 },
  { epoch: 30, accuracy: 0.91, loss: 0.12, valAccuracy: 0.89, valLoss: 0.15 },
  { epoch: 40, accuracy: 0.93, loss: 0.09, valAccuracy: 0.91, valLoss: 0.11 },
  { epoch: 50, accuracy: 0.94, loss: 0.08, valAccuracy: 0.92, valLoss: 0.10 },
]

const comparisonData = [
  { name: '胃癌诊断', v1: 0.85, v2: 0.91, v3: 0.94 },
  { name: '结直肠', v1: 0.82, v2: 0.88, v3: 0.92 },
  { name: 'NLP', v1: 0.88, v2: 0.92, v3: 0.95 },
]

export default function AIModels() {
  const [selectedModel, setSelectedModel] = useState<AIModel>(mockModels[0])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI 模型管理</h1>
        <p className="text-muted-foreground mt-1">
          管理、训练和监控 AI 诊断模型
        </p>
      </div>

      {/* Model Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockModels.map((model) => (
          <button
            key={model.id}
            onClick={() => setSelectedModel(model)}
            className={cn(
              'rounded-lg border bg-card p-4 text-left transition-all',
              selectedModel.id === model.id
                ? 'border-primary ring-2 ring-primary/20'
                : 'hover:border-primary/50'
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="inline-flex rounded-lg bg-primary/10 p-2">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', getStatusColor(model.status))}>
                {model.status}
              </span>
            </div>
            <h3 className="font-semibold mb-1">{model.name}</h3>
            <p className="text-xs text-muted-foreground mb-3">
              {model.type} · {model.version}
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">准确率</span>
              <span className="font-semibold text-green-600">{(model.accuracy * 100).toFixed(1)}%</span>
            </div>
          </button>
        ))}
      </div>

      {/* Training Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">训练曲线 - {selectedModel.name}</h3>
            <div className="flex gap-1">
              <button className="rounded-md p-1.5 hover:bg-accent" title="开始训练">
                <Play className="h-4 w-4 text-green-600" />
              </button>
              <button className="rounded-md p-1.5 hover:bg-accent" title="停止">
                <Square className="h-4 w-4 text-red-500" />
              </button>
              <button className="rounded-md p-1.5 hover:bg-accent" title="重新训练">
                <RotateCw className="h-4 w-4" />
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trainingHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="epoch" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 1]} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v: number) => v.toFixed(3)} />
              <Legend />
              <Line type="monotone" dataKey="accuracy" stroke="#22c55e" name="训练准确率" strokeWidth={2} />
              <Line type="monotone" dataKey="valAccuracy" stroke="#3b82f6" name="验证准确率" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="font-semibold mb-4">损失函数</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trainingHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="epoch" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 0.6]} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v: number) => v.toFixed(3)} />
              <Legend />
              <Line type="monotone" dataKey="loss" stroke="#ef4444" name="训练损失" strokeWidth={2} />
              <Line type="monotone" dataKey="valLoss" stroke="#f59e0b" name="验证损失" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Model Comparison */}
      <div className="rounded-lg border bg-card p-4">
        <h3 className="font-semibold mb-4">模型版本对比</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis domain={[0.7, 1]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
            <Tooltip formatter={(v: number) => `${(v * 100).toFixed(1)}%`} />
            <Legend />
            <Bar dataKey="v1" fill="#94a3b8" name="V1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="v2" fill="#60a5fa" name="V2" radius={[4, 4, 0, 0]} />
            <Bar dataKey="v3" fill="#22c55e" name="V3" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Training Logs */}
      <div className="rounded-lg border bg-card p-4">
        <h3 className="font-semibold mb-4">训练日志</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
          {[
            { time: '2024-06-15 14:32:01', msg: 'Epoch 50/50 - loss: 0.0812 - accuracy: 0.9410 - val_loss: 0.1023 - val_accuracy: 0.9234', type: 'success' },
            { time: '2024-06-15 14:28:45', msg: 'Epoch 45/50 - loss: 0.0891 - accuracy: 0.9356 - val_loss: 0.1102 - val_accuracy: 0.9189', type: 'info' },
            { time: '2024-06-15 14:25:12', msg: '学习率调整: 0.001 → 0.0001', type: 'warn' },
            { time: '2024-06-15 14:20:33', msg: 'Epoch 40/50 - loss: 0.0956 - accuracy: 0.9301 - val_loss: 0.1156 - val_accuracy: 0.9145', type: 'info' },
            { time: '2024-06-15 14:15:08', msg: '保存检查点: checkpoint-epoch-40.pth', type: 'success' },
          ].map((log, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <span className="text-muted-foreground whitespace-nowrap">{log.time}</span>
              <span className={cn(
                log.type === 'success' && 'text-green-600',
                log.type === 'warn' && 'text-yellow-600',
                log.type === 'info' && 'text-blue-600'
              )}>
                {log.msg}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
