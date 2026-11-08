import { useEffect, useState, useRef } from 'react'
import { ArrowUp, ArrowUpRight, Mail } from 'lucide-react'
import { buildos } from '../data/buildos'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { MediaLightbox, type LightboxItem } from '@/components/MediaLightbox'
import { BuildOSMobileMockup } from '@/components/BuildOSMobileMockup'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const MONTHS = buildos.discipline.cadence
const MAX_COMMITS = Math.max(...MONTHS.map((m) => m.commits))

function Chapter({
  id,
  num,
  title,
  kicker,
  children,
}: {
  id: string
  num: string
  title: string
  kicker: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      id={`buildos-${id}`}
      className="bo-chapter"
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <header className="bo-chapter-head">
        <motion.span
          className="bo-chapter-num"
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ delay: 0.1 }}
        >
          CHAPTER {num}
        </motion.span>
        <motion.h3
          className="bo-chapter-title"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="bo-chapter-kicker"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.3 }}
        >
          {kicker}
        </motion.p>
      </header>
      {children}
    </motion.div>
  )
}

function pillClass(tone: 'live' | 'progress' | 'planned' | 'partial') {
  return `bo-pill bo-pill--${tone}`
}

function OutcomeTone({ status }: { status: string }) {
  const tone =
    status === 'Completed' ? 'live' : status === 'Validated' ? 'verified' : status === 'In progress' ? 'progress' : 'planned'
  return <span className={`bo-pill bo-pill--${tone}`}>{status}</span>
}

export function BuildOS() {
  const [activeChapter, setActiveChapter] = useState(buildos.chapters[0].id)
  const [shotIndex, setShotIndex] = useState<number | null>(null)
  const mobileNavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = buildos.chapters.map((c) => document.getElementById(`buildos-${c.id}`)).filter((el): el is HTMLElement => Boolean(el))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) setActiveChapter(visible[0].target.id.replace('buildos-', ''))
      },
      { rootMargin: '-16% 0px -72% 0px', threshold: 0 }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const track = mobileNavRef.current
    const active = track?.querySelector<HTMLElement>('[aria-current="location"]')
    if (!track || !active) return
    const left = active.offsetLeft
    const right = left + active.offsetWidth
    if (left < track.scrollLeft || right > track.scrollLeft + track.clientWidth) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      track.scrollTo({ left: left - 16, behavior: reduceMotion ? 'auto' : 'smooth' })
    }
  }, [activeChapter])

  const { meta, chapters, problem, discovery, product, architecture, ecosystem, challenges, security, discipline, deployment, fde, outcomes, roadmap, limitations } = buildos

  const allControls = security.domains.flatMap((d) => d.controls)
  const securityCounts = {
    verified: allControls.filter((c) => c.state === 'verified').length,
    partial: allControls.filter((c) => c.state === 'partial').length,
    planned: allControls.filter((c) => c.state === 'planned').length,
  }

  const horizons = ['Next', 'Then', 'Later'] as const

  const shotItems: LightboxItem[] = ecosystem.screens.map((screen) => ({
    src: screen.src,
    alt: `BuildOS ${screen.label} screen`,
    title: screen.label,
    caption: screen.caption,
  }))

  return (
    <section id="buildos" className="buildos" aria-labelledby="buildos-title">
      <div className="section-container">
        {/* Role & Context (product-first, moved up) */}
        <div className="bo-role-context">
          <div className="bo-role-grid">
            <div className="bo-role-card">
              <span className="bo-role-label">Role</span>
              <span className="bo-role-value">{meta.role}</span>
            </div>
            <div className="bo-role-card">
              <span className="bo-role-label">Period</span>
              <span className="bo-role-value">{meta.period}</span>
            </div>
            <div className="bo-role-card">
              <span className="bo-role-label">Platform</span>
              <span className="bo-role-value">{meta.platform}</span>
            </div>
            <div className="bo-role-card">
              <span className="bo-role-label">Status</span>
              <span className="bo-role-value">{meta.status}</span>
            </div>
          </div>
        </div>

        {/* 01 — PROBLEM */}
        <Chapter {...chapters[0]}>
          <p className="bo-lead">{problem.title}</p>
          <p className="bo-copy" style={{ marginTop: 14 }}>{problem.body}</p>

          <div className="bo-flow" style={{ marginTop: 26 }}>
            {problem.flows.map((flow) => (
              <div className="bo-flow-row" key={flow.system}>
                <span className="bo-flow-system">{flow.system}</span>
                <span className="bo-flow-holds">{flow.holds}</span>
                <span className="bo-flow-failure">{flow.failure}</span>
              </div>
            ))}
          </div>

          <div className="bo-grid-2" style={{ marginTop: 26 }}>
            <div>
              <span className="bo-label">What that costs</span>
              <ul className="bo-list">{problem.consequences.map((item) => (
                <li key={item}>{item}</li>
              ))}</ul>
            </div>
            <div className="bo-card bo-card--amber">
              <span className="bo-label">The reframe</span>
              <p className="bo-card-text">{problem.insight}</p>
            </div>
          </div>
        </Chapter>

        {/* 02 — DISCOVERY */}
        <Chapter {...chapters[1]}>
          <p className="bo-lead">{discovery.title}</p>
          <p className="bo-copy" style={{ marginTop: 14 }}>{discovery.body}</p>
          <p className="bo-caveat">{discovery.caveat}</p>

          <div className="bo-grid-3" style={{ marginTop: 26 }}>
            {discovery.evidence.map((item) => (
              <div className="bo-card" key={item.label}>
                <span className="bo-stat-value" style={{ fontSize: 34 }}>{item.value}</span>
                <p className="bo-card-title" style={{ marginTop: 8 }}>{item.label}</p>
                <p className="bo-card-text">{item.note}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 30 }}>
            <span className="bo-label">Discovery observations</span>
            <div className="bo-grid-3">
              {discovery.observations.map((obs, i) => (
                <div className="bo-card" key={obs.title}>
                  <span className="bo-chapter-num" style={{ marginBottom: 6 }}>OBS {String(i + 1).padStart(2, '0')}</span>
                  <p className="bo-card-title">{obs.title}</p>
                  <p className="bo-card-text">{obs.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <span className="bo-label">Product principles carried forward</span>
            <div className="bo-meta-row" style={{ marginTop: 0 }}>
              {discovery.principles.map((principle) => (
                <span className="bo-chip" key={principle}>{principle}</span>
              ))}
            </div>
          </div>
        </Chapter>

        {/* 03 — PRODUCT */}
        <Chapter {...chapters[2]}>
          <p className="bo-lead">{product.title}</p>
          <p className="bo-copy" style={{ marginTop: 14 }}>{product.body}</p>

          <div className="bo-evolution" role="list" aria-label="Product evolution">
            {product.evolution.map((step, i) => (
              <div className="bo-evolution-step" key={step.stage} role="listitem">
                <span className="bo-evolution-num">{String(i + 1).padStart(2, '0')}</span>
                <p className="bo-evolution-stage">{step.stage}</p>
                <p className="bo-evolution-detail">{step.detail}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28 }}>
            <span className="bo-label">Who the system is for</span>
            <div className="bo-grid-3">
              {product.personas.map((persona) => (
                <div className="bo-card" key={persona.role}>
                  <p className="bo-card-title">{persona.role}</p>
                  <p className="bo-card-text">{persona.need}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <span className="bo-label">MVP modules</span>
            <div className="bo-grid-2">
              {product.modules.map((mod, i) => (
                <div className="bo-card" key={mod.name}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                    <span className="bo-rail-num">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="bo-card-title" style={{ marginBottom: 2 }}>{mod.name}</p>
                      <p className="bo-card-text">{mod.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Chapter>

        {/* 04 — ECOSYSTEM / MOBILE SHOWCASE (product-first, moved up) */}
        <Chapter {...chapters[4]}>
          <p className="bo-lead">{ecosystem.intro}</p>

          <div className="bo-cap-grid" style={{ marginTop: 26 }}>
            {ecosystem.surfaces.map((surface) => (
              <div className="bo-cap-card" key={surface.id}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
                  <p className="bo-cap-title">{surface.label}</p>
                  <span className={pillClass(surface.status)}>{surface.statusLabel}</span>
                </div>
                <p className="bo-cap-summary">{surface.summary}</p>
                <ul className="bo-cap-list">
                  {surface.capabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40 }}>
            <span className="bo-label" style={{ display: 'block', marginBottom: 16 }}>Actual Application Screens</span>
            <div className="bo-mockup-gallery">
              {ecosystem.screens.map((screen, index) => (
                <BuildOSMobileMockup
                  key={screen.id}
                  src={screen.src}
                  alt={`BuildOS ${screen.label} screen`}
                  label={screen.label}
                  caption={screen.caption}
                  variant={index === 0 ? 'featured' : 'default'}
                  onClick={() => setShotIndex(index)}
                />
              ))}
            </div>
            <p className="bo-note">{ecosystem.note}</p>
          </div>
        </Chapter>

        {/* 05 — ARCHITECTURE */}
        <Chapter {...chapters[3]}>
          <p className="bo-lead">{architecture.intro}</p>

          <div className="bo-arch" style={{ marginTop: 26 }}>
            {architecture.layers.map((layer) => (
              <div className="bo-layer" key={layer.id}>
                <div className="bo-layer-head">
                  <span className="bo-layer-title">{layer.label}</span>
                  <span className="bo-layer-note">{layer.note}</span>
                </div>
                <div className="bo-nodes">
                  {layer.nodes.map((node) => (
                    <details className="bo-node" key={node.id}>
                      <summary>
                        <span style={{ minWidth: 0 }}>
                          <span className="bo-node-name">{node.label}</span>
                          <span className="bo-node-sub">{node.sub}</span>
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 10, flex: '0 0 auto' }}>
                          <span className={pillClass(node.status)}>{node.statusLabel}</span>
                          <span className="bo-node-toggle" aria-hidden="true">+</span>
                        </span>
                      </summary>
                      <dl className="bo-node-body">
                        <div>
                          <dt>Problem</dt>
                          <dd>{node.problem}</dd>
                        </div>
                        <div>
                          <dt>Decision</dt>
                          <dd>{node.decision}</dd>
                        </div>
                        <div>
                          <dt>Trade-off</dt>
                          <dd>{node.tradeoff}</dd>
                        </div>
                      </dl>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <details className="bo-challenge" style={{ marginTop: 22 }}>
            <summary>
              <span className="bo-challenge-cat">Stack</span>
              <span className="bo-challenge-title">Technology decisions and trade-offs</span>
              <span className="bo-node-toggle" aria-hidden="true">+</span>
            </summary>
            <div className="bo-table-wrap" style={{ border: 0, borderRadius: 0 }}>
              <table className="bo-table">
                <thead>
                  <tr><th>Layer</th><th>Technology</th><th>Why this</th><th>Trade-off</th></tr>
                </thead>
                <tbody>
                  {architecture.stack.map((row) => (
                    <tr key={row.layer}>
                      <td>{row.layer}</td>
                      <td>{row.technology}</td>
                      <td>{row.reason}</td>
                      <td>{row.tradeoff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>

          <p className="bo-note">{architecture.note}</p>
        </Chapter>

        {/* 06 — CHALLENGES */}
        <Chapter {...chapters[5]}>
          <p className="bo-lead">
            Engineering challenges documented as they happened: symptom, investigation,
            decision, change and validation.
          </p>

          <Accordion type="single" collapsible className="mt-6">
            {challenges.map((challenge) => (
              <AccordionItem value={challenge.id} key={challenge.id} className="bo-challenge">
                <AccordionTrigger>
                  <span className="bo-challenge-cat">{challenge.category}</span>
                  <span className="bo-challenge-title">{challenge.title}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <dl className="bo-challenge-body">
                    <div><dt>What happened</dt><dd>{challenge.what}</dd></div>
                    <div><dt>Why it mattered</dt><dd>{challenge.why}</dd></div>
                    <div><dt>Investigation</dt><dd>{challenge.investigation}</dd></div>
                    <div><dt>Decision</dt><dd>{challenge.decision}</dd></div>
                    <div><dt>Change</dt><dd>{challenge.change}</dd></div>
                    <div><dt>Validation</dt><dd>{challenge.validation}</dd></div>
                  </dl>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Chapter>

        {/* 07 — SECURITY */}
        <Chapter {...chapters[6]}>
          <p className="bo-lead">{security.intro}</p>

          <Card className="bo-card bo-card--amber" style={{ marginTop: 20 }}>
            <CardTitle className="bo-label">Stated posture</CardTitle>
            <CardContent className="pb-6">
              <p className="bo-card-text" style={{ color: 'var(--bo-text)' }}>{security.posture}</p>
            </CardContent>
          </Card>

          <div className="bo-meta-row" style={{ marginTop: 18 }}>
            <span className="bo-pill bo-pill--verified">{securityCounts.verified} implemented & verified</span>
            <span className="bo-pill bo-pill--partial">{securityCounts.partial} partial</span>
            <span className="bo-pill bo-pill--planned">{securityCounts.planned} planned</span>
          </div>

          <div className="bo-grid-2" style={{ marginTop: 22 }}>
            {security.domains.map((domain) => (
              <div className="bo-domain" key={domain.id}>
                <p className="bo-card-title">{domain.title}</p>
                <p className="bo-card-text" style={{ marginBottom: 12 }}>{domain.summary}</p>
                {domain.controls.map((control) => (
                  <div className="bo-control" key={control.name}>
                    <div>
                      <p className="bo-control-name">{control.name}</p>
                      <p className="bo-control-note">{control.note}</p>
                    </div>
                    <span className={`bo-pill bo-pill--${control.state}`} style={{ flex: '0 0 auto' }}>
                      {control.state === 'verified' ? 'Verified' : control.state === 'partial' ? 'Partial' : 'Planned'}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Chapter>

        {/* 08 — DISCIPLINE */}
        <Chapter {...chapters[7]}>
          <p className="bo-lead">{discipline.title}</p>
          <p className="bo-copy" style={{ marginTop: 14 }}>{discipline.body}</p>

          <div className="bo-stats" style={{ marginTop: 26 }}>
            {discipline.stats.map((stat) => (
              <div className="bo-stat" key={stat.label}>
                <div className="bo-stat-value">{stat.value}</div>
                <div className="bo-stat-label">{stat.label}</div>
                <div className="bo-stat-note">{stat.note}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 26 }}>
            <span className="bo-label">Commit cadence · last three months</span>
            <div className="bo-cadence">
              {MONTHS.map((month) => (
                <div className="bo-cadence-col" key={month.month}>
                  <span className="bo-bar-value">{month.commits}</span>
                  <div className="bo-bar-track">
                    <div className="bo-bar" style={{ height: `${Math.round((month.commits / MAX_COMMITS) * 100)}%` }} />
                  </div>
                  <span className="bo-bar-label">{month.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bo-grid-2" style={{ marginTop: 26 }}>
            <div>
              <span className="bo-label">Working practices</span>
              <ul className="bo-list">{discipline.practices.map((practice) => (
                <li key={practice}>{practice}</li>
              ))}</ul>
            </div>
            <div>
              <span className="bo-label">Honest limits</span>
              <ul className="bo-list">{discipline.honest.map((item) => (
                <li key={item}>{item}</li>
              ))}</ul>
            </div>
          </div>

          <div style={{ marginTop: 26 }}>
            <span className="bo-label">Representative commits</span>
            <div className="bo-code">
              {discipline.sampleCommits.map((commit) => (
                <div key={commit}><span>›</span> {commit}</div>
              ))}
            </div>
          </div>
        </Chapter>

        {/* 09 — DEPLOYMENT */}
        <Chapter {...chapters[8]}>
          <p className="bo-lead">{deployment.title}</p>
          <p className="bo-copy" style={{ marginTop: 14 }}>{deployment.intro}</p>

          <div className="bo-table-wrap" style={{ marginTop: 24 }}>
            <table className="bo-table">
              <thead>
                <tr><th>Component</th><th>Deployed</th><th>Tested</th><th>Proven</th><th>Note</th></tr>
              </thead>
              <tbody>
                {deployment.board.map((row) => (
                  <tr key={row.component}>
                    <td>{row.component}</td>
                    <td>{row.deployed}</td>
                    <td>{row.tested}</td>
                    <td>{row.proven}</td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bo-grid-2" style={{ marginTop: 26 }}>
            <div>
              <span className="bo-label">Constraints that shaped the build</span>
              <ul className="bo-list">{deployment.constraints.map((item) => (
                <li key={item}>{item}</li>
              ))}</ul>
            </div>
            <div className="bo-card">
              <span className="bo-label">Release gates</span>
              <ul className="bo-list">{deployment.gates.map((item) => (
                <li key={item}>{item}</li>
              ))}</ul>
            </div>
          </div>
        </Chapter>

        {/* 10 — FDE */}
        <Chapter {...chapters[9]}>
          <blockquote className="bo-quote">{fde.quote}</blockquote>
          <p className="bo-caveat">{fde.clarification}</p>

          <div className="bo-path" style={{ marginTop: 26 }}>
            {fde.steps.map((step, i) => (
              <div className="bo-path-step" key={step.step}>
                <div>
                  <span className="bo-rail-num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="bo-path-step-title">{step.step}</div>
                </div>
                <p className="bo-path-step-text">{step.buildos}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 26 }}>
            <span className="bo-label">Capabilities demonstrated</span>
            <ul className="bo-list">{fde.capabilities.map((capability) => (
              <li key={capability}>{capability}</li>
            ))}</ul>
          </div>
        </Chapter>

        {/* 11 — OUTCOMES */}
        <Chapter {...chapters[10]}>
          <p className="bo-lead">{outcomes.title}</p>

          <div className="bo-grid-2" style={{ marginTop: 24 }}>
            {outcomes.groups.map((group) => (
              <div className="bo-outcome" key={group.status}>
                <div className="bo-outcome-head">
                  <span className="bo-outcome-title">{group.status}</span>
                  <OutcomeTone status={group.status} />
                </div>
                <ul className="bo-list">{group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}</ul>
              </div>
            ))}
          </div>

          <p className="bo-note">{outcomes.note}</p>
        </Chapter>

        {/* 12 — ROADMAP */}
        <Chapter {...chapters[11]}>
          {horizons.map((horizon) => (
            <div className="bo-roadmap-group" key={horizon}>
              <p className="bo-roadmap-horizon">{horizon}</p>
              {roadmap.filter((item) => item.horizon === horizon).map((item) => (
                <div className="bo-roadmap-item" key={item.title}>
                  <span className="bo-roadmap-title">{item.title}</span>
                  <span className="bo-roadmap-detail">{item.detail}</span>
                </div>
              ))}
            </div>
          ))}

          <div className="bo-limitations" style={{ marginTop: 28 }}>
            <span className="bo-label">Limitations of this case study</span>
            <ul className="bo-list">{limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}</ul>
          </div>

          <a href="#hero" className="bo-back" onClick={(e) => {
            e.preventDefault()
            document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            <ArrowUp size={12} /> Back to top
          </a>

          <div className="bo-actions">
            <Button asChild className="bo-btn--solid">
              <a href={meta.links.website} target="_blank" rel="noopener noreferrer">
                Visit BuildOS <ArrowUpRight size={14} />
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={`mailto:${meta.links.email}`}>
                <Mail size={14} /> Discuss the work
              </a>
            </Button>
          </div>
        </Chapter>
      </div>

      <MediaLightbox
        items={shotItems}
        index={shotIndex ?? 0}
        open={shotIndex !== null}
        onOpenChange={(open) => { if (!open) setShotIndex(null) }}
        onIndexChange={setShotIndex}
      />
    </section>
  )
}
