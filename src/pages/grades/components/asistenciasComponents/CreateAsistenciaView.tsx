import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, ClipboardCheck, Loader2 } from "lucide-react";
import { useParams, useNavigate } from 'react-router-dom';
import { useGradoStore } from '@/stores/Grado.store';
import type { AlumnoType } from '@/types/AlumnoTypes';
import { useManagementAsistencias } from '../../hooks/useManagementAsistencias';
import type { CreateAsistenciaDTO } from '@/types/AsistenciaTypes';
import { toast } from 'sonner';

type AttendanceRecord = AlumnoType & {
 asistio: boolean
}

export default function CreateAsistenciaView() {
  const [ isCreating, setIsCreating ] = useState( false );

  const { grado } = useGradoStore();
  if( !grado ) return null
  const alumnos = grado.listaAlumnos ?? [];

  const { crearAsistencias, obtenerAsistenciasPorFecha } = useManagementAsistencias();
  
  const [ attendance, setAttendance ] = useState<Record<string, boolean>>({})
  const [ saved, setSaved ] = useState( false )

  useEffect(() => {
    const fetchAttendance = async () => {
      if( !grado ) return;
      const asistencias = await obtenerAsistenciasPorFecha( grado.gradoId );
      setAttendance( asistencias );
      console.log("Asistencias obtenidas: ", asistencias);
    };

    console.log("EJECUTANDO EL USEEFFECT");
    fetchAttendance();
  }, [ grado ]);

  const attendanceArray = useMemo<AttendanceRecord[]>(
    () =>
      alumnos.map((student) => ({
        ...student,
        asistio: attendance[student.alumnoId] ?? false,
      })),
    [attendance],
  )

  const alumnosAsistencia = attendanceArray.map(({ alumnoId, asistio }) => ({
    alumnoId,
    asistio
  }));

  function toggleAttendance( alumnoId: string ) {
    setSaved(false)
    setAttendance((current) => ({
      ...current,
      [alumnoId]: !(current[alumnoId] ?? false),
    }))
  }

  const attendedCount = attendanceArray.filter((student) => student.asistio).length
  
  const { gradoId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (  ) => {
    setIsCreating(true);

    try {
      const listaAsistencia: CreateAsistenciaDTO = {
        fecha: new Date(),
        alumnos: alumnosAsistencia
      };
  
      await crearAsistencias( listaAsistencia );

      //TODO: Arreglar el problema de que crea asistencias repetidas el mismo dia para el mismo alumno en lugar de actualizarla
  
      toast.success( 'Asistencia creada exitosamente!' );
    } catch ( error ) {
      console.log("Error al crear asistencia:", error);
      toast.error("No se pudo crear la asistencia");
    } finally {
      setIsCreating( false );
    }
  };
  
  return (
    <div className='mx-auto flex min-h-dvh flex-col max-w-md bg-background'>
      {/* Header */}
      <div className='relative overflow-hidden bg-linear-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24] pb-6 pt-4'>
        {/* Sparkles */}
        <div className='absolute inset-0 opacity-30'>
          <div className='absolute left-[20%] top-6 h-1 w-1 animate-pulse rounded-full bg-white' />
          <div className='absolute right-[30%] top-10 h-0.5 w-0.5 animate-pulse rounded-full bg-white' />
          <div className='absolute left-[60%] top-16 h-1 w-1 animate-pulse rounded-full bg-white' />
          <div className='absolute right-[15%] top-8 h-0.5 w-0.5 animate-pulse rounded-full bg-white' />
          <div className='absolute left-[10%] top-14 h-1 w-1 animate-pulse rounded-full bg-purple-300' />
        </div>

        <div className='relative px-4'>
            <div className='flex items-center gap-4'>
              <button
                onClick={() => navigate(`/grades/details/${gradoId}`)}
                className='flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors'>
                <ArrowLeft className='h-5 w-5 text-white' />
              </button>
              <div className='flex items-center justify-between'>
                <div>
                  <h1 className='text-2xl font-bold text-white'>Asistencias</h1>
                  <p className='mt-1 text-sm text-purple-200/70'>Asistencias del dia {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          <div className='relative mt-1 py-1 flex items-end justify-between'>
            <div className='flex items-end gap-2'>
              <p className='text-sm text-purple-200/80'>Alumnos presentes</p>
              <p className='text-2xl font-bold'>
                {attendedCount}
                <span className='text-lg text-purple-200/60'>/{alumnos.length}</span>
              </p>
            </div>
            <ClipboardCheck className='h-10 w-10 text-purple-200/70' aria-hidden='true' />
          </div>
        </div>
      </div>

      <div className='flex flex-col flex-1 space-y-6 overflow-y-auto px-4 pt-4 justify-between'>
        <div className='overflow-hidden rounded-2xl border border-purple-400/20 bg-purple-950/30'>
          {attendanceArray.map((student, index) => (
            <label
              key={student.alumnoId}
              className='flex cursor-pointer items-center select-none gap-3 border-b border-purple-300/10 px-4 py-4 last:border-b-0 hover:bg-purple-400/10'>
              <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-600/40 text-sm font-medium text-purple-100'>
                {index + 1}
              </span>
              <span className='min-w-0 flex-1'>
                <span className='block font-semibold'>
                  {student.apellidoPaterno}, {student.nombre}
                </span>
                <span className='mt-0.5 block text-xs text-purple-200/50'>DNI: {student.numeroDocumento}</span>
              </span>
              <input
                type='checkbox'
                checked={student.asistio}
                onChange={() => toggleAttendance(student.alumnoId)}
                className='peer sr-only'
              />
              <span
                aria-hidden='true'
                className='flex h-7 w-7 items-center justify-center rounded-lg border-2 border-purple-300/40 text-transparent transition peer-checked:border-fuchsia-400 peer-checked:bg-fuchsia-500 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-fuchsia-300'>
                <Check className='h-4 w-4' strokeWidth={3} />
              </span>
            </label>
          ))}
        </div>

        <div>
          <button
            type='button'
            onClick={ handleSubmit }
            className='mt-6 w-full rounded-xl bg-fuchsia-500 px-4 py-3.5 font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition hover:bg-fuchsia-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300'>
            { isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creando...
              </>
            ) : (
              "Enviar Asistencias"
            ) }
          </button>

          {/* <details className='mt-6 rounded-xl border border-purple-300/10 bg-black/10 p-3 text-xs text-purple-200/60'>
            <summary className='cursor-pointer font-medium text-purple-200/80'>Ver array que se enviará a la API</summary>
            <pre className='mt-3 overflow-x-auto whitespace-pre-wrap'>
              {JSON.stringify(
                attendanceArray.map(({alumnoId, asistio}) => ({alumnoId, asistio})),
                null,
                2,
              )}
            </pre>
          </details> */}
        </div>
      </div>
    </div>
  );
}
