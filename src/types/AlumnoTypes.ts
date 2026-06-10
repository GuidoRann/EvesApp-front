export interface AlumnoType {
  alumnoId: string
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  numeroDocumento: string
  direccion: string
  fechaNacimiento: Date
}

export interface CreateAlumnoDTO {
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  numeroDocumento: string
  direccion: string
  fechaNacimiento: Date
}