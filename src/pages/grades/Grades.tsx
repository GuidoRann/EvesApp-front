import { BottomNav } from '@/components/BottomNav';
import { useState } from "react";
import CreateGradoForm from './components/CreateGradoForm';
import GradeDetailView, { type GradeDetailData } from './components/GradeDetailView';
import GradeCard from './components/GradesCard';
import GradesHeader from './components/GradesHeader';

const gradesData: GradeDetailData[] = [
  {
    id: "1",
    numero: 4,
    letra: "A",
    turno: "mañana",
    divisionAnual: "bimestre",
    escuela: { id: "1", nombre: "Escuela Primaria Benito Juárez" },
    maestraTitular: { id: "1", nombre: "Maria Gonzalez", email: "maria@escuela.com" },
    maestrasAdicionales: [],
    alumnos: [
      { id: "1", nombre: "Juan", apellidoPaterno: "Perez", apellidoMaterno: "Lopez" },
      { id: "2", nombre: "Ana", apellidoPaterno: "Martinez", apellidoMaterno: "Garcia" },
    ],
  },
  {
    id: "2",
    numero: 3,
    letra: "B",
    turno: "tarde",
    divisionAnual: "trimestre",
    escuela: { id: "1", nombre: "Escuela Primaria Benito Juárez" },
    maestraTitular: { id: "2", nombre: "Ana Lopez", email: "ana@escuela.com" },
    maestrasAdicionales: [
      { id: "3", nombre: "Carmen Hernandez", email: "carmen@escuela.com" },
    ],
    alumnos: [],
  },
  {
    id: "3",
    numero: 5,
    letra: "C",
    turno: "mañana",
    divisionAnual: "bimestre",
    escuela: { id: "2", nombre: "Colegio Montessori" },
    maestraTitular: { id: "4", nombre: "Laura Martinez", email: "laura@escuela.com" },
    maestrasAdicionales: [],
    alumnos: [],
  },
  {
    id: "4",
    numero: 6,
    letra: "A",
    turno: "tarde",
    divisionAnual: "trimestre",
    escuela: { id: "3", nombre: "Instituto Educativo del Valle" },
    maestraTitular: { id: "5", nombre: "Sofia Rodriguez", email: "sofia@escuela.com" },
    maestrasAdicionales: [],
    alumnos: [],
  },
];

type ViewState = "list" | "detail" | "create";

export default function Grades() {
  const [grades, setGrades] = useState<GradeDetailData[]>(gradesData);
  const [currentView, setCurrentView] = useState<ViewState>("list");
  const [selectedGrade, setSelectedGrade] = useState<GradeDetailData | null>(null);

  const handleCreateClick = () => {
    setCurrentView("create");
  };

  const handleJoinClick = () => {
    console.log("Unirse a grado");
  };

  const handleGradeClick = (grade: GradeDetailData) => {
    setSelectedGrade(grade);
    setCurrentView("detail");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedGrade(null);
  };

  const handleUpdateGrade = (updatedGrade: GradeDetailData) => {
    setGrades((prev) =>
      prev.map((g) => (g.id === updatedGrade.id ? updatedGrade : g))
    );
    setSelectedGrade(updatedGrade);
  };

  const totalStudents = grades.reduce((acc, g) => acc + g.alumnos.length, 0);

  // Create view
  if (currentView === "create") {
    return (
      <CreateGradoForm
        onBack={handleBackToList}
        onSubmit={(data: any) => {
          console.log("Grado creado:", data);
          handleBackToList();
        }}
      />
    );
  }

  // Detail view
  if (currentView === "detail" && selectedGrade) {
    return (
      <GradeDetailView
        grade={selectedGrade}
        onBack={handleBackToList}
        onUpdate={handleUpdateGrade}
      />
    );
  }

  return (
    <div className='mx-auto flex h-dvh bg-background max-w-md flex-col'>
      <GradesHeader onCreateClick={handleCreateClick} onJoinClick={handleJoinClick} />
      <main className="flex-1 overflow-y-auto px-4 scrollbar-hide">

        {/* Cantidad de grados y cantidad de alumnos */}
        <div className="flex gap-3 py-5">
          <div className="flex-1 bg-[#1a1025] border border-purple-500/10 rounded-xl p-3 text-center">
            <span className="text-2xl font-bold text-emerald-400">{grades.length}</span>
            <p className="text-purple-200/50 text-xs mt-0.5">Grados</p>
          </div>
          <div className="flex-1 bg-[#1a1025] border border-purple-500/10 rounded-xl p-3 text-center">
            <span className="text-2xl font-bold text-white">{totalStudents}</span>
            <p className="text-purple-200/50 text-xs mt-0.5">Alumnos</p>
          </div>
        </div>

        {/* Grades list */}
        <div className="flex flex-col gap-3 pb-24">
          { grades.map((grade) => (
            <GradeCard
              key={grade.id}
              numero={grade.numero}
              letra={grade.letra}
              turno={grade.turno}
              nombreEscuela={grade.escuela.nombre}
              cantidadEstudiantes={grade.alumnos.length}
              onClick={() => handleGradeClick(grade)}
            />
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
