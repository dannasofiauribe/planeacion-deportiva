import { useState, FC, useMemo } from 'react';
import { useTournament } from '../context/TournamentContext';

export const VisitanteView: FC = () => {
  const { deportes, lugares, equipos, partidos } = useTournament();

  const [filtroEquipo, setFiltroEquipo] = useState<string>('todos');
  const [filtroDeporte, setFiltroDeporte] = useState<string>('todos');
  const [filtroLugar, setFiltroLugar] = useState<string>('todos');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');

  // Atajos rápidos idénticos a image_3315483c.png:
  // [10] [6] [7] [9] [Los carajos] [los ignorantes de 1103] [pepitas] [pepitos] [Ver Todos]
  const atajosRapidos = [
    '10',
    '6',
    '7',
    '9',
    'Los carajos',
    'los ignorantes de 1103',
    'pepitas',
    'pepitos',
  ];

  // Filtrado reactivo de partidos
  const partidosFiltrados = useMemo(() => {
    return partidos.filter((p) => {
      // Filtro equipo
      if (filtroEquipo !== 'todos') {
        const busqueda = filtroEquipo.toLowerCase();
        const coincideLocal = p.equipo_local.toLowerCase() === busqueda || p.equipo_local.toLowerCase().includes(busqueda);
        const coincideVisitante = p.equipo_visitante.toLowerCase() === busqueda || p.equipo_visitante.toLowerCase().includes(busqueda);
        if (!coincideLocal && !coincideVisitante) return false;
      }

      // Filtro deporte
      if (filtroDeporte !== 'todos' && p.deporte_id !== filtroDeporte) {
        return false;
      }

      // Filtro lugar
      if (filtroLugar !== 'todos' && p.lugar !== filtroLugar) {
        return false;
      }

      // Filtro estado
      if (filtroEstado !== 'todos') {
        if (filtroEstado === 'Programado' && p.estado !== 'Programado') return false;
        if (filtroEstado === 'En Juego' && p.estado !== 'En Juego') return false;
        if (filtroEstado === 'Finalizado' && p.estado !== 'Finalizado') return false;
      }

      return true;
    });
  }, [partidos, filtroEquipo, filtroDeporte, filtroLugar, filtroEstado]);

  const proximosCount = partidosFiltrados.filter((p) => p.estado === 'Programado' || p.estado === 'En Juego').length;
  const finalizadosCount = partidosFiltrados.filter((p) => p.estado === 'Finalizado').length;

  return (
    <div className="wide-container" style={{ maxWidth: '980px', margin: '0 auto' }}>
      {/* Encabezado centrado idéntico a image_3315483c.png y image_efe36b96.png */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '4px',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px',
            boxShadow: '0 0 15px rgba(255, 77, 77, 0.5)',
          }}
        >
          <img
            src="imagenes/logo.png"
            alt="Logo Intercursos Chincá"
            width="100"
            style={{ display: 'block', borderRadius: '8px' }}
          />
        </div>
        <h1 style={{ marginTop: '5px', marginBottom: '8px', fontSize: '2.1rem', fontWeight: 'bold' }}>
          PROGRAMACIÓN PARA VISITANTES Y ESTUDIANTES
        </h1>
        <p style={{ color: '#ffcccc', marginTop: '0', fontSize: '0.95rem' }}>
          Encuentra cuándo juega tu grado o equipo, horarios, canchas asignadas y marcadores oficiales.
        </p>
      </div>

      {/* ================= TARJETA DE BÚSQUEDA Y FILTROS (image_3315483c.png) ================= */}
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '960px',
          backgroundColor: 'rgba(25, 0, 0, 0.85)',
          border: '1px solid #ff4d4d',
          borderRadius: '12px',
          padding: '22px',
          textAlign: 'left',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
          margin: '0 auto 20px auto',
        }}
      >
        <h3
          style={{
            color: '#ffffff',
            fontSize: '1.15rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
          }}
        >
          🔍 Encuentra los partidos de tu equipo
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '15px',
          }}
        >
          {/* 1. Grado / Equipo (con borde amarillo idéntico a la captura) */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '6px' }}>
              🎓 TU GRADO O EQUIPO:
            </label>
            <select
              value={filtroEquipo}
              onChange={(e) => setFiltroEquipo(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#0a0a0a',
                border: '1.5px solid #ffcc00',
                color: '#ffffff',
                padding: '9px 12px',
                borderRadius: '6px',
                fontSize: '0.9rem',
              }}
            >
              <option value="todos">-- Todos los Equipos y Grados --</option>
              {equipos.map((eq) => (
                <option key={eq.id} value={eq.nombre}>
                  {eq.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Deporte */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '6px' }}>
              🏅 DEPORTE:
            </label>
            <select
              value={filtroDeporte}
              onChange={(e) => setFiltroDeporte(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#0a0a0a',
                border: '1px solid #ff4d4d',
                color: '#ffffff',
                padding: '9px 12px',
                borderRadius: '6px',
                fontSize: '0.9rem',
              }}
            >
              <option value="todos">Todos los deportes</option>
              {deportes.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.icono} {d.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Cancha / Lugar */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '6px' }}>
              📍 CANCHA / LUGAR:
            </label>
            <select
              value={filtroLugar}
              onChange={(e) => setFiltroLugar(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#0a0a0a',
                border: '1px solid #ff4d4d',
                color: '#ffffff',
                padding: '9px 12px',
                borderRadius: '6px',
                fontSize: '0.9rem',
              }}
            >
              <option value="todos">Todos los lugares</option>
              {lugares.map((lug) => (
                <option key={lug} value={lug}>
                  {lug}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Estado */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '6px' }}>
              ⏳ ESTADO:
            </label>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#0a0a0a',
                border: '1px solid #ff4d4d',
                color: '#ffffff',
                padding: '9px 12px',
                borderRadius: '6px',
                fontSize: '0.9rem',
              }}
            >
              <option value="todos">Todos los partidos</option>
              <option value="Programado">Programados</option>
              <option value="En Juego">En juego</option>
              <option value="Finalizado">Finalizados</option>
            </select>
          </div>
        </div>

        {/* Atajos rápidos idénticos a image_3315483c.png */}
        <div style={{ marginTop: '18px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 'bold', color: '#ffffff' }}>Atajos rápidos:</span>
          {atajosRapidos.map((atajo) => {
            const isActive = filtroEquipo === atajo;
            return (
              <button
                key={atajo}
                onClick={() => setFiltroEquipo(atajo)}
                style={{
                  backgroundColor: isActive ? '#ffcc00' : '#2b2b2b',
                  color: isActive ? '#000000' : '#ffffff',
                  border: isActive ? '1px solid #ffcc00' : '1px solid #4a4a4a',
                  borderRadius: '4px',
                  padding: '4px 10px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {atajo}
              </button>
            );
          })}
          <button
            onClick={() => {
              setFiltroEquipo('todos');
              setFiltroDeporte('todos');
              setFiltroLugar('todos');
              setFiltroEstado('todos');
            }}
            style={{
              backgroundColor: '#8b0000',
              color: '#ffffff',
              border: '1px solid #ff4d4d',
              borderRadius: '4px',
              padding: '4px 12px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Ver Todos
          </button>
        </div>
      </div>

      {/* ================= CONTADOR DE PARTIDOS ================= */}
      <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'left' }}>
        <div style={{ margin: '14px 4px 12px 4px' }}>
          <span style={{ fontSize: '0.92rem', color: '#ffdddd' }}>
            Mostrando <strong>{partidosFiltrados.length}</strong> partidos en total (<strong>{proximosCount}</strong> próximos | <strong>{finalizadosCount}</strong> finalizados)
          </span>
        </div>

        {partidosFiltrados.length === 0 ? (
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '960px',
              backgroundColor: 'rgba(30,0,0,0.6)',
              padding: '30px',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '1.05rem', color: '#ffaaaa' }}>
              No se encontraron partidos para el filtro actual.
            </p>
            <button
              onClick={() => {
                setFiltroEquipo('todos');
                setFiltroDeporte('todos');
                setFiltroLugar('todos');
                setFiltroEstado('todos');
              }}
              className="btn"
              style={{ backgroundColor: '#ffcc00', color: '#000000', marginTop: '10px' }}
            >
              Ver Todos los Partidos
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '6px' }}>
            {partidosFiltrados.map((part) => {
              const deporte = deportes.find((d) => d.id === part.deporte_id);
              const isFinished = part.estado === 'Finalizado';
              const isInGame = part.estado === 'En Juego';

              return (
                <div
                  key={part.id}
                  style={{
                    backgroundColor: 'rgba(35, 3, 3, 0.9)',
                    border: '1px solid #ff4d4d',
                    borderRadius: '10px',
                    padding: '16px 20px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '15px',
                    boxShadow: '0 3px 12px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {/* Info izquierda: Deporte, Fase & Cancha */}
                  <div style={{ flex: '1 1 200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '1.2rem' }}>{deporte?.icono}</span>
                      <span style={{ fontWeight: 'bold', color: '#ffcc00', fontSize: '0.95rem' }}>
                        {deporte?.nombre}
                      </span>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          border: '1px solid #ff6666',
                          borderRadius: '12px',
                          padding: '2px 8px',
                          color: '#ffdddd',
                        }}
                      >
                        {part.fase}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>📍</span>
                      <strong style={{ color: '#ffffff' }}>{part.lugar}</strong>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#ffaaaa', marginTop: '2px' }}>
                      🕒 {part.fecha_hora}
                    </div>
                  </div>

                  {/* Centro: Enfrentamiento y Marcador */}
                  <div style={{ flex: '2 1 280px', textAlign: 'center' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        fontSize: '1.15rem',
                        fontWeight: 'bold',
                      }}
                    >
                      <span
                        style={{
                          color: isFinished && part.ganador === part.equipo_local ? '#00ffcc' : '#ffffff',
                          flex: '1',
                          textAlign: 'right',
                        }}
                      >
                        {part.equipo_local}
                        {isFinished && part.ganador === part.equipo_local && ' 👑'}
                      </span>

                      {/* Caja de marcador */}
                      <div
                        style={{
                          backgroundColor: '#000000',
                          border: '2px solid #ffcc00',
                          borderRadius: '8px',
                          padding: '4px 14px',
                          color: '#ffcc00',
                          fontFamily: 'monospace',
                          fontSize: '1.35rem',
                          letterSpacing: '2px',
                          minWidth: '70px',
                        }}
                      >
                        {isFinished || (part.marcador_local !== '' && part.marcador_visitante !== '')
                          ? `${part.marcador_local || '0'} - ${part.marcador_visitante || '0'}`
                          : 'VS'}
                      </div>

                      <span
                        style={{
                          color: isFinished && part.ganador === part.equipo_visitante ? '#00ffcc' : '#ffffff',
                          flex: '1',
                          textAlign: 'left',
                        }}
                      >
                        {part.equipo_visitante}
                        {isFinished && part.ganador === part.equipo_visitante && ' 👑'}
                      </span>
                    </div>

                    {part.ganador && (
                      <div style={{ fontSize: '0.78rem', color: '#00ffcc', marginTop: '4px' }}>
                        ¡Ganador oficial: <strong>{part.ganador}</strong>!
                      </div>
                    )}
                  </div>

                  {/* Derecha: Estado */}
                  <div style={{ flex: '0 0 110px', textAlign: 'right' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.78rem',
                        fontWeight: 'bold',
                        backgroundColor: isFinished
                          ? 'rgba(0, 200, 83, 0.2)'
                          : isInGame
                          ? 'rgba(255, 204, 0, 0.2)'
                          : 'rgba(33, 150, 243, 0.2)',
                        color: isFinished ? '#00e676' : isInGame ? '#ffcc00' : '#40c4ff',
                        border: `1px solid ${
                          isFinished ? '#00e676' : isInGame ? '#ffcc00' : '#40c4ff'
                        }`,
                      }}
                    >
                      {part.estado}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
