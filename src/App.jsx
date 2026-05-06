import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Admin from './components/Admin.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';

// Troque aqui pelo seu GitHub.
export const githubUrl = 'https://github.com/LuizAmaLoiras';

// Troque aqui pelo seu nome se quiser personalizar o título.
export const portfolioName = 'Luiz Felipe';

export default function App() {
  const [page, setPage] = useState(() => {
    if (window.location.hash === '#projetos') return 'projects';
    if (window.location.hash === '#admin') return 'admin';
    return 'home';
  });

  useEffect(() => {
    function syncPageWithHash() {
      if (window.location.hash === '#projetos') {
        setPage('projects');
        return;
      }

      if (window.location.hash === '#admin') {
        setPage('admin');
        return;
      }

      setPage('home');
    }

    window.addEventListener('hashchange', syncPageWithHash);
    return () => window.removeEventListener('hashchange', syncPageWithHash);
  }, []);

  useEffect(() => {
    const target = window.location.hash || '#inicio';
    window.setTimeout(() => {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }, [page]);

  return (
    <div className="app-shell">
      <div className="aurora aurora-one"></div>
      <div className="aurora aurora-two"></div>
      <div className="grid-overlay"></div>
      <Header portfolioName={portfolioName} />
      <main>
        {page === 'admin' ? (
          <Admin />
        ) : page === 'projects' ? (
          <Projects />
        ) : (
          <>
            <Hero githubUrl={githubUrl} portfolioName={portfolioName} />
            <About />
            <Skills />
          </>
        )}
        {page !== 'admin' && <Contact githubUrl={githubUrl} />}
      </main>
      {page !== 'admin' && <WhatsAppButton />}
    </div>
  );
}
