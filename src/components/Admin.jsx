import { CheckCircle2, Lock, LogOut, Mail, Phone, Search, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient.js';

const statusOptions = ['Novo', 'Em analise', 'Respondido'];

function formatDate(value) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(new Date(value));
}

export default function Admin() {
  const [session, setSession] = useState(null);
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  }

  async function checkAccess(currentSession) {
    if (!currentSession?.user) {
      setAllowed(false);
      setChecking(false);
      return;
    }

    const { data, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', currentSession.user.id)
      .single();

    if (profileError || data?.role !== 'admin') {
      await supabase.auth.signOut();
      setSession(null);
      setAllowed(false);
      setError('Acesso negado. Esse usuario nao esta marcado como admin.');
      setChecking(false);
      return;
    }

    setAllowed(true);
    setChecking(false);
  }

  async function loadContacts() {
    const { data, error: loadError } = await supabase
      .from('portfolio_contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (loadError) {
      showToast(`Nao foi possivel carregar: ${loadError.message}`);
      return;
    }

    setContacts(data || []);
  }

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setChecking(false);
      setError('Supabase nao configurado.');
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      checkAccess(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setChecking(true);
      checkAccess(currentSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (allowed) loadContacts();
  }, [allowed]);

  const filteredContacts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return contacts;

    return contacts.filter((contact) =>
      [contact.full_name, contact.email, contact.phone, contact.project_interest, contact.message]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term))
    );
  }, [contacts, search]);

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);

    if (loginError) {
      setError('Email ou senha invalidos.');
      return;
    }

    setSession(data.session);
    setChecking(true);
    await checkAccess(data.session);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
    setAllowed(false);
  }

  async function updateStatus(id, status) {
    const { error: updateError } = await supabase
      .from('portfolio_contacts')
      .update({ status })
      .eq('id', id);

    if (updateError) {
      showToast(`Acao bloqueada: ${updateError.message}`);
      return;
    }

    setContacts((current) => current.map((contact) => (contact.id === id ? { ...contact, status } : contact)));
    showToast(`Status alterado para ${status}.`);
  }

  async function deleteContact(id) {
    const { error: deleteError } = await supabase.from('portfolio_contacts').delete().eq('id', id);

    if (deleteError) {
      showToast(`Nao foi possivel excluir: ${deleteError.message}`);
      return;
    }

    setContacts((current) => current.filter((contact) => contact.id !== id));
    showToast('Contato excluido.');
  }

  if (checking) {
    return (
      <section className="section admin-section">
        <div className="container glass-card admin-empty">Verificando acesso admin...</div>
      </section>
    );
  }

  if (!session || !allowed) {
    return (
      <section className="section admin-section">
        <div className="container admin-login-grid">
          <div className="glass-card admin-intro">
            <span className="eyebrow">
              <Lock size={16} /> Admin
            </span>
            <h1>
              Area protegida do <span>portifolio</span>.
            </h1>
            <p>
              Entre com o email e senha do usuario criado no Supabase Auth. Esse usuario precisa
              estar com `role = admin` na tabela `profiles`.
            </p>
          </div>

          <form className="contact-form glass-card admin-login" onSubmit={handleLogin}>
            <label>
              Email admin
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="admin@email.com" required />
            </label>
            <label>
              Senha
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Senha do Supabase" required />
            </label>
            {error && <p className="form-alert error-alert">{error}</p>}
            <button className="button primary" type="submit" disabled={loading}>
              <Lock size={18} /> {loading ? 'Entrando...' : 'Entrar no admin'}
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="section admin-section">
      <div className="container">
        <header className="glass-card admin-header">
          <div>
            <span className="eyebrow">
              <CheckCircle2 size={16} /> Admin conectado
            </span>
            <h1>
              Contatos recebidos pelo <span>portifolio</span>.
            </h1>
          </div>
          <button className="button secondary" type="button" onClick={handleLogout}>
            <LogOut size={18} /> Sair
          </button>
        </header>

        <div className="glass-card admin-toolbar">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por nome, email, telefone ou mensagem"
          />
        </div>

        <div className="admin-list">
          {filteredContacts.map((contact) => (
            <article className="glass-card contact-admin-card" key={contact.id}>
              <div className="contact-admin-top">
                <div>
                  <span className="project-status">{contact.status}</span>
                  <h3>{contact.full_name}</h3>
                  <p>{contact.project_interest || 'Projeto sem interesse especifico'} - {formatDate(contact.created_at)}</p>
                </div>
              </div>

              <div className="admin-contact-grid">
                <p><Mail size={16} /> {contact.email}</p>
                <p><Phone size={16} /> {contact.phone}</p>
              </div>

              <p className="admin-message">{contact.message}</p>

              <div className="admin-actions">
                {statusOptions.map((status) => (
                  <button className="button secondary" type="button" key={status} disabled={contact.status === status} onClick={() => updateStatus(contact.id, status)}>
                    {status}
                  </button>
                ))}
                <button className="button secondary danger-button" type="button" onClick={() => deleteContact(contact.id)}>
                  <Trash2 size={17} /> Excluir
                </button>
              </div>
            </article>
          ))}
        </div>

        {!filteredContacts.length && (
          <div className="glass-card admin-empty">Nenhum contato encontrado ainda.</div>
        )}
      </div>

      {toast && <div className="admin-toast">{toast}</div>}
    </section>
  );
}
