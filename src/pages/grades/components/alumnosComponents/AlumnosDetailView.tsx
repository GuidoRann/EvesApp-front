import { useGradoStore } from '@/stores/Grado.store';
import { ArrowLeft, Calendar, Check, Clock, Plus, School, Search, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CreateFamiliarView from '../familiarComponents/CreateFamiliarView';
import { useManagementAlumnos } from '../../hooks/useManagementAlumnos';
import type { AlumnoType } from '@/types/AlumnoTypes';
import Loading from '@/components/Loading';
import ParentescoSwitch from '../familiarComponents/ParentescoSwitch';
import { Field, FieldGroup } from '@/components/ui/field';

type CurrentView = "list" | "create";

export default function AlumnosDetailView() {
  const [ currentView, setCurrentView ] = useState<CurrentView>( "list" );
  const { alumnoId } = useParams();
  const { grado } = useGradoStore();
  const { obtenerAlumno } = useManagementAlumnos();
  const navigate = useNavigate();

  const [ modo, setModo ] = useState<'opciones' | 'buscar'>('opciones')
  const [ modalAbierto, setModalAbierto ] = useState(false)
  const [ numeroDocumento, setNumeroDocumento ] = useState('')
  const [ buscado, setBuscado ] = useState(false)
  const [ seleccionado, setSeleccionado ] = useState(false)
  const [ parentesco, setParentesco ] = useState('Madre')
  
  const [ alumno, setAlumno ] = useState<AlumnoType | null>(null);
  const [ loading, setLoading ] = useState(true);


  // TODO: Esta funcion tiene que usar la busqueda en DB para traer el buscado
  const handleSearch = async () => {
    if (numeroDocumento.trim()) setBuscado(true);

    
  };
  const handleAdd = () => {
    setModo("opciones");
    setModalAbierto(false);
    setNumeroDocumento("");
    setBuscado(false);
    setSeleccionado(false);
  };

  const handleCreate = () => {
    setCurrentView( "create" );
    setModalAbierto( false );
  }

  useEffect(() => {
    if (!alumnoId) return;

    const fetchAlumno = async () => {
      try {
        setLoading(true);

        const alumnoObtenido = await obtenerAlumno( alumnoId );

        setAlumno( alumnoObtenido.body );
      } catch ( error ) {
        console.error( error );
      } finally {
        setLoading( false );
      }
    };

   fetchAlumno();
  }, [ alumnoId ]);

  if (loading) {
    return <Loading />;
  }

  if ( !alumno ) return null;
  if ( !grado ) return null;

  const formatNumber = ( value: string ) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const formatFecha = (fecha: string) => {
    const [año, mes, dia] = fecha.split("-");

    return `${dia}-${mes}-${año}`;
  };

  const calcularEdad = (fechaNacimiento: string) => {
    const [año, mes, dia] = fechaNacimiento.split("-").map(Number);

    const hoy = new Date();

    let edad = hoy.getFullYear() - año;

    const cumpleañosEsteAño = new Date(
      hoy.getFullYear(),
      mes - 1,
      dia
    );

    if (hoy < cumpleañosEsteAño) {
      edad--;
    }

    return edad;
  };

  const handleSubmit = async () => {
    setCurrentView( "list" );
  }

  if( currentView === "create" ) {
    return (
      <CreateFamiliarView 
        onBack={ () => setCurrentView( "list" ) } 
        onSubmit={ handleSubmit } 
      />
    )
  }

  return (
    <div className='mx-auto flex min-h-dvh max-w-md flex-col bg-background'>
      {/* Header */}
      <div className='relative overflow-hidden bg-linear-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24] pb-6 pt-4'>
        <div className='absolute inset-0 opacity-30'>
          <div className='absolute left-[20%] top-6 h-1 w-1 animate-pulse rounded-full bg-white' />
          <div className='absolute right-[30%] top-10 h-0.5 w-0.5 animate-pulse rounded-full bg-white' />
          <div className='absolute left-[60%] top-16 h-1 w-1 animate-pulse rounded-full bg-white' />
          <div className='absolute right-[15%] top-8 h-0.5 w-0.5 animate-pulse rounded-full bg-white' />
          <div className='absolute left-[10%] top-14 h-1 w-1 animate-pulse rounded-full bg-purple-300' />
        </div>

        <div className='relative px-4'>
          {/* Grade badge */}
          <div className='flex items-center gap-4'>
            <button
              onClick={() => navigate(`/grades/${grado.gradoId}/students`)}
              className='flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors'>
              <ArrowLeft className='h-5 w-5 text-white' />
            </button>
            <div>
              <h1 className='text-2xl font-bold text-white'>
                { alumno.apellidoPaterno } { alumno.nombre }
              </h1>
              <p className='mt-1 text-sm text-purple-200/70'>DNI: {formatNumber(alumno.numeroDocumento)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto px-4 py-6 pb-8'>
        {/* Info cards */}
        <div className='space-y-4'>
          {/* Grado y Division */}
          <div className='grid grid-cols-2 gap-3'>
            <div className='rounded-xl border border-purple-500/20 bg-[#1a1025] p-4'>
              <div className='flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20'>
                  <Clock className='h-5 w-5 text-emerald-400' />
                </div>
                <div>
                  <p className='text-xs text-purple-200/50'>Turno</p>
                  <p className='font-medium capitalize text-white'>{grado.turno}</p>
                </div>
              </div>
            </div>
            <div className='rounded-xl border border-purple-500/20 bg-[#1a1025] p-4'>
              <div className='flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20'>
                  <Calendar className='h-5 w-5 text-emerald-400' />
                </div>
                <div>
                  <p className='text-xs text-purple-200/50'>Grado</p>
                  <p className='font-medium capitalize text-white'>
                    {grado.numero}º {grado.letra}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Direccion */}
          <div className='rounded-xl border border-purple-500/20 bg-[#1a1025] p-4'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/30'>
                <School className='h-5 w-5 text-purple-300' />
              </div>
              <div>
                <p className='text-xs text-purple-200/50'>Dirección</p>
                <p className='font-medium text-white'>{alumno.direccion}</p>
              </div>
            </div>
          </div>

          {/* Fecha de nacimiento */}
          <div className='rounded-xl border border-purple-500/20 bg-[#1a1025] p-4'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/30'>
                <User className='h-5 w-5 text-purple-300' />
              </div>
              <div>
                <p className='text-xs text-purple-200/50'>Fecha de nacimiento</p>
                <p className='font-medium text-white'>{ formatFecha( alumno.fechaNacimiento ) }</p>
              </div>
            </div>
          </div>

          {/* Edad */}
          <div className='rounded-xl border border-purple-500/20 bg-[#1a1025] p-4'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/30'>
                <User className='h-5 w-5 text-purple-300' />
              </div>
              <div>
                <p className='text-xs text-purple-200/50'>Edad</p>
                <p className='font-medium text-white'>{ calcularEdad( alumno.fechaNacimiento) } años</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className='my-6 border-t border-purple-500/20' />

          {/* Action buttons */}
          <div className='flex text-sm font-medium text-purple-200/70 items-center justify-between'>
            <p className='mb-4'>Familiares</p>
            <button
              onClick={() => {
                setModo("opciones");
                setModalAbierto(true);
              }}
              className='flex items-center gap-2 rounded-full bg-purple-600/30 px-4 py-2 hover:bg-purple-600/50 mb-4'>
              Agregar Familiar
            </button>
          </div>

          {/* ---------------------- CODIGO EN REVISION ---------------------- */}
          { modalAbierto && (
            <div
              className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm'
              role='dialog'
              aria-modal='true'
              aria-labelledby='agregar-familiar-title'>
              <div className='w-full max-w-md'>
                { modo === "opciones" && (
                  <div className='space-y-3 rounded-xl border border-purple-500/20 bg-[#1a1025] p-4 shadow-2xl'>
                    <div className='mb-3 flex items-center justify-between'>
                      <p id='agregar-familiar-title' className='text-sm font-semibold text-white'>
                        ¿Cómo querés agregarlo?
                      </p>
                      <button
                        aria-label='Cerrar'
                        onClick={() => setModalAbierto(false)}
                        className='rounded-full p-1 text-purple-200/60 hover:bg-white/10 hover:text-white'>
                        <X className='h-4 w-4' />
                      </button>
                    </div>
                    <button
                      onClick={() => setModo("buscar")}
                      className='flex w-full items-center gap-3 rounded-lg border border-purple-500/20 bg-purple-900/20 p-3 text-left hover:bg-purple-900/40'>
                      <Search className='h-5 w-5 text-purple-300' />
                      <span>
                        <b className='block text-sm text-white'>Buscar familiar existente</b>
                        <small className='text-purple-200/50'>Por número de DNI</small>
                      </span>
                    </button>
                    <button
                      onClick={() => handleCreate()}
                      className='flex w-full items-center gap-3 rounded-lg border border-purple-500/20 bg-purple-900/20 p-3 text-left hover:bg-purple-900/40'>
                      <Plus className='h-5 w-5 text-purple-300' />
                      <span>
                        <b className='block text-sm text-white'>Crear familiar nuevo</b>
                        <small className='text-purple-200/50'>Abrir el creador de Familiar</small>
                      </span>
                    </button>
                  </div>
                )}
                { modo === "buscar" && (
                  <div className='space-y-4 rounded-xl border border-purple-500/20 bg-[#1a1025] p-4'>
                    <button
                      onClick={() => {
                        setModo("opciones");
                        setBuscado(false);
                      }}
                      className='text-sm text-purple-200/70 hover:text-white'>
                      ← Volver a opciones
                    </button>
                    <label className='block text-sm font-semibold text-white'>
                      DNI del familiar
                      <div className='mt-2 flex gap-2'>
                        <div className='relative flex-1'>
                          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-200/50' />
                          <input
                            value={ formatNumber( numeroDocumento ) }
                            onChange={(e) => {
                              setNumeroDocumento( e.target.value.replace(/\D/g, "") );
                              setBuscado(false);
                            }}
                            placeholder='Ingresá el DNI'
                            className='h-11 w-full rounded-lg border border-purple-500/30 bg-purple-950/40 pl-9 pr-3 text-sm text-white outline-none focus:border-purple-400'
                          />
                        </div>
                        <button
                          onClick={ handleSearch }
                          className='rounded-lg bg-purple-600 px-4 text-sm font-semibold text-white hover:bg-purple-500'>
                          Buscar
                        </button>
                      </div>
                    </label>
                    { buscado && (
                      <button
                        onClick={() => setSeleccionado(!seleccionado)}
                        className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left ${ seleccionado ? "border-purple-400 bg-purple-600/20" : "border-purple-500/20 bg-purple-900/20"}`}>
                        <div className='flex h-9 w-9 items-center justify-center rounded-full bg-purple-600/50'>
                          <User className='h-4 w-4 text-white' />
                        </div>
                        <div className='flex-1'>
                          <p className='font-semibold text-white'>Carolina Beatriz Gómez</p>
                          <p className='text-xs text-purple-200/60'>DNI { formatNumber( numeroDocumento ) }</p>
                        </div>
                        { seleccionado && <Check className='h-5 w-5 text-emerald-400' /> }
                      </button>
                    )}
                    { seleccionado && (
                      <div>
                        <FieldGroup>
                          <Field className="flex flex-col gap-1">
                            <ParentescoSwitch
                              value={ parentesco }
                              onChange={ setParentesco }
                            />
                          </Field>
                        </FieldGroup>
                        <button
                          onClick={ handleAdd }
                          className='mt-4 w-full rounded-lg bg-purple-600 py-3 text-sm font-semibold text-white hover:bg-purple-500'>
                          Agregar familiar
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Lista Familiares */}
          <div className='flex flex-col gap-2'>
            { alumno.familiares.map(( relacion ) => (
              <button
                key={ relacion.alumnoFamiliarId }
                type='button'
                // onClick={ () => navigate( `/grades/${ gradoId }/students/${ alumno.alumnoId }` ) }
                className='flex w-full items-center justify-between rounded-xl border border-purple-500/30 bg-purple-900/20 px-4 py-4 text-left transition-colors hover:bg-purple-900/30'>
                <div className='flex w-full justify-between items-center'>
                  <div>
                    <p className='font-bold text-white'>
                      { relacion.familiar.nombre }, { relacion.familiar.apellido }
                    </p>
                  </div>
                  <div className='flex h-10 w-14 items-center justify-center rounded-full bg-purple-600/50'>
                    <span className='text-sm font-medium text-white'>{ relacion.parentesco }</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
