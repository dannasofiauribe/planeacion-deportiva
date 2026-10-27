import { useState, FC, FormEvent } from 'react';
import { SportKey, MatchStatus } from '../types';
import { useTournament } from '../context/TournamentContext';

export const AdminView: FC = () => {
  const {
    deportes,
    lugares,
    equipos,
    partidos,
    agregarEquipo,
    eliminarEquipo,
    programarPartido,
    actualizarMarcador,
    eliminarPartido,
    restablecerDatos,
  } = useTournament();

  // Estados de formulario de equipos
  const [selectedDeporteEquipo, setSelectedDeporteEquipo] = useState<SportKey>('futbol');
  const [nombreEquipo, setNombreEquipo] = useState('');
  const [mensajeEquipo, setMensajeEquipo] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null);

  // Estados de formulario de partidos
  const [deportePartido, setDeportePartido] = useState<SportKey>('futbol');
  const [equipoLocal, setEquipoLocal] = useState('');
  const [equipoVisitante, setEquipoVisitante] = useState('');
  const [lugarPartido, setLugarPartido] = useState(lugares[0]);
  const [fechaHora, setFechaHora] = useState('');
  const [fasePartido, setFasePartido] = useState('Cuartos de Final');
  const [mensajePartido, setMensajePartido] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null);

  // Edición rápida de marcadores
  const [marcadorEdits, setMarcadorEdits] = useState<{
    [id: string]: { local: string; visitante: string; estado: MatchStatus };
  }>({});

  const handleAddEquipo = (e: FormEvent) => {
    e.preventDefault();
    if (!nombreEquipo.trim()) return;

    const exito = agregarEquipo(nombreEquipo.trim(), selectedDeporteEquipo);
    if (exito) {
      setMensajeEquipo({ tipo: 'ok', texto: `¡Equipo "${nombreEquipo.trim()}" inscrito exitosamente!` });
      setNombreEquipo('');
    } else {
      setMensajeEquipo({ tipo: 'error', texto: `El equipo "${nombreEquipo.trim()}" ya existe en esta disciplina.` });
    }
    setTimeout(() => setMensajeEquipo(null), 4000);
  };

  const handleAddPartido = (e: FormEvent) => {
    e.preventDefault();
    if (!equipoLocal.trim() || !equipoVisitante.trim()) {
      setMensajePartido({ tipo: 'error', texto: 'Debes seleccionar o escribir ambos equipos.' });
      return;
    }
    if (equipoLocal.trim() === equipoVisitante.trim()) {
      setMensajePartido({ tipo: 'error', texto: 'El equipo local y visitante no pueden ser el mismo.' });
      return;
    }
    if (!fechaHora.trim()) {
      setMensajePartido({ tipo: 'error', texto: 'Debes ingresar una fecha y hora válida.' });
      return;
    }

    const res = programarPartido({
      deporte_id: deportePartido,
      equipo_local: equipoLocal.trim(),
      equipo_visitante: equipoVisitante.trim(),
      lugar: lugarPartido,
      fecha_hora: fechaHora.trim(),
      fase: fasePartido,
      marcador_local: '',
      marcador_visitante: '',
      estado: 'Programado',
    });

    if (res.ok) {
      setMensajePartido({ tipo: 'ok', texto: '¡Partido programado con éxito sin conflictos de cancha ni horario!' });
      setEquipoLocal('');
      setEquipoVisitante('');
      setFechaHora('');
    } else {
      setMensajePartido({ tipo: 'error', texto: res.mensaje || 'Error al programar partido.' });
    }
    setTimeout(() => setMensajePartido(null), 6000);
  };

  const handleGuardarMarcadorFila = (partidoId: string) => {
    const edit = marcadorEdits[partidoId];
    const partidoOriginal = partidos.find((p) => p.id === partidoId);
    if (!partidoOriginal) return;

    const loc = edit ? edit.local : partidoOriginal.marcador_local;
    const vis = edit ? edit.visitante : partidoOriginal.marcador_visitante;
    const est = edit ? edit.estado : partidoOriginal.estado;

    actualizarMarcador(partidoId, loc, vis, est);
  };

  const equiposDelDeporte = equipos.filter((e) => e.deporte_id === deportePartido);

  return (
    <div className="wide-container" style={{ maxWidth: '980px', margin: '0 auto' }}>
      {/* Encabezado centrado idéntico a image_56dfe06a.png y image_7e59fe62.png */}
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
          PANEL DE CONTROL DEPORTIVO
        </h1>
        <p style={{ color: '#ffcccc', marginTop: '0', fontSize: '0.95rem' }}>
          Inscribe los equipos del colegio, programa los partidos con control estricto de horarios y canchas, y registra los marcadores oficiales.
        </p>
      </div>

      {/* ================= 1. INSCRIPCIÓN DE EQUIPOS (image_56dfe06a.png) ================= */}
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '950px',
          backgroundColor: '#800808',
          textAlign: 'left',
          border: '1px solid rgba(255, 77, 77, 0.5)',
          borderRadius: '10px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          margin: '0 auto 25px auto',
        }}
      >
        <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
          👥 Inscripción de Equipos ({equipos.length} registrados)
        </h3>
        <p style={{ color: '#ffdddd', fontSize: '0.9rem', marginBottom: '16px' }}>
          Registra aquí los grados o equipos participantes por cada disciplina deportiva.
        </p>

        {mensajeEquipo && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '6px',
              marginBottom: '15px',
              backgroundColor: mensajeEquipo.tipo === 'ok' ? 'rgba(0, 200, 83, 0.25)' : 'rgba(255, 0, 0, 0.3)',
              border: `1px solid ${mensajeEquipo.tipo === 'ok' ? '#00e676' : '#ff5252'}`,
              color: '#ffffff',
              fontSize: '0.9rem',
            }}
          >
            {mensajeEquipo.texto}
          </div>
        )}

        <form onSubmit={handleAddEquipo} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#ffdddd', marginBottom: '5px' }}>
              DEPORTE *
            </label>
            <select
              value={selectedDeporteEquipo}
              onChange={(e) => setSelectedDeporteEquipo(e.target.value as SportKey)}
              style={{
                width: '100%',
                backgroundColor: '#0a0a0a',
                border: '1px solid #ff4d4d',
                color: '#ffffff',
                padding: '9px 12px',
                borderRadius: '6px',
                fontSize: '0.95rem',
              }}
            >
              {deportes.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.icono} {d.nombre}
                </option>
              ))}
            </select>
          </div>

          <div style={{ flex: '2 1 320px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#ffdddd', marginBottom: '5px' }}>
              NOMBRE DEL EQUIPO / GRADO *
            </label>
            <input
              type="text"
              value={nombreEquipo}
              onChange={(e) => setNombreEquipo(e.target.value)}
              placeholder="Ej: Grado 6°A, Los Halcones, etc."
              style={{
                width: '100%',
                backgroundColor: '#0a0a0a',
                border: '1px solid #ff4d4d',
                color: '#ffffff',
                padding: '9px 12px',
                borderRadius: '6px',
                fontSize: '0.95rem',
                boxSizing: 'border-box',
              }}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              style={{
                backgroundColor: '#00c853',
                color: '#000000',
                fontWeight: 'bold',
                padding: '10px 22px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.92rem',
                boxShadow: '0 2px 8px rgba(0,200,83,0.4)',
              }}
            >
              + INSCRIBIR EQUIPO
            </button>
          </div>
        </form>

        {/* Tabla de equipos inscritos idéntica a image_56dfe06a.png */}
        <div style={{ overflowX: 'auto', marginTop: '22px' }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Deporte</th>
                <th>Nombre del Equipo / Grado</th>
                <th style={{ width: '130px', textAlign: 'center' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {equipos.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', color: '#cccccc' }}>
                    No hay equipos registrados. ¡Inscribe el primero arriba!
                  </td>
                </tr>
              ) : (
                equipos.map((eq) => {
                  const deporte = deportes.find((d) => d.id === eq.deporte_id);
                  return (
                    <tr key={eq.id}>
                      <td style={{ fontWeight: '500', color: '#ffffff' }}>
                        {deporte ? deporte.nombre : eq.deporte_id}
                      </td>
                      <td style={{ fontSize: '1rem', color: '#ffffff', fontWeight: 'bold' }}>{eq.nombre}</td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          onClick={() => eliminarEquipo(eq.id)}
                          style={{
                            backgroundColor: '#660000',
                            color: '#ffffff',
                            border: '1px solid #ff4444',
                            borderRadius: '4px',
                            padding: '5px 14px',
                            fontSize: '0.82rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          🗑 Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= 2. PROGRAMACIÓN DE PARTIDOS ================= */}
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '950px',
          backgroundColor: '#800808',
          textAlign: 'left',
          border: '1px solid rgba(255, 77, 77, 0.5)',
          borderRadius: '10px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          margin: '0 auto 25px auto',
        }}
      >
        <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🗓️ Programación de Partidos (Validación Estricta de Canchas y Horarios)
        </h3>
        <p style={{ color: '#ffdddd', fontSize: '0.9rem', marginBottom: '16px' }}>
          Asigna partidos validando automáticamente que no haya colisiones de escenario ni horario simultáneo.
        </p>

        {mensajePartido && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '6px',
              marginBottom: '15px',
              backgroundColor: mensajePartido.tipo === 'ok' ? 'rgba(0, 200, 83, 0.25)' : 'rgba(255, 0, 0, 0.4)',
              border: `1px solid ${mensajePartido.tipo === 'ok' ? '#00e676' : '#ff5252'}`,
              color: '#ffffff',
              fontSize: '0.92rem',
              fontWeight: '500',
            }}
          >
            {mensajePartido.texto}
          </div>
        )}

        <form onSubmit={handleAddPartido} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#ffdddd', marginBottom: '4px' }}>
              DEPORTE *
            </label>
            <select
              value={deportePartido}
              onChange={(e) => {
                const dep = e.target.value as SportKey;
                setDeportePartido(dep);
                const infoDep = deportes.find((d) => d.id === dep);
                if (infoDep) setLugarPartido(infoDep.lugar_default);
              }}
              style={{
                width: '100%',
                backgroundColor: '#0a0a0a',
                border: '1px solid #ff4d4d',
                color: '#fff',
                padding: '9px 12px',
                borderRadius: '6px',
              }}
            >
              {deportes.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.icono} {d.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#ffdddd', marginBottom: '4px' }}>
              EQUIPO LOCAL / 1 *
            </label>
            {equiposDelDeporte.length > 0 ? (
              <select
                value={equipoLocal}
                onChange={(e) => setEquipoLocal(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#0a0a0a',
                  border: '1px solid #ff4d4d',
                  color: '#fff',
                  padding: '9px 12px',
                  borderRadius: '6px',
                }}
                required
              >
                <option value="">-- Seleccionar Equipo --</option>
                {equiposDelDeporte.map((eq) => (
                  <option key={eq.id} value={eq.nombre}>
                    {eq.nombre}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={equipoLocal}
                onChange={(e) => setEquipoLocal(e.target.value)}
                placeholder="Nombre equipo local"
                style={{
                  width: '100%',
                  backgroundColor: '#0a0a0a',
                  border: '1px solid #ff4d4d',
                  color: '#fff',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  boxSizing: 'border-box',
                }}
                required
              />
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#ffdddd', marginBottom: '4px' }}>
              EQUIPO VISITANTE / 2 *
            </label>
            {equiposDelDeporte.length > 0 ? (
              <select
                value={equipoVisitante}
                onChange={(e) => setEquipoVisitante(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#0a0a0a',
                  border: '1px solid #ff4d4d',
                  color: '#fff',
                  padding: '9px 12px',
                  borderRadius: '6px',
                }}
                required
              >
                <option value="">-- Seleccionar Equipo --</option>
                {equiposDelDeporte.map((eq) => (
                  <option key={eq.id} value={eq.nombre}>
                    {eq.nombre}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={equipoVisitante}
                onChange={(e) => setEquipoVisitante(e.target.value)}
                placeholder="Nombre equipo visitante"
                style={{
                  width: '100%',
                  backgroundColor: '#0a0a0a',
                  border: '1px solid #ff4d4d',
                  color: '#fff',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  boxSizing: 'border-box',
                }}
                required
              />
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#ffdddd', marginBottom: '4px' }}>
              CANCHA / ESCENARIO *
            </label>
            <select
              value={lugarPartido}
              onChange={(e) => setLugarPartido(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#0a0a0a',
                border: '1px solid #ff4d4d',
                color: '#fff',
                padding: '9px 12px',
                borderRadius: '6px',
              }}
            >
              {lugares.map((lug) => (
                <option key={lug} value={lug}>
                  📍 {lug}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#ffdddd', marginBottom: '4px' }}>
              FECHA Y HORA *
            </label>
            <input
              type="text"
              value={fechaHora}
              onChange={(e) => setFechaHora(e.target.value)}
              placeholder="Ej: 2026-10-29 08:30"
              style={{
                width: '100%',
                backgroundColor: '#0a0a0a',
                border: '1px solid #ff4d4d',
                color: '#fff',
                padding: '9px 12px',
                borderRadius: '6px',
                boxSizing: 'border-box',
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#ffdddd', marginBottom: '4px' }}>
              FASE / INSTANCIA *
            </label>
            <select
              value={fasePartido}
              onChange={(e) => setFasePartido(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#0a0a0a',
                border: '1px solid #ff4d4d',
                color: '#fff',
                padding: '9px 12px',
                borderRadius: '6px',
              }}
            >
              <option value="Fase Eliminatoria">Fase Eliminatoria</option>
              <option value="Cuartos de Final">Cuartos de Final</option>
              <option value="Semifinal">Semifinal</option>
              <option value="Gran Final">Gran Final</option>
            </select>
          </div>

          <div style={{ gridColumn: '1 / -1', marginTop: '6px' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#00c853',
                color: '#000000',
                fontWeight: 'bold',
                padding: '11px 25px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.95rem',
                boxShadow: '0 2px 10px rgba(0,200,83,0.4)',
              }}
            >
              + PROGRAMAR PARTIDO
            </button>
          </div>
        </form>
      </div>

      {/* ================= 3. REGISTRO DE MARCADORES ================= */}
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '950px',
          backgroundColor: '#800808',
          textAlign: 'left',
          border: '1px solid rgba(255, 77, 77, 0.5)',
          borderRadius: '10px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          margin: '0 auto 25px auto',
        }}
      >
        <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
          📊 Registro y Actualización de Marcadores Oficiales
        </h3>
        <p style={{ color: '#ffdddd', fontSize: '0.9rem', marginBottom: '16px' }}>
          Ingresa los goles, puntos o tiempos y actualiza el estado a "Finalizado" para que los visitantes lo consulten.
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Encuentro</th>
                <th>Cancha & Horario</th>
                <th>Marcador</th>
                <th>Estado</th>
                <th style={{ textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {partidos.map((part) => {
                const edit = marcadorEdits[part.id] || {
                  local: part.marcador_local,
                  visitante: part.marcador_visitante,
                  estado: part.estado,
                };
                return (
                  <tr key={part.id}>
                    <td>
                      <div style={{ fontWeight: 'bold', color: '#ffffff' }}>
                        {part.equipo_local} <span style={{ color: '#ffcc00' }}>vs</span> {part.equipo_visitante}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#ffdddd' }}>{part.fase}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem', color: '#fff' }}>📍 {part.lugar}</div>
                      <div style={{ fontSize: '0.78rem', color: '#ffaaaa' }}>🕒 {part.fecha_hora}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <input
                          type="text"
                          value={edit.local}
                          onChange={(e) =>
                            setMarcadorEdits({
                              ...marcadorEdits,
                              [part.id]: { ...edit, local: e.target.value },
                            })
                          }
                          placeholder="0"
                          style={{
                            width: '45px',
                            textAlign: 'center',
                            backgroundColor: '#0a0a0a',
                            border: '1px solid #ff4d4d',
                            color: '#ffcc00',
                            fontWeight: 'bold',
                            padding: '4px',
                            borderRadius: '4px',
                          }}
                        />
                        <span style={{ color: '#ffcc00', fontWeight: 'bold' }}>-</span>
                        <input
                          type="text"
                          value={edit.visitante}
                          onChange={(e) =>
                            setMarcadorEdits({
                              ...marcadorEdits,
                              [part.id]: { ...edit, visitante: e.target.value },
                            })
                          }
                          placeholder="0"
                          style={{
                            width: '45px',
                            textAlign: 'center',
                            backgroundColor: '#0a0a0a',
                            border: '1px solid #ff4d4d',
                            color: '#ffcc00',
                            fontWeight: 'bold',
                            padding: '4px',
                            borderRadius: '4px',
                          }}
                        />
                      </div>
                      {part.ganador && (
                        <div style={{ fontSize: '0.75rem', color: '#00ffcc', marginTop: '2px' }}>
                          Ganador: {part.ganador}
                        </div>
                      )}
                    </td>
                    <td>
                      <select
                        value={edit.estado}
                        onChange={(e) =>
                          setMarcadorEdits({
                            ...marcadorEdits,
                            [part.id]: { ...edit, estado: e.target.value as MatchStatus },
                          })
                        }
                        style={{
                          backgroundColor: '#0a0a0a',
                          border: '1px solid #ff4d4d',
                          color: edit.estado === 'Finalizado' ? '#00e676' : '#ffffff',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.85rem',
                        }}
                      >
                        <option value="Programado">Programado</option>
                        <option value="En Juego">En Juego</option>
                        <option value="Finalizado">Finalizado</option>
                      </select>
                    </td>
                    <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                      <button
                        onClick={() => handleGuardarMarcadorFila(part.id)}
                        style={{
                          backgroundColor: '#ffcc00',
                          color: '#000000',
                          fontWeight: 'bold',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '4px 10px',
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          marginRight: '6px',
                        }}
                      >
                        💾 Guardar
                      </button>
                      <button
                        onClick={() => eliminarPartido(part.id)}
                        style={{
                          backgroundColor: '#660000',
                          color: '#ffffff',
                          border: '1px solid #ff4444',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                        }}
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Botón de restablecimiento */}
      <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '40px' }}>
        <button
          onClick={restablecerDatos}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#aaaaaa',
            fontSize: '0.82rem',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          Restablecer datos originales del colegio
        </button>
      </div>
    </div>
  );
};
