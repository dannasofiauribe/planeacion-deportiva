import { useState, useEffect } from 'react';
import { PageView } from './types';
import { TournamentProvider } from './context/TournamentContext';
import { HeaderWithNav } from './components/HeaderWithNav';
import { InicioView } from './components/InicioView';
import { AdminView } from './components/AdminView';
import { VisitanteView } from './components/VisitanteView';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageView>('inicio');

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (hash.includes('admin')) {
        setCurrentPage('admin');
      } else if (hash.includes('visitante')) {
        setCurrentPage('visitante');
      } else {
        setCurrentPage('inicio');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    window.location.hash = page === 'inicio' ? 'index.html' : `${page}.html`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <HeaderWithNav currentPage={currentPage} onNavigate={navigateTo} />

      <main style={{ flex: '1', paddingBottom: '30px' }}>
        {currentPage === 'inicio' && <InicioView onNavigate={navigateTo} />}
        {currentPage === 'admin' && <AdminView />}
        {currentPage === 'visitante' && <VisitanteView />}
      </main>
    </div>
  );
}

export function App() {
  return (
    <TournamentProvider>
      <AppContent />
    </TournamentProvider>
  );
}

export default App;
