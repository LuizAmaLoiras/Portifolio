import { ArrowUpRight, FolderKanban, Orbit, Radar, Sparkles } from 'lucide-react';

const projects = [
  {
    title: 'Plataforma Solar Inteligente',
    description: 'Site completo para energia solar, com formulario de orcamento, anexos, painel administrativo, Supabase e deploy preparado.',
    techs: ['React', 'Supabase', 'Vite', 'Netlify'],
    status: 'Sistema comercial',
    type: 'Energia solar'
  },
  {
    title: 'Interface Gamer Interativa',
    description: 'Experiencia web visual inspirada em jogo, com estrutura separada em HTML, CSS e JavaScript para interacoes no navegador.',
    techs: ['HTML', 'CSS', 'JavaScript'],
    status: 'Experiencia interativa',
    type: 'Game UI'
  },
  {
    title: 'Agencia Digital Premium',
    description: 'Projeto de presenca digital para apresentar marca, servicos e proposta visual com linguagem moderna e profissional.',
    techs: ['Web Design', 'Frontend', 'Branding'],
    status: 'Marca digital',
    type: 'Institucional'
  },
  {
    title: 'Portal Corporativo Institucional',
    description: 'Estrutura de pagina empresarial focada em confianca, informacoes claras, navegacao simples e apresentacao de servicos.',
    techs: ['HTML', 'CSS', 'Layout'],
    status: 'Site empresarial',
    type: 'Corporativo'
  },
  {
    title: 'Laboratorio Web Essencial',
    description: 'Projeto de estudo para evoluir fundamentos de pagina, hierarquia visual, componentes e organizacao de conteudo.',
    techs: ['HTML', 'CSS', 'Base Web'],
    status: 'Estudo tecnico',
    type: 'Aprendizado'
  },
  {
    title: 'Hub de Prototipos Criativos',
    description: 'Ambiente de ideias para testar telas, fluxos, estilos, componentes e conceitos antes de virar produto final.',
    techs: ['Organizacao', 'Prototipos', 'Estudos'],
    status: 'Laboratorio pessoal',
    type: 'Prototipagem'
  },
  {
    title: 'Central de Dados de Projetos',
    description: 'Base de apoio para organizar registros, materiais, informacoes e dados usados no desenvolvimento dos projetos.',
    techs: ['Dados', 'Arquivos', 'Planejamento'],
    status: 'Base tecnica',
    type: 'Dados'
  },
  {
    title: 'Modulo de Usuarios e Controle',
    description: 'Estrutura voltada para pensar em usuarios, organizacao de informacoes e bases para sistemas com controle de acesso.',
    techs: ['Dados', 'Usuarios', 'Sistemas'],
    status: 'Apoio de sistema',
    type: 'Usuarios'
  },
  {
    title: 'Portifolio Holografico',
    description: 'Vitrine pessoal futurista para apresentar habilidades, formacao, contatos e projetos com movimento automatico.',
    techs: ['React', 'CSS', 'UI Futurista'],
    status: 'Vitrine pessoal',
    type: 'Portfolio'
  }
];

const loopProjects = [...projects, ...projects];

export default function Projects() {
  return (
    <section className="section projects-section projects-page" id="projetos">
      <div className="container">
        <div className="projects-hero glass-card">
          <div>
            <span className="eyebrow">
              <Orbit size={16} /> Pagina de projetos
            </span>
            <h1>
              Uma galeria futurista com meus <span>projetos profissionais</span>.
            </h1>
            <p>
              Aqui os projetos aparecem com nomes mais profissionais e descricoes mais claras,
              mostrando o assunto de cada entrega sem expor os nomes originais das pastas.
            </p>
          </div>
          <div className="project-radar">
            <Radar size={58} />
            <strong>{projects.length}</strong>
            <span>projetos catalogados</span>
          </div>
        </div>

        <div className="project-command glass-card">
          <div>
            <span>PROJECT STREAM</span>
            <strong>Loop automatico ativado</strong>
          </div>
          <div className="command-lights">
            <i></i>
            <i></i>
            <i></i>
          </div>
        </div>

        <div className="projects-marquee" aria-label="Projetos em loop automatico">
          <div className="projects-track">
            {loopProjects.map((project, index) => (
              <article className="glass-card project-card" key={`${project.title}-${index}`}>
                <div className="project-card-top">
                  <span className="project-index">{String((index % projects.length) + 1).padStart(2, '0')}</span>
                  <FolderKanban size={24} />
                </div>
                <p className="project-status">
                  <Sparkles size={14} /> {project.status}
                </p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">
                  <span>{project.type}</span>
                  {project.techs.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <a className="project-link" href="#contato">
                  Entrar em contato
                  <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="projects-grid detailed-projects">
          {projects.map((project, index) => (
            <article className="glass-card project-card detailed-card" key={project.title}>
              <div className="project-card-top">
                <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                <FolderKanban size={24} />
              </div>
              <p className="project-status">
                <Sparkles size={14} /> {project.status}
              </p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tags">
                <span>{project.type}</span>
                {project.techs.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
