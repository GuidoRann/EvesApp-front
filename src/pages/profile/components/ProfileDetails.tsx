import { School, BookOpen, GraduationCap, MapPin } from 'lucide-react'

interface DetailRowProps {
  icon: React.ReactNode
  label: string
  value: string
  isLast?: boolean
}

function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1f1540]">
      <div className="text-[#8b5cf6]">{icon}</div>
      <div className="flex items-baseline gap-2">
        <span className="font-semibold text-white">{label}</span>
        <span className="text-[#8a7faa]">{value}</span>
      </div>
    </div>
  )
}

export function ProfileDetails() {
  return (
    <div className="mt-6 mx-4 rounded-2xl bg-[#1a1035] overflow-hidden">
      <DetailRow
        icon={<School className="h-5 w-5" />}
        label="Escuela:"
        value="Escuela Benito Ju\u00e1rez"
      />
      <DetailRow
        icon={<BookOpen className="h-5 w-5" />}
        label="Grado:"
        value="3\u00b0 de Primaria"
      />
      <DetailRow
        icon={<GraduationCap className="h-5 w-5" />}
        label="Experiencia:"
        value="8 a\u00f1os de experiencia"
      />
      <div className="flex items-center gap-3 px-5 py-4">
        <div className="text-[#8b5cf6]">
          <MapPin className="h-5 w-5" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-white">{'Ubicaci\u00f3n:'}</span>
          <span className="text-[#8a7faa]">Monterrey, NL</span>
        </div>
      </div>
    </div>
  )
}
