import { Link } from 'react-router-dom'
import {
  Activity,
  Users,
  Brain,
  FlaskConical,
  ArrowRight,
  Shield,
  TrendingUp,
  Stethoscope,
  Microscope,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    title: '智能患者管理',
    description: '全面的患者信息管理系统，支持病历录入、治疗方案跟踪和随访管理。',
    icon: Users,
    href: '/patients',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    title: 'AI 辅助诊断',
    description: '基于深度学习的胃肠道疾病辅助诊断模型，提高诊断准确率和效率。',
    icon: Brain,
    href: '/ai-models',
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  },
  {
    title: '科研数据管理',
    description: '整合临床研究数据，支持多中心协作和科研成果追踪。',
    icon: FlaskConical,
    href: '/research',
    color: 'bg-green-500/10 text-green-600 dark:text-green-400',
  },
  {
    title: '实时数据看板',
    description: '可视化展示平台运营数据、AI模型训练指标和研究进展。',
    icon: Activity,
    href: '/dashboard',
    color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  },
]

const stats = [
  { label: '管理患者', value: '1,280+', icon: Users },
  { label: 'AI模型', value: '12', icon: Brain },
  { label: '科研项目', value: '8', icon: Microscope },
  { label: '发表论文', value: '45', icon: TrendingUp },
]

const advantages = [
  {
    title: '精准诊断',
    description: '基于多模态数据融合的AI诊断模型，准确率达到95%以上。',
    icon: Stethoscope,
  },
  {
    title: '数据安全',
    description: '采用国家商用密码标准，确保患者隐私数据安全合规。',
    icon: Shield,
  },
  {
    title: '持续优化',
    description: '模型在线学习机制，随数据积累不断提升诊断性能。',
    icon: TrendingUp,
  },
]

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 px-6 py-12 lg:px-12 lg:py-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white mb-4">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            平台运行正常
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            DTx-GI 胃肠道疾病
            <br />
            数字疗法平台
          </h1>
          <p className="text-base lg:text-lg text-white/80 mb-6 leading-relaxed">
            由空军军医大学西京医院胃肠外科开发，致力于胃肠道疾病的数字化预防、诊断、治疗与康复管理。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-white/90 transition-colors"
            >
              进入数据看板
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/patients"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
            >
              患者管理
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border bg-card p-4 text-center"
          >
            <stat.icon className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-bold mb-6">核心功能</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => (
            <Link
              key={feature.title}
              to={feature.href}
              className={cn(
                'group rounded-lg border bg-card p-6 hover:shadow-md transition-all',
                'hover:border-primary/50'
              )}
            >
              <div className={cn('inline-flex rounded-lg p-3 mb-4', feature.color)}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                了解更多
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Advantages */}
      <section className="rounded-2xl bg-muted/50 p-6 lg:p-10">
        <h2 className="text-2xl font-bold mb-6 text-center">技术优势</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advantages.map((adv) => (
            <div key={adv.title} className="text-center">
              <div className="inline-flex rounded-full bg-primary/10 p-4 mb-4">
                <adv.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{adv.title}</h3>
              <p className="text-sm text-muted-foreground">{adv.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
