import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Sistema Web Moderno',
    description: 'Sistema responsivo com painel, autenticação visual e componentes reutilizáveis.',
    techs: ['React', 'JavaScript', 'CSS']
  },
  {
    title: 'Landing Page Futurística',
    description: 'Página de apresentação com neon, glassmorphism e animações suaves.',
    techs: ['React', 'CSS', 'UI Design']
  },
  {
    title: 'Dashboard Interativo',
    description: 'Interface para visualizar dados, métricas, cards e ações rápidas.',
    techs: ['Python', 'React', 'Charts']
  }
];

export default function Projects() {
  return (
    <section className="section" id="projetos">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Projetos</span>
          <h2>Ideias transformadas em interfaces funcionais.</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <article className="glass-card project-card" key={project.title}>
              <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tags">
                {project.techs.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <a className="project-link" href="#contato">
                Ver projeto
                <ArrowUpRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
