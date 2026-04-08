import { CheckCircle2, Pencil } from 'lucide-react'

interface ProfileInfoProps {
  nombre: string
  apellido: string
  onEditClick: () => void
}

export function ProfileInfo( { nombre, apellido, onEditClick }: ProfileInfoProps ) {
  return (
    <div className="flex flex-col items-center px-6 pt-4 pb-2">
      {/* Name with verified badge */}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-white">
          {nombre} {apellido}
        </h1>
        <CheckCircle2 className="h-6 w-6 text-emerald-500 fill-emerald-500" />
      </div>

      {/* Role */}
      <p className="text-[#8a7faa] text-base mt-1">Maestra de Primaria</p>

      {/* Edit profile button */}
      <button
        onClick={onEditClick}
        className="mt-5 w-full max-w-xs flex items-center justify-center gap-2 rounded-full bg-[#7c3aed] hover:bg-[#6d28d9] active:bg-[#5b21b6] text-white font-semibold py-3.5 px-6 transition-colors shadow-lg shadow-purple-900/30"
      >
        <Pencil className="h-5 w-5" />
        <span>Editar Perfil</span>
      </button>
    </div>
  )
}
