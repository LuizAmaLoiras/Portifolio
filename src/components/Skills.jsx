const skills = [
  { name: 'Java', value: 60, color: '#38bdf8' },
  { name: 'JavaScript', value: 35, color: '#facc15' },
  { name: 'Python', value: 45, color: '#22c55e' },
  { name: 'CSS', value: 40, color: '#a855f7' },
  { name: 'C#', value: 15, color: '#fb7185' }
];

export default function Skills() {
  return (
    <section className="section alt-section" id="habilidades">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Habilidades</span>
          <h2>Tecnologias que fazem parte da minha evolução.</h2>
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
              <p>Nível atual de prática e evolução contínua.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
