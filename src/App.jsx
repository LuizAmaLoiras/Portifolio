import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';

// Troque aqui pelo seu GitHub.
export const githubUrl = 'https://github.com/LuizAmaLoiras';

// Troque aqui pelo seu nome se quiser personalizar o título.
export const portfolioName = 'Curriculo';

export default function App() {
  return (
    <div className="app-shell">
      <div className="aurora aurora-one"></div>
      <div className="aurora aurora-two"></div>
      <div className="grid-overlay"></div>
      <Header portfolioName={portfolioName} />
      <main>
        <Hero githubUrl={githubUrl} portfolioName={portfolioName} />
        <About />
        <Skills />
        <Projects />
        <Contact githubUrl={githubUrl} />
      </main>
    </div>
  );
}
