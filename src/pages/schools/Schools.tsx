import { BottomNav } from '@/components/BottomNav';
import SchoolCard from './components/SchoolCard';
import SchoolsHeader from './components/SchoolsHeader';

const schools = [
  {
    name: "Escuela Primaria Benito Juárez",
    location: "Col. Centro, CDMX",
    gradesCount: 4,
  },
  {
    name: "Colegio Montessori",
    location: "Col. Roma, CDMX",
    gradesCount: 2,
  },
  {
    name: "Instituto Educativo del Valle",
    location: "Col. Del Valle, CDMX",
    gradesCount: 1,
  },
  {
    name: "Escuela Secundaria No. 45",
    location: "Col. Narvarte, CDMX",
    gradesCount: 3,
  },
];

export default function SchoolsPage() {
  const handleCreateClick = () => {
    console.log("Crear escuela");
  };

  const handleJoinClick = () => {
    console.log("Unirse a escuela");
  };

  return (
    <div className="mx-auto flex h-dvh bg-background max-w-md flex-col">
      <SchoolsHeader onCreateClick={ handleCreateClick } onJoinClick={ handleJoinClick } />
      <main className="flex-1 overflow-y-auto px-4 scrollbar-hide">
        {/* Stats summary - single amber color */}
        <div className="flex gap-3 py-5">
          <div className="flex-1 bg-[#1a1025] border border-purple-500/10 rounded-xl p-3 text-center">
            <span className="text-2xl font-bold text-amber-400">{schools.length}</span>
            <p className="text-purple-200/50 text-xs mt-0.5">Mis Escuelas</p>
          </div>
          <div className="flex-1 bg-[#1a1025] border border-purple-500/10 rounded-xl p-3 text-center">
            <span className="text-2xl font-bold text-white">
              {schools.reduce((acc, s) => acc + (s.gradesCount || 0), 0)}
            </span>
            <p className="text-purple-200/50 text-xs mt-0.5">Grados</p>
          </div>
        </div>

        {/* Schools list */}
        <div className="flex flex-col gap-3 pb-24">
          {schools.map((school, index) => (
            <SchoolCard 
              key={index} 
              {...school} 
              onClick={() => console.log("Ver escuela:", school.name)}
            />
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
