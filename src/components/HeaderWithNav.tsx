import { FC } from 'react';
import { PageView } from '../types';

interface HeaderWithNavProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const HeaderWithNav: FC<HeaderWithNavProps> = ({ currentPage, onNavigate }) => {
  return (
    <header>
      <div
        className="current-page-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          backgroundColor: '#160202',
          borderBottom: '2px solid #b31414',
          padding: '12px 20px',
        }}
      >
        <img
          src="imagenes/logo.png"
          alt="Logo Intercursos Chincá"
          style={{ height: '38px', width: 'auto', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))' }}
        />
        <span style={{ color: '#ff4d4d', fontWeight: 'bold', letterSpacing: '2px', fontSize: '1.15rem' }}>
          {currentPage === 'inicio' && 'INICIO | INTERCURSOS CHINCÁ'}
          {currentPage === 'admin' && '⚙ ADMINISTRACIÓN | INTERCURSOS CHINCÁ'}
          {currentPage === 'visitante' && '👁 VISTA VISITANTE | INTERCURSOS CHINCÁ'}
        </span>
      </div>

      {/* La barra de navegación solo se muestra en admin.html y visitante.html como en los screenshots */}
      {currentPage !== 'inicio' && (
        <div
          className="nav-bar"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            margin: '15px 0 20px 0',
          }}
        >
          <button
            onClick={() => onNavigate('inicio')}
            className="nav-link"
            style={{
              color: '#ffffff',
              padding: '7px 18px',
              background: 'rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(255, 77, 77, 0.4)',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '0.95rem',
            }}
          >
            🏠 Inicio
          </button>

          {currentPage === 'admin' ? (
            <>
              <button
                onClick={() => onNavigate('admin')}
                className="nav-link active"
                style={{
                  color: '#ffdd44',
                  borderColor: '#ffcc00',
                  background: 'rgba(255, 204, 0, 0.18)',
                  boxShadow: '0 0 12px rgba(255, 204, 0, 0.35)',
                  padding: '7px 18px',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                }}
              >
                ⚙ Administrador
              </button>
              <button
                onClick={() => onNavigate('visitante')}
                className="nav-link"
                style={{
                  color: '#ffffff',
                  padding: '7px 18px',
                  background: 'rgba(0, 0, 0, 0.45)',
                  border: '1px solid rgba(255, 77, 77, 0.4)',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                }}
              >
                👁 Vista Visitante
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onNavigate('visitante')}
                className="nav-link active"
                style={{
                  color: '#ffdd44',
                  borderColor: '#ffcc00',
                  background: 'rgba(255, 204, 0, 0.18)',
                  boxShadow: '0 0 12px rgba(255, 204, 0, 0.35)',
                  padding: '7px 18px',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                }}
              >
                👁 Vista Visitante
              </button>
              <button
                onClick={() => onNavigate('admin')}
                className="nav-link"
                style={{
                  color: '#ffffff',
                  padding: '7px 18px',
                  background: 'rgba(0, 0, 0, 0.45)',
                  border: '1px solid rgba(255, 77, 77, 0.4)',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                }}
              >
                ⚙ Administrador
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};
