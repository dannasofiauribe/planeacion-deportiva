import { useState, useEffect } from 'react';

type PageRoute =
  | 'index.html'
  | 'deportes.html'
  | 'futbol.html'
  | 'baloncesto.html'
  | 'voleibol.html'
  | 'atletismo.html'
  | 'microfutbol.html'
  | 'panel.html'
  | 'calendario.html'
  | 'equipos.html'
  | 'resultados.html'
  | 'esquema.html'
  | 'esquema-futbol.html'
  | 'esquema-baloncesto.html'
  | 'esquema-voleibol.html'
  | 'esquema-atletismo.html'
  | 'esquema-microfutbol.html';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('index.html');

  // Support browser hash navigation (e.g. #deportes.html or #panel.html)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      const validPages: PageRoute[] = [
        'index.html',
        'deportes.html',
        'futbol.html',
        'baloncesto.html',
        'voleibol.html',
        'atletismo.html',
        'microfutbol.html',
        'panel.html',
        'calendario.html',
        'equipos.html',
        'resultados.html',
        'esquema.html',
        'esquema-futbol.html',
        'esquema-baloncesto.html',
        'esquema-voleibol.html',
        'esquema-atletismo.html',
        'esquema-microfutbol.html',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('index.html');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ==================== 1. INICIO (index.html) ====================
  if (currentPage === 'index.html') {
    return (
      <div>
        <div className="current-page-header">INICIO</div>

        <div className="container">
          <br />
          <img
            src="imagenes/escudo.jfif"
            alt="Escudo"
            width="130"
            style={{ background: 'white', padding: '5px', borderRadius: '5px' }}
          />

          <h1>PLANEACIÓN DEPORTIVA</h1>
          <p>
            Sistema de gestión para la organización, planeación y control de torneos deportivos
            escolares.
          </p>
          <br />

          <div className="card">
            <h3>⚽ DEPORTES</h3>
            <p>Consulta la información general de las disciplinas disponibles.</p>
            <button onClick={() => navigateTo('deportes.html')} className="btn">
              INGRESAR →
            </button>
          </div>

          <div className="card">
            <h3>🏆 PANEL DE GESTIÓN</h3>
            <p>Consulta calendarios, equipos y resultados.</p>
            <button onClick={() => navigateTo('panel.html')} className="btn">
              INGRESAR →
            </button>
          </div>

          {/* Nuevo Botón de Esquema */}
          <div className="card">
            <h3>📊 ESQUEMA DE TORNEO</h3>
            <p>Visualiza las llaves de enfrentamientos y ganadores por deporte.</p>
            <button onClick={() => navigateTo('esquema.html')} className="btn">
              INGRESAR →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== 2. DEPORTES (deportes.html) ====================
  if (currentPage === 'deportes.html') {
    return (
      <div>
        <div className="current-page-header">DEPORTES</div>

        <div className="container">
          <h1>SELECCIÓN DE DEPORTES</h1>
          <p>Elige una disciplina para ver sus detalles y equipos.</p>

          <div className="card">
            <h3>⚽ Fútbol</h3>
            <p>8 Equipos | Cancha principal</p>
            <button onClick={() => navigateTo('futbol.html')} className="btn">
              VER MÁS →
            </button>
          </div>

          <div className="card">
            <h3>🏀 Baloncesto</h3>
            <p>6 Equipos | Cancha cubierta</p>
            <button onClick={() => navigateTo('baloncesto.html')} className="btn">
              VER MÁS →
            </button>
          </div>

          <div className="card">
            <h3>🏐 Voleibol</h3>
            <p>6 Equipos | Coliseo escolar</p>
            <button onClick={() => navigateTo('voleibol.html')} className="btn">
              VER MÁS →
            </button>
          </div>

          <div className="card">
            <h3>🏃 Atletismo</h3>
            <p>10 Participantes | Pista atlética</p>
            <button onClick={() => navigateTo('atletismo.html')} className="btn">
              VER MÁS →
            </button>
          </div>

          <div className="card">
            <h3>⚽ Microfútbol</h3>
            <p>12 Equipos | Cancha múltiple</p>
            <button onClick={() => navigateTo('microfutbol.html')} className="btn">
              VER MÁS →
            </button>
          </div>

          <br />
          <button
            onClick={() => navigateTo('index.html')}
            className="btn"
            style={{ backgroundColor: '#333', color: 'white' }}
          >
            ← VOLVER AL INICIO
          </button>
        </div>
      </div>
    );
  }

  // ==================== 3. FÚTBOL (futbol.html) ====================
  if (currentPage === 'futbol.html') {
    return (
      <div>
        <div className="current-page-header">FÚTBOL</div>

        <div className="container">
          <h1>⚽ FÚTBOL</h1>
          <p>Disciplina principal del torneo escolar con la participación de 8 equipos.</p>

          <div className="card" style={{ textAlign: 'left' }}>
            <h3>Detalles del Deporte</h3>
            <p>
              <strong>Escenario:</strong> Cancha Principal
            </p>
            <p>
              <strong>Equipos Inscritos:</strong> 8 equipos
            </p>
            <p>
              <strong>Modalidad:</strong> Eliminación y fase de grupos
            </p>
            <p>
              <strong>Descripción:</strong> Torneo de once jugadores por equipo, enfocado en
              fomentar el trabajo en equipo, la estrategia y el juego limpio entre los grados.
            </p>
          </div>

          {/* Tabla de equipos */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>📋 Equipos Inscritos (8)</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Grado / Equipo</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Grado 6°A</td></tr>
                <tr><td>2</td><td>Grado 7°A</td></tr>
                <tr><td>3</td><td>Grado 8°A</td></tr>
                <tr><td>4</td><td>Grado 8°B</td></tr>
                <tr><td>5</td><td>Grado 9°A</td></tr>
                <tr><td>6</td><td>Grado 10°A</td></tr>
                <tr><td>7</td><td>Grado 10°B</td></tr>
                <tr><td>8</td><td>Grado 11°A</td></tr>
              </tbody>
            </table>
          </div>

          <br />
          <button
            onClick={() => navigateTo('deportes.html')}
            className="btn"
            style={{ backgroundColor: '#333', color: 'white' }}
          >
            ← VOLVER A DEPORTES
          </button>
        </div>
      </div>
    );
  }

  // ==================== 4. BALONCESTO (baloncesto.html) ====================
  if (currentPage === 'baloncesto.html') {
    return (
      <div>
        <div className="current-page-header">BALONCESTO</div>

        <div className="container">
          <h1>🏀 BALONCESTO</h1>
          <p>Emoción y velocidad en la cancha cubierta con 6 equipos inscritos.</p>

          <div className="card" style={{ textAlign: 'left' }}>
            <h3>Detalles del Deporte</h3>
            <p>
              <strong>Escenario:</strong> Cancha Cubierta
            </p>
            <p>
              <strong>Equipos Inscritos:</strong> 6 equipos
            </p>
            <p>
              <strong>Modalidad:</strong> Todos contra todos
            </p>
            <p>
              <strong>Descripción:</strong> Competencia de habilidad, agilidad y encestes donde los
              mejores grados se enfrentan para demostrar su nivel táctico y físico.
            </p>
          </div>

          {/* Tabla de equipos */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>📋 Equipos Inscritos (6)</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Grado / Equipo</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Grado 8°A</td></tr>
                <tr><td>2</td><td>Grado 9°A</td></tr>
                <tr><td>3</td><td>Grado 9°B</td></tr>
                <tr><td>4</td><td>Grado 10°A</td></tr>
                <tr><td>5</td><td>Grado 11°A</td></tr>
                <tr><td>6</td><td>Grado 11°B</td></tr>
              </tbody>
            </table>
          </div>

          <br />
          <button
            onClick={() => navigateTo('deportes.html')}
            className="btn"
            style={{ backgroundColor: '#333', color: 'white' }}
          >
            ← VOLVER A DEPORTES
          </button>
        </div>
      </div>
    );
  }

  // ==================== 5. VOLEIBOL (voleibol.html) ====================
  if (currentPage === 'voleibol.html') {
    return (
      <div>
        <div className="current-page-header">VOLEIBOL</div>

        <div className="container">
          <h1>🏐 VOLEIBOL</h1>
          <p>Trabajo en equipo y coordinación en el coliseo escolar.</p>

          <div className="card" style={{ textAlign: 'left' }}>
            <h3>Detalles del Deporte</h3>
            <p>
              <strong>Escenario:</strong> Coliseo Escolar
            </p>
            <p>
              <strong>Equipos Inscritos:</strong> 6 equipos (Mixto)
            </p>
            <p>
              <strong>Modalidad:</strong> Sets eliminatorios
            </p>
            <p>
              <strong>Descripción:</strong> Deporte de conjunto donde la sincronización, los saques
              y la defensa en la malla son clave para conseguir la victoria.
            </p>
          </div>

          {/* Tabla de equipos */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>📋 Equipos Inscritos (6)</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Grado / Equipo</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Grado 7°B</td></tr>
                <tr><td>2</td><td>Grado 8°A</td></tr>
                <tr><td>3</td><td>Grado 9°A</td></tr>
                <tr><td>4</td><td>Grado 10°B</td></tr>
                <tr><td>5</td><td>Grado 11°A</td></tr>
                <tr><td>6</td><td>Grado 11°B</td></tr>
              </tbody>
            </table>
          </div>

          <br />
          <button
            onClick={() => navigateTo('deportes.html')}
            className="btn"
            style={{ backgroundColor: '#333', color: 'white' }}
          >
            ← VOLVER A DEPORTES
          </button>
        </div>
      </div>
    );
  }

  // ==================== 6. ATLETISMO (atletismo.html) ====================
  if (currentPage === 'atletismo.html') {
    return (
      <div>
        <div className="current-page-header">ATLETISMO</div>

        <div className="container">
          <h1>🏃 ATLETISMO</h1>
          <p>Velocidad, resistencia y superación personal en la pista atlética.</p>

          <div className="card" style={{ textAlign: 'left' }}>
            <h3>Detalles del Deporte</h3>
            <p>
              <strong>Escenario:</strong> Pista Atlética
            </p>
            <p>
              <strong>Participantes:</strong> 10 atletas inscritos
            </p>
            <p>
              <strong>Pruebas:</strong> 100m y 400m planos
            </p>
            <p>
              <strong>Descripción:</strong> Competencia individual donde se evalúa el rendimiento
              físico, la velocidad de reacción y la resistencia de los estudiantes.
            </p>
          </div>

          {/* Tabla de participantes */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>📋 Atletas Inscritos (10)</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Atleta / Competidor</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Carlos Pérez (6°A)</td></tr>
                <tr><td>2</td><td>Sofía Gómez (7°A)</td></tr>
                <tr><td>3</td><td>Mateo Ruiz (8°A)</td></tr>
                <tr><td>4</td><td>Valentina Torres (8°B)</td></tr>
                <tr><td>5</td><td>Andrés Castro (9°A)</td></tr>
                <tr><td>6</td><td>Lucía Mendoza (10°A)</td></tr>
                <tr><td>7</td><td>Daniel Rojas (10°B)</td></tr>
                <tr><td>8</td><td>Mariana Silva (11°A)</td></tr>
                <tr><td>9</td><td>Juan Esteban (11°B)</td></tr>
                <tr><td>10</td><td>Laura Jiménez (9°B)</td></tr>
              </tbody>
            </table>
          </div>

          <br />
          <button
            onClick={() => navigateTo('deportes.html')}
            className="btn"
            style={{ backgroundColor: '#333', color: 'white' }}
          >
            ← VOLVER A DEPORTES
          </button>
        </div>
      </div>
    );
  }

  // ==================== 7. MICROFÚTBOL (microfutbol.html) ====================
  if (currentPage === 'microfutbol.html') {
    return (
      <div>
        <div className="current-page-header">MICROFÚTBOL</div>

        <div className="container">
          <h1>⚽ MICROFÚTBOL</h1>
          <p>Intensidad y dinámica en espacios reducidos.</p>

          <div className="card" style={{ textAlign: 'left' }}>
            <h3>Detalles del Deporte</h3>
            <p>
              <strong>Escenario:</strong> Cancha Múltiple
            </p>
            <p>
              <strong>Equipos Inscritos:</strong> 12 equipos
            </p>
            <p>
              <strong>Modalidad:</strong> Eliminación directa
            </p>
            <p>
              <strong>Descripción:</strong> Uno de los deportes con mayor participación,
              caracterizado por partidos rápidos, gran talento técnico y alta emoción en cada
              jugada.
            </p>
          </div>

          {/* Tabla de equipos */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>📋 Equipos Inscritos (12)</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Grado / Equipo</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Grado 6°A</td></tr>
                <tr><td>2</td><td>Grado 6°B</td></tr>
                <tr><td>3</td><td>Grado 7°A</td></tr>
                <tr><td>4</td><td>Grado 7°B</td></tr>
                <tr><td>5</td><td>Grado 8°A</td></tr>
                <tr><td>6</td><td>Grado 8°B</td></tr>
                <tr><td>7</td><td>Grado 9°A</td></tr>
                <tr><td>8</td><td>Grado 9°B</td></tr>
                <tr><td>9</td><td>Grado 10°A</td></tr>
                <tr><td>10</td><td>Grado 10°B</td></tr>
                <tr><td>11</td><td>Grado 11°A</td></tr>
                <tr><td>12</td><td>Grado 11°B</td></tr>
              </tbody>
            </table>
          </div>

          <br />
          <button
            onClick={() => navigateTo('deportes.html')}
            className="btn"
            style={{ backgroundColor: '#333', color: 'white' }}
          >
            ← VOLVER A DEPORTES
          </button>
        </div>
      </div>
    );
  }

  // ==================== 8. PANEL DE GESTIÓN (panel.html) ====================
  if (currentPage === 'panel.html') {
    return (
      <div>
        <div className="current-page-header">PANEL DE GESTIÓN</div>

        <div className="container">
          <br />
          <h1>MENÚ PRINCIPAL</h1>
          <p>Selecciona una opción para administrar el torneo escolar.</p>

          <div className="card">
            <h3>🗓️ Calendario</h3>
            <p>Ver fechas y horas de los próximos partidos.</p>
            <button onClick={() => navigateTo('calendario.html')} className="btn">
              VER →
            </button>
          </div>

          <div className="card">
            <h3>👥 Equipos</h3>
            <p>Consulta el listado general de equipos inscritos.</p>
            <button onClick={() => navigateTo('equipos.html')} className="btn">
              VER →
            </button>
          </div>

          <div className="card">
            <h3>📊 Resultados</h3>
            <p>Marcadores finales de los encuentros disputados.</p>
            <button onClick={() => navigateTo('resultados.html')} className="btn">
              VER →
            </button>
          </div>

          <br />
          <button
            onClick={() => navigateTo('index.html')}
            className="btn"
            style={{ backgroundColor: '#333', color: 'white' }}
          >
            ← VOLVER AL INICIO
          </button>
        </div>
      </div>
    );
  }

  // ==================== 9. CALENDARIO (calendario.html) ====================
  if (currentPage === 'calendario.html') {
    return (
      <div>
        <div className="current-page-header">CALENDARIO</div>

        <div className="container">
          <h1>PROGRAMACIÓN OFICIAL POR FASES</h1>
          <p>Cronograma estructurado según las reglas de clasificación y el esquema del torneo.</p>

          {/* ================= 1. FÚTBOL ================= */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>⚽ FÚTBOL (8 Equipos)</h3>

            <h4 style={{ color: '#ffcc00', marginTop: '15px' }}>Fase 1: Cuartos de Final</h4>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Fecha / Hora</th><th>Ganador</th></tr>
              </thead>
              <tbody>
                <tr><td>6°A vs 7°A</td><td>Lunes - 8:00 AM</td><td>Grado 6°A</td></tr>
                <tr><td>8°A vs 8°B</td><td>Lunes - 9:00 AM</td><td>Grado 8°A</td></tr>
                <tr><td>9°A vs 10°A</td><td>Lunes - 10:00 AM</td><td>Grado 9°A</td></tr>
                <tr><td>10°B vs 11°A</td><td>Lunes - 11:00 AM</td><td>Grado 11°A</td></tr>
              </tbody>
            </table>

            <h4 style={{ color: '#ffcc00', marginTop: '15px' }}>Fase 2: Semifinal</h4>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Fecha / Hora</th><th>Ganador</th></tr>
              </thead>
              <tbody>
                <tr><td>6°A vs 8°A</td><td>Miércoles - 8:00 AM</td><td>Grado 6°A</td></tr>
                <tr><td>9°A vs 11°A</td><td>Miércoles - 9:30 AM</td><td>Grado 9°A</td></tr>
              </tbody>
            </table>

            <h4 style={{ color: '#ffcc00', marginTop: '15px' }}>Fase 3: Gran Final</h4>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Fecha / Hora</th><th>Campeón</th></tr>
              </thead>
              <tbody>
                <tr><td>6°A vs 9°A</td><td>Viernes - 10:00 AM</td><td><strong>Grado 6°A 🏆</strong></td></tr>
              </tbody>
            </table>
          </div>

          {/* ================= 2. BALONCESTO ================= */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>🏀 BALONCESTO (6 Equipos)</h3>

            <h4 style={{ color: '#ffcc00', marginTop: '15px' }}>Fase 1: 3 Encuentros Iniciales (Pasan 3)</h4>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Fecha / Hora</th><th>Resultado / Avance</th></tr>
              </thead>
              <tbody>
                <tr><td>8°A vs 9°A</td><td>Lunes - 8:00 AM</td><td>Gana 8°A (Pasa directo por mejor puntaje)</td></tr>
                <tr><td>9°B vs 10°A</td><td>Lunes - 9:30 AM</td><td>Gana 10°A (A semifinal)</td></tr>
                <tr><td>11°A vs 11°B</td><td>Lunes - 11:00 AM</td><td>Gana 11°A (A semifinal)</td></tr>
              </tbody>
            </table>

            <h4 style={{ color: '#ffcc00', marginTop: '15px' }}>Fase 2: Semifinal</h4>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Fecha / Hora</th><th>Ganador</th></tr>
              </thead>
              <tbody>
                <tr><td>10°A vs 11°A</td><td>Miércoles - 9:00 AM</td><td>Grado 11°A (A la Final)</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: '0.85rem', color: '#ddd', marginTop: '5px' }}>
              *Grado 8°A pasa directo a la final por tener el mayor puntaje de la fase 1.
            </p>

            <h4 style={{ color: '#ffcc00', marginTop: '15px' }}>Fase 3: Gran Final</h4>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Fecha / Hora</th><th>Campeón</th></tr>
              </thead>
              <tbody>
                <tr><td>8°A vs 11°A</td><td>Viernes - 11:30 AM</td><td><strong>Grado 8°A 🏆</strong></td></tr>
              </tbody>
            </table>
          </div>

          {/* ================= 3. VOLEIBOL ================= */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>🏐 VOLEIBOL (6 Equipos Mixtos)</h3>

            <h4 style={{ color: '#ffcc00', marginTop: '15px' }}>Fase 1: 3 Encuentros Iniciales (Pasan 3)</h4>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Fecha / Hora</th><th>Resultado / Avance</th></tr>
              </thead>
              <tbody>
                <tr><td>7°B vs 8°A</td><td>Lunes - 1:00 PM</td><td>Gana 7°B (Pasa directo por mayor puntaje/sets)</td></tr>
                <tr><td>9°A vs 10°B</td><td>Lunes - 2:30 PM</td><td>Gana 9°A (A semifinal)</td></tr>
                <tr><td>11°A vs 11°B</td><td>Lunes - 4:00 PM</td><td>Gana 11°B (A semifinal)</td></tr>
              </tbody>
            </table>

            <h4 style={{ color: '#ffcc00', marginTop: '15px' }}>Fase 2: Semifinal</h4>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Fecha / Hora</th><th>Ganador</th></tr>
              </thead>
              <tbody>
                <tr><td>9°A vs 11°B</td><td>Miércoles - 2:00 PM</td><td>Grado 9°A (A la Final)</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: '0.85rem', color: '#ddd', marginTop: '5px' }}>
              *Grado 7°B pasa directo a la final por ser el de mayor puntaje en la fase 1.
            </p>

            <h4 style={{ color: '#ffcc00', marginTop: '15px' }}>Fase 3: Gran Final</h4>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Fecha / Hora</th><th>Campeón</th></tr>
              </thead>
              <tbody>
                <tr><td>7°B vs 9°A</td><td>Viernes - 2:00 PM</td><td><strong>Grado 7°B 🏆</strong></td></tr>
              </tbody>
            </table>
          </div>

          {/* ================= 4. ATLETISMO ================= */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>🏃 ATLETISMO (10 Participantes - 100m Planos)</h3>

            <h4 style={{ color: '#ffcc00', marginTop: '15px' }}>Fase 1: Series Eliminatorias</h4>
            <table>
              <thead>
                <tr><th>Prueba</th><th>Bloque</th><th>Fecha / Hora</th><th>Clasificados por Orden de Llegada</th></tr>
              </thead>
              <tbody>
                <tr><td>Serie 1</td><td>5 Atletas</td><td>Lunes - 7:30 AM</td><td>Carlos Pérez, Mateo Ruiz, Lucía Mendoza</td></tr>
                <tr><td>Serie 2</td><td>5 Atletas</td><td>Lunes - 7:50 AM</td><td>Andrés Castro, Sofía Gómez, Mariana Silva</td></tr>
              </tbody>
            </table>

            <h4 style={{ color: '#ffcc00', marginTop: '15px' }}>Fase 2: Gran Final (Por orden de llegada oficial)</h4>
            <table>
              <thead>
                <tr><th>Orden de Llegada / Podio</th><th>Atleta</th><th>Tiempo / Marca</th><th>Fecha / Hora</th></tr>
              </thead>
              <tbody>
                <tr><td>🥇 1er Lugar (Llegada 1°)</td><td>Carlos Pérez (6°A)</td><td>11.4 seg</td><td>Viernes - 8:00 AM</td></tr>
                <tr><td>🥈 2do Lugar (Llegada 2°)</td><td>Andrés Castro (9°A)</td><td>11.8 seg</td><td>Viernes - 8:00 AM</td></tr>
                <tr><td>🥉 3er Lugar (Llegada 3°)</td><td>Sofía Gómez (7°A)</td><td>12.1 seg</td><td>Viernes - 8:00 AM</td></tr>
              </tbody>
            </table>
          </div>

          {/* ================= 5. MICROFÚTBOL ================= */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>⚽ MICROFÚTBOL (12 Equipos)</h3>

            <h4 style={{ color: '#ffcc00', marginTop: '15px' }}>Fase 1: Cuartos / 6 Encuentros Iniciales (Pasan 6)</h4>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Fecha / Hora</th><th>Ganador</th></tr>
              </thead>
              <tbody>
                <tr><td>6°A vs 6°B</td><td>Lunes - 7:30 AM</td><td>Grado 6°A</td></tr>
                <tr><td>7°A vs 7°B</td><td>Lunes - 8:30 AM</td><td>Grado 7°A</td></tr>
                <tr><td>8°A vs 8°B</td><td>Lunes - 9:30 AM</td><td>Grado 8°A</td></tr>
                <tr><td>9°A vs 9°B</td><td>Lunes - 10:30 AM</td><td>Grado 9°A</td></tr>
                <tr><td>10°A vs 10°B</td><td>Lunes - 11:30 AM</td><td>Grado 10°A</td></tr>
                <tr><td>11°A vs 11°B</td><td>Lunes - 12:30 PM</td><td>Grado 11°A</td></tr>
              </tbody>
            </table>

            <h4 style={{ color: '#ffcc00', marginTop: '15px' }}>Fase 2: Siguientes 3 Encuentros (Pasan 3)</h4>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Fecha / Hora</th><th>Resultado / Avance</th></tr>
              </thead>
              <tbody>
                <tr><td>6°A vs 7°A</td><td>Martes - 8:00 AM</td><td>Gana 6°A (Pasa directo por mayor cantidad de goles)</td></tr>
                <tr><td>8°A vs 9°A</td><td>Martes - 9:30 AM</td><td>Gana 8°A (A semifinal)</td></tr>
                <tr><td>10°A vs 11°A</td><td>Martes - 11:00 AM</td><td>Gana 11°A (A semifinal)</td></tr>
              </tbody>
            </table>

            <h4 style={{ color: '#ffcc00', marginTop: '15px' }}>Fase 3: Semifinal</h4>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Fecha / Hora</th><th>Ganador</th></tr>
              </thead>
              <tbody>
                <tr><td>8°A vs 11°A</td><td>Jueves - 9:00 AM</td><td>Grado 8°A (A la Final)</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: '0.85rem', color: '#ddd', marginTop: '5px' }}>
              *Grado 6°A pasa directo a la final por tener la mayor cantidad de goles en la fase anterior.
            </p>

            <h4 style={{ color: '#ffcc00', marginTop: '15px' }}>Fase 4: Gran Final</h4>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Fecha / Hora</th><th>Campeón</th></tr>
              </thead>
              <tbody>
                <tr><td>6°A vs 8°A</td><td>Viernes - 3:30 PM</td><td><strong>Grado 6°A 🏆</strong></td></tr>
              </tbody>
            </table>
          </div>

          <br />
          <button
            onClick={() => navigateTo('panel.html')}
            className="btn"
            style={{ backgroundColor: '#333', color: 'white' }}
          >
            ← VOLVER AL PANEL
          </button>
        </div>
      </div>
    );
  }

  // ==================== 10. EQUIPOS (equipos.html) ====================
  if (currentPage === 'equipos.html') {
    return (
      <div>
        <div className="current-page-header">EQUIPOS</div>

        <div className="container">
          <h1>LISTADO GENERAL DE EQUIPOS</h1>
          <p>Inscripciones oficiales por cada disciplina deportiva.</p>

          {/* 1. Fútbol: 8 equipos */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>⚽ Fútbol (8 Equipos)</h3>
            <table>
              <thead>
                <tr><th>#</th><th>Grado / Equipo</th></tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Grado 6°A</td></tr>
                <tr><td>2</td><td>Grado 7°A</td></tr>
                <tr><td>3</td><td>Grado 8°A</td></tr>
                <tr><td>4</td><td>Grado 8°B</td></tr>
                <tr><td>5</td><td>Grado 9°A</td></tr>
                <tr><td>6</td><td>Grado 10°A</td></tr>
                <tr><td>7</td><td>Grado 10°B</td></tr>
                <tr><td>8</td><td>Grado 11°A</td></tr>
              </tbody>
            </table>
          </div>

          {/* 2. Baloncesto: 6 equipos */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>🏀 Baloncesto (6 Equipos)</h3>
            <table>
              <thead>
                <tr><th>#</th><th>Grado / Equipo</th></tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Grado 8°A</td></tr>
                <tr><td>2</td><td>Grado 9°A</td></tr>
                <tr><td>3</td><td>Grado 9°B</td></tr>
                <tr><td>4</td><td>Grado 10°A</td></tr>
                <tr><td>5</td><td>Grado 11°A</td></tr>
                <tr><td>6</td><td>Grado 11°B</td></tr>
              </tbody>
            </table>
          </div>

          {/* 3. Voleibol: 6 equipos */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>🏐 Voleibol (6 Equipos)</h3>
            <table>
              <thead>
                <tr><th>#</th><th>Grado / Equipo</th></tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Grado 7°B</td></tr>
                <tr><td>2</td><td>Grado 8°A</td></tr>
                <tr><td>3</td><td>Grado 9°A</td></tr>
                <tr><td>4</td><td>Grado 10°B</td></tr>
                <tr><td>5</td><td>Grado 11°A</td></tr>
                <tr><td>6</td><td>Grado 11°B</td></tr>
              </tbody>
            </table>
          </div>

          {/* 4. Atletismo: 10 participantes */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>🏃 Atletismo (10 Participantes)</h3>
            <table>
              <thead>
                <tr><th>#</th><th>Atleta / Competidor</th></tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Carlos Pérez (6°A)</td></tr>
                <tr><td>2</td><td>Sofía Gómez (7°A)</td></tr>
                <tr><td>3</td><td>Mateo Ruiz (8°A)</td></tr>
                <tr><td>4</td><td>Valentina Torres (8°B)</td></tr>
                <tr><td>5</td><td>Andrés Castro (9°A)</td></tr>
                <tr><td>6</td><td>Lucía Mendoza (10°A)</td></tr>
                <tr><td>7</td><td>Daniel Rojas (10°B)</td></tr>
                <tr><td>8</td><td>Mariana Silva (11°A)</td></tr>
                <tr><td>9</td><td>Juan Esteban (11°B)</td></tr>
                <tr><td>10</td><td>Laura Jiménez (9°B)</td></tr>
              </tbody>
            </table>
          </div>

          {/* 5. Microfútbol: 12 equipos */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>⚽ Microfútbol (12 Equipos)</h3>
            <table>
              <thead>
                <tr><th>#</th><th>Grado / Equipo</th></tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Grado 6°A</td></tr>
                <tr><td>2</td><td>Grado 6°B</td></tr>
                <tr><td>3</td><td>Grado 7°A</td></tr>
                <tr><td>4</td><td>Grado 7°B</td></tr>
                <tr><td>5</td><td>Grado 8°A</td></tr>
                <tr><td>6</td><td>Grado 8°B</td></tr>
                <tr><td>7</td><td>Grado 9°A</td></tr>
                <tr><td>8</td><td>Grado 9°B</td></tr>
                <tr><td>9</td><td>Grado 10°A</td></tr>
                <tr><td>10</td><td>Grado 10°B</td></tr>
                <tr><td>11</td><td>Grado 11°A</td></tr>
                <tr><td>12</td><td>Grado 11°B</td></tr>
              </tbody>
            </table>
          </div>

          <br />
          <button
            onClick={() => navigateTo('panel.html')}
            className="btn"
            style={{ backgroundColor: '#333', color: 'white' }}
          >
            ← VOLVER AL PANEL
          </button>
        </div>
      </div>
    );
  }

  // ==================== 11. RESULTADOS (resultados.html) ====================
  if (currentPage === 'resultados.html') {
    return (
      <div>
        <div className="current-page-header">RESULTADOS</div>

        <div className="container">
          <h1>RESULTADOS DE ENCUENTROS</h1>
          <p>Marcadores oficiales de las llaves disputadas.</p>

          {/* 1. Fútbol */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>⚽ Fútbol (Cuartos)</h3>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Marcador</th><th>Estado</th></tr>
              </thead>
              <tbody>
                <tr><td>6°A vs 7°A</td><td>2 - 1</td><td>Finalizado</td></tr>
                <tr><td>8°A vs 8°B</td><td>0 - 0 (5-4 pen.)</td><td>Finalizado</td></tr>
                <tr><td>9°A vs 10°A</td><td>3 - 1</td><td>Finalizado</td></tr>
                <tr><td>10°B vs 11°A</td><td>1 - 2</td><td>Finalizado</td></tr>
              </tbody>
            </table>
          </div>

          {/* 2. Baloncesto */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>🏀 Baloncesto</h3>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Marcador</th><th>Estado</th></tr>
              </thead>
              <tbody>
                <tr><td>9°B vs 10°A</td><td>42 - 39</td><td>Finalizado</td></tr>
                <tr><td>8°A vs 9°A</td><td>34 - 28</td><td>Finalizado</td></tr>
                <tr><td>11°A vs 10°A</td><td>50 - 45</td><td>Finalizado</td></tr>
              </tbody>
            </table>
          </div>

          {/* 3. Voleibol */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>🏐 Voleibol</h3>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Marcador</th><th>Estado</th></tr>
              </thead>
              <tbody>
                <tr><td>9°A vs 10°B</td><td>2 - 1</td><td>Finalizado</td></tr>
                <tr><td>7°B vs 8°A</td><td>2 - 0</td><td>Finalizado</td></tr>
                <tr><td>9°A vs 11°B</td><td>2 - 1</td><td>Finalizado</td></tr>
              </tbody>
            </table>
          </div>

          {/* 4. Atletismo */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>🏃 Atletismo (100m)</h3>
            <table>
              <thead>
                <tr><th>Posición</th><th>Atleta</th><th>Tiempo</th></tr>
              </thead>
              <tbody>
                <tr><td>🥇 1er Lugar</td><td>Carlos Pérez (6°A)</td><td>11.4 seg</td></tr>
                <tr><td>🥈 2do Lugar</td><td>Andrés Castro (9°A)</td><td>11.8 seg</td></tr>
                <tr><td>🥉 3er Lugar</td><td>Sofía Gómez (7°A)</td><td>12.1 seg</td></tr>
              </tbody>
            </table>
          </div>

          {/* 5. Microfútbol */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>⚽ Microfútbol</h3>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Marcador</th><th>Estado</th></tr>
              </thead>
              <tbody>
                <tr><td>6°A vs 6°B</td><td>4 - 2</td><td>Finalizado</td></tr>
                <tr><td>7°A vs 7°B</td><td>3 - 3 (3-2 pen.)</td><td>Finalizado</td></tr>
                <tr><td>8°A vs 8°B</td><td>5 - 1</td><td>Finalizado</td></tr>
                <tr><td>9°A vs 9°B</td><td>2 - 0</td><td>Finalizado</td></tr>
                <tr><td>10°A vs 10°B</td><td>1 - 1 (4-2 pen.)</td><td>Finalizado</td></tr>
                <tr><td>11°A vs 11°B</td><td>4 - 3</td><td>Finalizado</td></tr>
              </tbody>
            </table>
          </div>

          <br />
          <button
            onClick={() => navigateTo('panel.html')}
            className="btn"
            style={{ backgroundColor: '#333', color: 'white' }}
          >
            ← VOLVER AL PANEL
          </button>
        </div>
      </div>
    );
  }

  // ==================== 12. ESQUEMA (esquema.html) ====================
  if (currentPage === 'esquema.html') {
    return (
      <div>
        <div className="current-page-header">ESQUEMA DE TORNEO</div>

        <div className="container">
          <h1>SELECCIONA UN DEPORTE</h1>
          <p>Haz clic en una disciplina para ver su esquema de llaves y ganadores.</p>

          <div className="card">
            <h3>⚽ Fútbol</h3>
            <button onClick={() => navigateTo('esquema-futbol.html')} className="btn">
              VER ESQUEMA →
            </button>
          </div>

          <div className="card">
            <h3>🏀 Baloncesto</h3>
            <button onClick={() => navigateTo('esquema-baloncesto.html')} className="btn">
              VER ESQUEMA →
            </button>
          </div>

          <div className="card">
            <h3>🏐 Voleibol</h3>
            <button onClick={() => navigateTo('esquema-voleibol.html')} className="btn">
              VER ESQUEMA →
            </button>
          </div>

          <div className="card">
            <h3>🏃 Atletismo</h3>
            <button onClick={() => navigateTo('esquema-atletismo.html')} className="btn">
              VER ESQUEMA →
            </button>
          </div>

          <div className="card">
            <h3>⚽ Microfútbol</h3>
            <button onClick={() => navigateTo('esquema-microfutbol.html')} className="btn">
              VER ESQUEMA →
            </button>
          </div>

          <br />
          <button
            onClick={() => navigateTo('index.html')}
            className="btn"
            style={{ backgroundColor: '#333', color: 'white' }}
          >
            ← VOLVER AL INICIO
          </button>
        </div>
      </div>
    );
  }

  // ==================== 13. ESQUEMA FÚTBOL (esquema-futbol.html) ====================
  if (currentPage === 'esquema-futbol.html') {
    return (
      <div>
        <div className="current-page-header">ESQUEMA - FÚTBOL</div>

        <div className="container">
          <h1>LLAVES DE ELIMINACIÓN</h1>
          <p>Estructura de fases y avance de ganadores.</p>

          {/* Cuartos de Final */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>Fase 1: Cuartos de Final</h3>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Resultado</th><th>Ganador (Clasificado)</th></tr>
              </thead>
              <tbody>
                <tr><td>Grado 6°A vs Grado 7°A</td><td>2 - 1</td><td><strong>Grado 6°A 🏆</strong></td></tr>
                <tr><td>Grado 8°A vs Grado 8°B</td><td>0 - 0 (5-4 penales)</td><td><strong>Grado 8°A 🏆</strong></td></tr>
                <tr><td>Grado 9°A vs Grado 10°A</td><td>3 - 1</td><td><strong>Grado 9°A 🏆</strong></td></tr>
                <tr><td>Grado 10°B vs Grado 11°A</td><td>1 - 2</td><td><strong>Grado 11°A 🏆</strong></td></tr>
              </tbody>
            </table>
          </div>

          {/* Semifinal */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>Fase 2: Semifinal</h3>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Resultado</th><th>Ganador (A la Final)</th></tr>
              </thead>
              <tbody>
                <tr><td>Grado 6°A vs Grado 8°A</td><td>1 - 0</td><td><strong>Grado 6°A 🌟</strong></td></tr>
                <tr><td>Grado 9°A vs Grado 11°A</td><td>2 - 2 (4-3 penales)</td><td><strong>Grado 9°A 🌟</strong></td></tr>
              </tbody>
            </table>
          </div>

          {/* Gran Final */}
          <div className="card" style={{ textAlign: 'center', border: '2px solid #ffcc00' }}>
            <h3 style={{ color: '#ffcc00' }}>👑 GRAN FINAL</h3>
            <p style={{ fontSize: '1.2rem' }}>Grado 6°A <strong>VS</strong> Grado 9°A</p>
            <p>Resultado: <strong>2 - 1</strong></p>
            <h2 style={{ color: '#00ffcc', marginTop: '10px' }}>¡CAMPEÓN: GRADO 6°A! 🥇</h2>
          </div>

          <br />
          <button
            onClick={() => navigateTo('esquema.html')}
            className="btn"
            style={{ backgroundColor: '#333', color: 'white' }}
          >
            ← VOLVER A ESQUEMAS
          </button>
        </div>
      </div>
    );
  }

  // ==================== 14. ESQUEMA BALONCESTO (esquema-baloncesto.html) ====================
  if (currentPage === 'esquema-baloncesto.html') {
    return (
      <div>
        <div className="current-page-header">ESQUEMA - BALONCESTO</div>

        <div className="container">
          <h1>LLAVES DE ELIMINACIÓN</h1>
          <p>Estructura de fases para 6 equipos de baloncesto.</p>

          {/* Fase Preliminar / Repechaje */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>Fase 1: Eliminatoria Previa</h3>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Resultado</th><th>Ganador (Clasificado)</th></tr>
              </thead>
              <tbody>
                <tr><td>Grado 9°B vs Grado 10°A</td><td>42 - 39</td><td><strong>Grado 10°A 🏆</strong></td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: '0.9rem', color: '#ddd', marginTop: '5px' }}>
              *Grado 8°A, 9°A, 11°A y 11°B pasaron directamente a semifinales por sorteo.
            </p>
          </div>

          {/* Semifinal */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>Fase 2: Semifinal</h3>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Resultado</th><th>Ganador (A la Final)</th></tr>
              </thead>
              <tbody>
                <tr><td>Grado 8°A vs Grado 9°A</td><td>34 - 28</td><td><strong>Grado 8°A 🌟</strong></td></tr>
                <tr><td>Grado 11°A vs Grado 10°A</td><td>50 - 45</td><td><strong>Grado 11°A 🌟</strong></td></tr>
              </tbody>
            </table>
          </div>

          {/* Gran Final */}
          <div className="card" style={{ textAlign: 'center', border: '2px solid #ffcc00' }}>
            <h3 style={{ color: '#ffcc00' }}>👑 GRAN FINAL</h3>
            <p style={{ fontSize: '1.2rem' }}>Grado 8°A <strong>VS</strong> Grado 11°A</p>
            <p>Resultado: <strong>48 - 44</strong></p>
            <h2 style={{ color: '#00ffcc', marginTop: '10px' }}>¡CAMPEÓN: GRADO 8°A! 🥇</h2>
          </div>

          <br />
          <button
            onClick={() => navigateTo('esquema.html')}
            className="btn"
            style={{ backgroundColor: '#333', color: 'white' }}
          >
            ← VOLVER A ESQUEMAS
          </button>
        </div>
      </div>
    );
  }

  // ==================== 15. ESQUEMA VOLEIBOL (esquema-voleibol.html) ====================
  if (currentPage === 'esquema-voleibol.html') {
    return (
      <div>
        <div className="current-page-header">ESQUEMA - VOLEIBOL</div>

        <div className="container">
          <h1>LLAVES DE ELIMINACIÓN</h1>
          <p>Estructura de fases para 6 equipos de voleibol mixto.</p>

          {/* Fase Preliminar */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>Fase 1: Eliminatoria Previa</h3>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Resultado</th><th>Ganador (Clasificado)</th></tr>
              </thead>
              <tbody>
                <tr><td>Grado 9°A vs Grado 10°B</td><td>2 - 1</td><td><strong>Grado 9°A 🏆</strong></td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: '0.9rem', color: '#ddd', marginTop: '5px' }}>
              *Grado 7°B, 8°A, 11°A y 11°B avanzaron en llaves directas.
            </p>
          </div>

          {/* Semifinal */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>Fase 2: Semifinal</h3>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Resultado</th><th>Ganador (A la Final)</th></tr>
              </thead>
              <tbody>
                <tr><td>Grado 7°B vs Grado 8°A</td><td>2 - 0</td><td><strong>Grado 7°B 🌟</strong></td></tr>
                <tr><td>Grado 9°A vs Grado 11°B</td><td>2 - 1</td><td><strong>Grado 9°A 🌟</strong></td></tr>
              </tbody>
            </table>
          </div>

          {/* Gran Final */}
          <div className="card" style={{ textAlign: 'center', border: '2px solid #ffcc00' }}>
            <h3 style={{ color: '#ffcc00' }}>👑 GRAN FINAL</h3>
            <p style={{ fontSize: '1.2rem' }}>Grado 7°B <strong>VS</strong> Grado 9°A</p>
            <p>Resultado: <strong>2 - 1 (Sets)</strong></p>
            <h2 style={{ color: '#00ffcc', marginTop: '10px' }}>¡CAMPEÓN: GRADO 7°B! 🥇</h2>
          </div>

          <br />
          <button
            onClick={() => navigateTo('esquema.html')}
            className="btn"
            style={{ backgroundColor: '#333', color: 'white' }}
          >
            ← VOLVER A ESQUEMAS
          </button>
        </div>
      </div>
    );
  }

  // ==================== 16. ESQUEMA ATLETISMO (esquema-atletismo.html) ====================
  if (currentPage === 'esquema-atletismo.html') {
    return (
      <div>
        <div className="current-page-header">ESQUEMA - ATLETISMO</div>

        <div className="container">
          <h1>FASES DE COMPETENCIA</h1>
          <p>Clasificación desde series eliminatorias hasta la gran final de 100m planos.</p>

          {/* Series Clasificatorias */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>Fase 1: Series Eliminatorias (10 Atletas)</h3>
            <table>
              <thead>
                <tr><th>Serie</th><th>Atletas Destacados</th><th>Clasificados</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Serie 1 (5 Atletas)</td>
                  <td>Carlos Pérez, Mateo Ruiz, Lucía Mendoza</td>
                  <td><strong>Carlos Pérez (6°A)</strong></td>
                </tr>
                <tr>
                  <td>Serie 2 (5 Atletas)</td>
                  <td>Sofía Gómez, Andrés Castro, Mariana Silva</td>
                  <td><strong>Andrés Castro (9°A)</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Podio Final */}
          <div className="card" style={{ textAlign: 'center', border: '2px solid #ffcc00' }}>
            <h3 style={{ color: '#ffcc00' }}>🏅 PODIO FINAL - 100M PLANOS</h3>
            <table style={{ background: 'transparent', border: 'none' }}>
              <tbody>
                <tr>
                  <td style={{ border: 'none' }}>🥇 <strong>1er Lugar:</strong></td>
                  <td style={{ border: 'none' }}>Carlos Pérez (6°A) - 11.4 seg</td>
                </tr>
                <tr>
                  <td style={{ border: 'none' }}>🥈 <strong>2do Lugar:</strong></td>
                  <td style={{ border: 'none' }}>Andrés Castro (9°A) - 11.8 seg</td>
                </tr>
                <tr>
                  <td style={{ border: 'none' }}>🥉 <strong>3er Lugar:</strong></td>
                  <td style={{ border: 'none' }}>Sofía Gómez (7°A) - 12.1 seg</td>
                </tr>
              </tbody>
            </table>
          </div>

          <br />
          <button
            onClick={() => navigateTo('esquema.html')}
            className="btn"
            style={{ backgroundColor: '#333', color: 'white' }}
          >
            ← VOLVER A ESQUEMAS
          </button>
        </div>
      </div>
    );
  }

  // ==================== 17. ESQUEMA MICROFÚTBOL (esquema-microfutbol.html) ====================
  if (currentPage === 'esquema-microfutbol.html') {
    return (
      <div>
        <div className="current-page-header">ESQUEMA - MICROFÚTBOL</div>

        <div className="container">
          <h1>LLAVES DE ELIMINACIÓN</h1>
          <p>Estructura de llaves para 12 equipos de microfútbol.</p>

          {/* Octavos / Primera Ronda */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>Fase 1: Primera Ronda (Eliminatorias)</h3>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Resultado</th><th>Ganador (Clasificado)</th></tr>
              </thead>
              <tbody>
                <tr><td>Grado 6°A vs Grado 6°B</td><td>4 - 2</td><td><strong>Grado 6°A 🏆</strong></td></tr>
                <tr><td>Grado 7°A vs Grado 7°B</td><td>3 - 3 (3-2 penales)</td><td><strong>Grado 7°A 🏆</strong></td></tr>
                <tr><td>Grado 8°A vs Grado 8°B</td><td>5 - 1</td><td><strong>Grado 8°A 🏆</strong></td></tr>
                <tr><td>Grado 9°A vs Grado 9°B</td><td>2 - 0</td><td><strong>Grado 9°A 🏆</strong></td></tr>
                <tr><td>Grado 10°A vs Grado 10°B</td><td>1 - 1 (4-2 penales)</td><td><strong>Grado 10°A 🏆</strong></td></tr>
                <tr><td>Grado 11°A vs Grado 11°B</td><td>4 - 3</td><td><strong>Grado 11°A 🏆</strong></td></tr>
              </tbody>
            </table>
          </div>

          {/* Semifinal */}
          <div className="card" style={{ textAlign: 'left' }}>
            <h3>Fase 2: Semifinal</h3>
            <table>
              <thead>
                <tr><th>Encuentro</th><th>Resultado</th><th>Ganador (A la Final)</th></tr>
              </thead>
              <tbody>
                <tr><td>Grado 6°A vs Grado 7°A</td><td>3 - 2</td><td><strong>Grado 6°A 🌟</strong></td></tr>
                <tr><td>Grado 8°A vs Grado 9°A</td><td>4 - 1</td><td><strong>Grado 8°A 🌟</strong></td></tr>
              </tbody>
            </table>
          </div>

          {/* Gran Final */}
          <div className="card" style={{ textAlign: 'center', border: '2px solid #ffcc00' }}>
            <h3 style={{ color: '#ffcc00' }}>👑 GRAN FINAL</h3>
            <p style={{ fontSize: '1.2rem' }}>Grado 6°A <strong>VS</strong> Grado 8°A</p>
            <p>Resultado: <strong>3 - 2</strong></p>
            <h2 style={{ color: '#00ffcc', marginTop: '10px' }}>¡CAMPEÓN: GRADO 6°A! 🥇</h2>
          </div>

          <br />
          <button
            onClick={() => navigateTo('esquema.html')}
            className="btn"
            style={{ backgroundColor: '#333', color: 'white' }}
          >
            ← VOLVER A ESQUEMAS
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
