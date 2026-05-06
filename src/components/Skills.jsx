const skills = [
  { name: 'Java', value: 60, color: '#38bdf8', detail: 'Logica, estruturas e bases para sistemas.' },
  { name: 'HTML', value: 50, color: '#f97316', detail: 'Estrutura de paginas, semantica e organizacao.' },
  { name: 'Python', value: 45, color: '#22c55e', detail: 'Scripts, automacoes e raciocinio de backend.' },
  { name: 'CSS', value: 40, color: '#a855f7', detail: 'Layouts responsivos, neon, glass e animacoes.' },
  { name: 'JavaScript', value: 35, color: '#facc15', detail: 'Interacoes, formularios e experiencias dinamicas.' },
  { name: 'C#', value: 15, color: '#fb7185', detail: 'Primeiros passos em orientacao a objetos.' }
];

export default function Skills() {
  return (
    <section className="section alt-section" id="habilidades">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Habilidades</span>
          <h2>Tecnologias que fazem parte da minha evolucao.</h2>
          <p>
            Esses percentuais representam meu nivel atual de pratica. O destaque fica para HTML em
            50%, porque e uma das bases que mais uso para estruturar meus sites e projetos.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((skill) => (
            <article className="glass-card skill-card" key={skill.name}>
              <div className="skill-top">
                <h3>{skill.name}</h3>
                <strong>{skill.value}%</strong>
              </div>
              <div className="progress-shell">
                <span
                  className="progress-fill"
                  style={{
                    width: `${skill.value}%`,
                    background: `linear-gradient(90deg, ${skill.color}, #22d3ee)`
                  }}
                ></span>
              </div>
              <p>{skill.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
