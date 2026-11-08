import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { siteContent } from '../data/content'
import { buildos } from '../data/buildos'
import { SectionReveal } from '../components/SectionReveal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const CARD_CLASSES = ['work-card--a', 'work-card--b', 'work-card--c', 'work-card--d']

function ProjectCard({
  project,
  index,
}: {
  project: (typeof siteContent.builds)[number]
  index: number
}) {
  const repoSearch = `https://github.com/search?q=${encodeURIComponent(
    `user:mohibrazvi-786 ${project.name}`
  )}&type=repositories`

  return (
    <SectionReveal direction="up" delay={index * 0.06} className={`work-card ${CARD_CLASSES[index]}`}>
      <div className="work-head">
        <h3 className="work-title">{project.name}</h3>
        <Badge variant={project.status === 'COMPLETED' ? 'success' : 'outline'}>
          {project.status}
        </Badge>
      </div>

      <div className="work-tech">
        {project.tech.split(', ').map((tech) => (
          <Badge
            key={tech}
            variant="secondary"
            className="rounded-md px-2 py-0.5 text-[9px] tracking-normal"
          >
            {tech}
          </Badge>
        ))}
      </div>

      <p className="work-desc">{project.description}</p>

      <a className="work-link" href={repoSearch} target="_blank" rel="noopener noreferrer">
        View on GitHub <ArrowUpRight size={12} />
      </a>
    </SectionReveal>
  )
}

export function Builds() {
  return (
    <section id="builds" className="section section--tinted">
      <div className="site-container">
        <SectionReveal>
          <header className="section-head">
            <div>
              <span className="eyebrow">03 — Selected work</span>
              <h2 className="section-title">Products, prototypes, proof.</h2>
            </div>
            <p className="section-sub">
              A mix of shipped software, research prototypes and early experiments. BuildOS
              follows as the flagship engineering case study, preserved in full.
            </p>
          </header>
        </SectionReveal>

        <SectionReveal direction="up">
          <a className="buildos-feature" href="#buildos">
            <div className="bf-mark">
              <img
                src={buildos.meta.logo}
                alt="BuildOS application icon"
                width={512}
                height={512}
                loading="lazy"
              />
              <span>
                FLAGSHIP
                <br />
                CASE STUDY
              </span>
            </div>

            <div>
              <span className="bf-kicker">Construction execution &amp; financial OS</span>
              <div className="bf-title-row">
                <h3 className="bf-title">BuildOS</h3>
                <span className="bf-category">{buildos.meta.category}</span>
              </div>
              <p className="bf-copy">
                {buildos.meta.tagline}. A multi-surface product spanning a Flutter field app, an
                async FastAPI backend, PostgreSQL and a static admin console — built around
                project-scoped permissions and financial traceability.
              </p>
              <div className="chip-row">
                {[buildos.summary[0].value, buildos.summary[2].value, buildos.summary[3].value, buildos.summary[4].value].map(
                  (fact) => (
                    <Badge key={fact} variant="secondary">
                      {fact}
                    </Badge>
                  )
                )}
              </div>
            </div>

            <span className="bf-cta">
              Read case study <span aria-hidden="true">→</span>
            </span>
          </a>
        </SectionReveal>

        <div className="work-grid">
          {siteContent.builds.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>

        <SectionReveal>
          <div className="section-foot">
            <span>Source links open a GitHub repository search.</span>
            <Button asChild variant="mono" size="auto">
              <a href={siteContent.meta.github} target="_blank" rel="noopener noreferrer">
                GitHub profile <ArrowRight size={12} />
              </a>
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
