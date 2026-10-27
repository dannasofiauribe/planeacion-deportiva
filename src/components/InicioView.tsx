import { FC } from 'react';
import { PageView } from '../types';

interface InicioViewProps {
  onNavigate: (page: PageView) => void;
}

export const InicioView: FC<InicioViewProps> = ({ onNavigate }) => {
  return (
    <div className="container" style={{ marginTop: '25px', maxWidth: '780px' }}>
      {/* Caja blanca con resplandor rojo del logo central idéntica a image_13dbfd6f.png */}
      <div
        style={{
          display: 'inline-block',
          padding: '6px',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '16px',
          boxShadow: '0 0 25px rgba(255, 77, 77, 0.65)',
        }}
      >
        <img
          src="imagenes/logo.png"
          alt="Logo Intercursos Chincá"
          width="170"
          style={{ display: 'block', borderRadius: '12px' }}
        />
      </div>

      <h1 style={{ marginTop: '15px', letterSpacing: '1px', fontSize: '2.2rem', fontWeight: 'bold' }}>
        INTERCURSOS CHINCÁ
      </h1>
      <p style={{ fontSize: '1.05rem', color: '#ffdddd', marginTop: '6px' }}>
        Sistema de gestión y consulta para la planeación deportiva escolar de la I.E. Inocencio Chincá.
      </p>

      {/* Tarjeta de Administración de Torneo (borde verde de image_13dbfd6f.png) */}
      <div
        onClick={() => onNavigate('admin')}
        style={{
          border: '2px solid #00aa44',
          backgroundColor: 'rgba(0, 35, 12, 0.55)',
          borderRadius: '8px',
          padding: '24px 28px',
          maxWidth: '560px',
          margin: '30px auto 20px auto',
          textAlign: 'center',
          boxShadow: '0 0 18px rgba(0, 170, 68, 0.25)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <h3
          style={{
            color: '#00e676',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          ⚙ ADMINISTRACIÓN DE TORNEO
        </h3>
        <p style={{ color: '#ffffff', fontSize: '0.95rem', lineHeight: '1.5', margin: '0' }}>
          Registra nuevos equipos, programa partidos con validación estricta de canchas y horarios, y actualiza marcadores.
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('admin');
          }}
          className="btn"
          style={{
            backgroundColor: '#00aa44',
            color: '#ffffff',
            fontWeight: 'bold',
            marginTop: '15px',
            padding: '9px 24px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.92rem',
          }}
        >
          INGRESAR COMO ADMINISTRADOR →
        </button>
      </div>

      {/* Tarjeta de Consulta Pública / Vista Visitante */}
      <div
        onClick={() => onNavigate('visitante')}
        style={{
          border: '2px solid #ff4d4d',
          backgroundColor: 'rgba(45, 0, 0, 0.55)',
          borderRadius: '8px',
          padding: '24px 28px',
          maxWidth: '560px',
          margin: '20px auto',
          textAlign: 'center',
          boxShadow: '0 0 18px rgba(255, 77, 77, 0.25)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <h3
          style={{
            color: '#ff7777',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          👁 VISTA VISITANTE / ESTUDIANTES
        </h3>
        <p style={{ color: '#ffffff', fontSize: '0.95rem', lineHeight: '1.5', margin: '0' }}>
          Encuentra cuándo juega tu grado o equipo, horarios, canchas asignadas y marcadores oficiales.
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('visitante');
          }}
          className="btn"
          style={{
            backgroundColor: '#ff4d4d',
            color: '#ffffff',
            fontWeight: 'bold',
            marginTop: '15px',
            padding: '9px 24px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.92rem',
          }}
        >
          VER PROGRAMACIÓN Y RESULTADOS →
        </button>
      </div>
    </div>
  );
};
