import { BottomNav } from '../../components/BottomNav';
import GradoSection from './components/GradeSection';
import GradesHeader from './components/GradesHeader';

const holderGrades = [
  {
    grade: "4°",
    letter: "A",
    shift: "Turno Matutino",
    teacher: "Laura González",
  },
  {
    grade: "3°",
    letter: "B",
    shift: "Turno Vespertino",
    teacher: "Laura González",
  },
]

const normalGrades = [
  {
    grade: "5°",
    letter: "C",
    shift: "Turno Matutino",
    teacher: "Apoyo Académico",
  },
  {
    grade: "6°",
    letter: "A",
    shift: "Turno Mixto",
    teacher: "Profra. Adjunta",
  },
  {
    grade: "5°",
    letter: "C",
    shift: "Turno Matutino",
    teacher: "Apoyo Académico",
  },
  {
    grade: "6°",
    letter: "A",
    shift: "Turno Mixto",
    teacher: "Profra. Adjunta",
  }
]

export default function Grades() {
  return (
    <div className='mx-auto flex h-dvh bg-background max-w-md flex-col'>
      <GradesHeader />
      <main className='flex-1 overflow-y-auto px-4 scrollbar-hide'>
        <div className='flex flex-col gap-6 pt-4 h-1/3'>
          <GradoSection title='Grados como maestra titular' grades={ holderGrades } />
        </div>
        <div className='flex flex-col gap-6 pt-4 h-2/3'>
          <GradoSection title='Grados como maestra normal' grades={ normalGrades } />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
