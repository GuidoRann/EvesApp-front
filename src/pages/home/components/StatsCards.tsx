import { Users, ClipboardList } from "lucide-react"

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-3 px-5">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary via-primary to-[oklch(0.50_0.18_310)] p-4 text-primary-foreground shadow-lg shadow-primary/20">
        <div className="relative z-10">
          <span className="inline-block rounded-full bg-primary-foreground/20 px-3 py-0.5 text-[11px] font-medium backdrop-blur-sm">
            Estudiantes
          </span>
          <p className="mt-2 text-3xl font-bold">32</p>
        </div>
        <div className="absolute -bottom-2 -right-2 opacity-20">
          <Users className="size-16" />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="relative z-10">
          <span className="inline-block rounded-full bg-secondary px-3 py-0.5 text-[11px] font-medium text-secondary-foreground">
            Pendientes
          </span>
          <p className="mt-2 text-3xl font-bold text-foreground">12</p>
        </div>
        <div className="absolute -bottom-2 -right-2 opacity-10">
          <ClipboardList className="size-16 text-primary" />
        </div>
      </div>
    </div>
  )
}
