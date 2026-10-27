import { Sport, Equipo, Partido } from '../types';

export const DEPORTES_DATA: Sport[] = [
  {
    id: 'futbol',
    nombre: 'Fútbol',
    icono: '⚽',
    lugar_default: 'Cancha Principal',
  },
  {
    id: 'baloncesto',
    nombre: 'Baloncesto',
    icono: '🏀',
    lugar_default: 'Cancha Cubierta',
  },
  {
    id: 'voleibol',
    nombre: 'Voleibol',
    icono: '🏐',
    lugar_default: 'Coliseo Escolar',
  },
  {
    id: 'atletismo',
    nombre: 'Atletismo',
    icono: '🏃',
    lugar_default: 'Pista Atlética',
  },
  {
    id: 'microfutbol',
    nombre: 'Microfútbol',
    icono: '⚽',
    lugar_default: 'Cancha Múltiple',
  },
];

export const LUGARES_DISPONIBLES = [
  'Cancha Principal',
  'Cancha Cubierta',
  'Coliseo Escolar',
  'Pista Atlética',
  'Cancha Múltiple',
];

// Los 9 equipos exactos que aparecen en la captura image_56dfe06a.png y los atajos rápidos de image_3315483c.png
export const INITIAL_EQUIPOS: Equipo[] = [
  { id: 'eq-1', nombre: '6', deporte_id: 'futbol' },
  { id: 'eq-2', nombre: '7', deporte_id: 'futbol' },
  { id: 'eq-3', nombre: '10', deporte_id: 'futbol' },
  { id: 'eq-4', nombre: '9', deporte_id: 'futbol' },
  { id: 'eq-5', nombre: 'Los carajos', deporte_id: 'futbol' },
  { id: 'eq-6', nombre: 'los ignorantes de 1103', deporte_id: 'futbol' },
  { id: 'eq-7', nombre: 'pepitas', deporte_id: 'futbol' },
  { id: 'eq-8', nombre: 'pepitos', deporte_id: 'futbol' },
  { id: 'eq-9', nombre: 'Grado 8°A', deporte_id: 'futbol' },
];

export const INITIAL_PARTIDOS: Partido[] = [
  {
    id: 'part-1',
    deporte_id: 'futbol',
    equipo_local: '6',
    equipo_visitante: '7',
    lugar: 'Cancha Principal',
    fecha_hora: '2026-10-27 08:00',
    fase: 'Cuartos de Final',
    marcador_local: '2',
    marcador_visitante: '1',
    estado: 'Finalizado',
    ganador: '6',
  },
  {
    id: 'part-2',
    deporte_id: 'futbol',
    equipo_local: 'Los carajos',
    equipo_visitante: 'los ignorantes de 1103',
    lugar: 'Cancha Principal',
    fecha_hora: '2026-10-27 09:30',
    fase: 'Cuartos de Final',
    marcador_local: '3',
    marcador_visitante: '2',
    estado: 'Finalizado',
    ganador: 'Los carajos',
  },
  {
    id: 'part-3',
    deporte_id: 'futbol',
    equipo_local: 'pepitas',
    equipo_visitante: 'pepitos',
    lugar: 'Cancha Principal',
    fecha_hora: '2026-10-28 10:00',
    fase: 'Semifinal',
    marcador_local: '1',
    marcador_visitante: '0',
    estado: 'Finalizado',
    ganador: 'pepitas',
  },
  {
    id: 'part-4',
    deporte_id: 'futbol',
    equipo_local: '10',
    equipo_visitante: '9',
    lugar: 'Cancha Principal',
    fecha_hora: '2026-10-28 11:30',
    fase: 'Semifinal',
    marcador_local: '',
    marcador_visitante: '',
    estado: 'Programado',
  },
  {
    id: 'part-5',
    deporte_id: 'futbol',
    equipo_local: '6',
    equipo_visitante: 'Los carajos',
    lugar: 'Cancha Principal',
    fecha_hora: '2026-10-29 10:00',
    fase: 'Gran Final',
    marcador_local: '',
    marcador_visitante: '',
    estado: 'Programado',
  },
];
