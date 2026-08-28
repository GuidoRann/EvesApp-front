import type { AlumnoFamiliarType } from './AlumnoFamiliarTypes';
import type { AsistenciaType } from './AsistenciaTypes';
import type { GradoType } from './GradoTypes';
import type { NotaType } from './NotaTypes';

export interface AlumnoType {
  alumnoId: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  numeroDocumento: string;
  direccion: string;
  barrio: string;
  familiares: AlumnoFamiliarType[];
  fechaNacimiento: Date;
  grado: GradoType;
}

export interface CreateAlumnoDTO {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  numeroDocumento: string;
  direccion: string;
  barrio: string;
  fechaNacimiento: Date;
  grado: GradoType;
}

export interface AlumnoDetailType extends AlumnoType {
    familiares: AlumnoFamiliarType[];
    asistencias: AsistenciaType[];
    notas: NotaType[];
    promediosTrimestrales: string[]; // Ej: ["85.5", "78.2", "90.1"]
    promedioFinal: number; // Una nota por trimestre y una final RECOMENDADA
}