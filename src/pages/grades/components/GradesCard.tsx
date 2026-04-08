import type { GradeItem } from '@/pages/grades/types/GradesTypes';
import { ChevronRight } from "lucide-react"
import { Link } from 'react-router-dom';

export default function GradesCard( { grade, letter, shift, teacher }: GradeItem ) {
  return (
    <Link
      type="button"
      className="flex w-full items-center gap-3 rounded-xl border border-border bg-card p-3.5 transition-colors hover:bg-secondary"
      to="/details"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
        <span className="text-sm font-bold leading-none">
          { grade } { letter }
        </span>
      </div>
      <div className="flex-1 text-left">
        <p className="text-sm font-semibold text-card-foreground">{ shift }</p>
        <p className="text-xs text-muted-foreground">{ teacher }</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </Link>
  )
}
