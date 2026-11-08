import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { buildos } from '../data/buildos'

export function BuildOSHero() {
  const { meta } = buildos

  const statusConfig = {
    'live': { label: 'OPERATIONAL', color: 'bg-green-500', text: 'text-green-400' },
    'progress': { label: 'DEVELOPMENT', color: 'bg-amber-500', text: 'text-amber-400' },
    'planned': { label: 'PLANNED', color: 'bg-blue-500', text: 'text-blue-400' },
  }

  const statusKey = Object.keys(statusConfig).find((key) => meta.status.toLowerCase().includes(key)) || 'progress'
  const status = statusConfig[statusKey as keyof typeof statusConfig]

  return (
    <section id="buildos" className="relative mx-auto max-w-7xl px-4 py-20 md:px-8">
      <div className="mb-8 flex items-center gap-3">
        <div className={`flex items-center gap-2 rounded-full ${status.color} px-4 py-2`}>
          <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
          <span className={`text-sm font-mono uppercase tracking-wider ${status.text}`}>{status.label}</span>
        </div>
        <span className="text-sm text-gray-400">BuildOS · Forward Deployed Engineering</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20 items-start">
        <div className="space-y-8">
          <h1 className="text-5xl font-bold text-white md:text-7xl leading-none">
            BUILD<em style={{ fontStyle: 'normal', color: 'var(--color-accent)' }}>OS</em>
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed">
            {meta.tagline}
          </p>

          <p className="text-lg text-gray-400 leading-relaxed">
            {meta.subhead}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="default" size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold">
              <a href={meta.links.website} target="_blank" rel="noopener noreferrer">
                See BuildOS case study <ArrowRight size={14} />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-gray-700 text-gray-300 hover:bg-gray-800/50">
              <a href="#buildos-ecosystem">
                View App Screens
              </a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-gray-500">Role</span>
            <span className="text-xs font-mono uppercase tracking-wider text-gray-500">{meta.role}</span>
            <span className="text-xs font-mono uppercase tracking-wider text-gray-500">Period</span>
            <span className="text-xs font-mono uppercase tracking-wider text-gray-500">{meta.period}</span>
            <span className="text-xs font-mono uppercase tracking-wider text-gray-500">Platform</span>
            <span className="text-xs font-mono uppercase tracking-wider text-gray-500">{meta.platform}</span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative group">
            <img
              src={meta.logo}
              alt="BuildOS application icon"
              width={512}
              height={512}
              loading="lazy"
              className="rounded-2xl border border-border-strong shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)]"
            />
            <div className="absolute inset-0 rounded-2xl border border-accent/20 group-hover:border-accent/50 transition-colors" />
          </div>
        </div>
      </div>
    </section>
  )
}
