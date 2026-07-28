import type { GradoDTO } from './GradoTypes';

export interface AlumnoType {
  alumnoId: string
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  numeroDocumento: string
  direccion: string
  barrio: string
  fechaNacimiento: Date
  grado: GradoDTO
}

export interface CreateAlumnoDTO {
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  numeroDocumento: string
  direccion: string
  barrio: string
  fechaNacimiento: Date
  grado: GradoDTO
}

// export interface AlumnoDetailType extends AlumnoType {
//   familiares: AlumnoFamiliarType[];
//   asistencias: AsistenciaType[];
//   notas: NotaType[];
// }