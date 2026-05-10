export interface AlumnoType {
  alumnoId: string
  nombre: string
  apellido: string
  numeroDocumento: string
  direccion: string
  fechaNacimiento: Date
}

export interface CreateAlumnoDTO {
  nombre: string
  apellido: string
  numeroDocumento: string
  direccion: string
  fechaNacimiento: Date
}