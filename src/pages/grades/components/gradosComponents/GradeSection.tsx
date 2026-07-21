import type { GradeSectionProps } from '@/pages/grades/types/GradesTypes';
import GradesCard from './GradesCard';

export default function GradeSection( { title, grades }: GradeSectionProps ) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="h-5 w-1 rounded-full bg-primary" />
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          { title }
        </h2>
      </div>
      <div className="flex flex-col gap-2.5">
        { grades.map( ( grade, index ) => (
          <GradesCard key={ index } { ...grade } />
        ))}
      </div>
    </section>
  )
}
