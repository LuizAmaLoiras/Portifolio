import { Menu, Sparkles, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
  { label: 'Admin', href: '#admin' }
];

export default function Header({ portfolioName }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav container" aria-label="Navegacao principal">
        <a className="brand" href="#inicio" aria-label="Ir para o inicio">
          <span className="brand-mark">
            <Sparkles size={18} />
          </span>
          <span>{portfolioName}</span>
        </a>

        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <button
          className="menu-button"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div className={`mobile-menu ${isOpen ? 'is-open' : ''}`}>
        {navItems.map((item) => (
          <a key={item.label} href={item.href} onClick={() => setIsOpen(false)}>
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}
