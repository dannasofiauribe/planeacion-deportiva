export type SportKey = 'futbol' | 'baloncesto' | 'voleibol' | 'atletismo' | 'microfutbol';

export type MatchStatus = 'Programado' | 'En Juego' | 'Finalizado';

export interface Sport {
  id: SportKey;
  nombre: string;
  icono: string;
  lugar_default: string;
}

export interface Equipo {
  id: string;
  nombre: string;
  deporte_id: SportKey;
}

export interface Partido {
  id: string;
  deporte_id: SportKey;
  equipo_local: string;
  equipo_visitante: string;
  lugar: string;
  fecha_hora: string;
  fase: string;
  marcador_local: string;
  marcador_visitante: string;
  estado: MatchStatus;
  ganador?: string;
  detalles?: string;
}

export type PageView = 'inicio' | 'admin' | 'visitante';
