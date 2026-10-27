import React, { createContext, useContext, useState, useEffect } from 'react';
import { Sport, Equipo, Partido, SportKey, MatchStatus } from '../types';
import { DEPORTES_DATA, LUGARES_DISPONIBLES, INITIAL_EQUIPOS, INITIAL_PARTIDOS } from '../data/initialData';

interface TournamentContextType {
  deportes: Sport[];
  lugares: string[];
  equipos: Equipo[];
  partidos: Partido[];
  agregarEquipo: (nombre: string, deporte_id: SportKey) => boolean;
  eliminarEquipo: (id: string) => void;
  programarPartido: (partido: Omit<Partido, 'id'>) => { ok: boolean; mensaje?: string };
  actualizarMarcador: (
    id: string,
    marcador_local: string,
    marcador_visitante: string,
    estado: MatchStatus,
    ganador?: string
  ) => void;
  eliminarPartido: (id: string) => void;
  restablecerDatos: () => void;
}

const STORAGE_EQUIPOS_KEY = 'intercursos_chinca_equipos_v2';
const STORAGE_PARTIDOS_KEY = 'intercursos_chinca_partidos_v2';

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

export const TournamentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deportes = DEPORTES_DATA;
  const lugares = LUGARES_DISPONIBLES;

  const [equipos, setEquipos] = useState<Equipo[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_EQUIPOS_KEY);
      return stored ? JSON.parse(stored) : INITIAL_EQUIPOS;
    } catch {
      return INITIAL_EQUIPOS;
    }
  });

  const [partidos, setPartidos] = useState<Partido[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_PARTIDOS_KEY);
      return stored ? JSON.parse(stored) : INITIAL_PARTIDOS;
    } catch {
      return INITIAL_PARTIDOS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_EQUIPOS_KEY, JSON.stringify(equipos));
  }, [equipos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PARTIDOS_KEY, JSON.stringify(partidos));
  }, [partidos]);

  const agregarEquipo = (nombre: string, deporte_id: SportKey): boolean => {
    const trimmed = nombre.trim();
    if (!trimmed) return false;
    const existe = equipos.some(
      (e) => e.deporte_id === deporte_id && e.nombre.toLowerCase() === trimmed.toLowerCase()
    );
    if (existe) return false;

    const nuevo: Equipo = {
      id: `eq-${Date.now()}`,
      nombre: trimmed,
      deporte_id,
    };
    setEquipos((prev) => [nuevo, ...prev]);
    return true;
  };

  const eliminarEquipo = (id: string) => {
    setEquipos((prev) => prev.filter((e) => e.id !== id));
  };

  const programarPartido = (
    nuevo: Omit<Partido, 'id'>
  ): { ok: boolean; mensaje?: string } => {
    // Validación estricta de canchas y horarios (como se pide en el proyecto!)
    const conflicto = partidos.find((p) => {
      // Si están en la misma cancha y fecha_hora exacta
      if (p.lugar === nuevo.lugar && p.fecha_hora === nuevo.fecha_hora) {
        return true;
      }
      return false;
    });

    if (conflicto) {
      return {
        ok: false,
        mensaje: `⚠️ Conflicto detectado: La cancha "${nuevo.lugar}" ya tiene programado el partido "${conflicto.equipo_local} vs ${conflicto.equipo_visitante}" en el horario ${nuevo.fecha_hora}. Elige otro horario o escenario.`,
      };
    }

    const partidoCreado: Partido = {
      ...nuevo,
      id: `part-${Date.now()}`,
    };
    setPartidos((prev) => [partidoCreado, ...prev]);
    return { ok: true };
  };

  const actualizarMarcador = (
    id: string,
    marcador_local: string,
    marcador_visitante: string,
    estado: MatchStatus,
    ganador?: string
  ) => {
    setPartidos((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        let winner = ganador;
        if (!winner && marcador_local !== '' && marcador_visitante !== '') {
          const numL = parseInt(marcador_local);
          const numV = parseInt(marcador_visitante);
          if (!isNaN(numL) && !isNaN(numV)) {
            if (numL > numV) winner = p.equipo_local;
            else if (numV > numL) winner = p.equipo_visitante;
            else winner = 'Empate';
          }
        }
        return {
          ...p,
          marcador_local,
          marcador_visitante,
          estado,
          ganador: winner,
        };
      })
    );
  };

  const eliminarPartido = (id: string) => {
    setPartidos((prev) => prev.filter((p) => p.id !== id));
  };

  const restablecerDatos = () => {
    setEquipos(INITIAL_EQUIPOS);
    setPartidos(INITIAL_PARTIDOS);
    localStorage.removeItem(STORAGE_EQUIPOS_KEY);
    localStorage.removeItem(STORAGE_PARTIDOS_KEY);
  };

  return (
    <TournamentContext.Provider
      value={{
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
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};

export const useTournament = () => {
  const ctx = useContext(TournamentContext);
  if (!ctx) throw new Error('useTournament must be used within TournamentProvider');
  return ctx;
};
