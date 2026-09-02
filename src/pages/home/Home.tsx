import { useEscuelaStore } from '@/stores/Escuela.store';
import { BottomNav } from '../../components/BottomNav';
import { useManagementEscuelas } from '../schools/hooks/useManagementEscuela';
import { DashboardHeader } from './components/DashboardHeader';
import { Reminders } from './components/Reminders';
import { StatsCards } from './components/StatsCards';
import { useEffect } from 'react';

export default function Home() {
  const { listarEscuelas } = useManagementEscuelas();
  const { setListaDeEscuelas } = useEscuelaStore();

  useEffect(() => {
    const fetchEscuelas = async () => {
      const escuelas = await listarEscuelas();

      setListaDeEscuelas(escuelas);
    };

    fetchEscuelas();
  }, []);

  return (
    <div className='min-h-screen bg-background max-w-md mx-auto relative flex flex-col gap-5'>
      <div className='h-46 relative overflow-hidden bg-linear-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24]'>
        {/* Estrellas fondo*/}
        <div className='absolute inset-0 opacity-30'>
          <div className='absolute top-6 left-[20%] h-1 w-1 rounded-full bg-white' />
          <div className='absolute top-10 right-[30%] h-0.5 w-0.5 rounded-full bg-white' />
          <div className='absolute top-16 left-[60%] h-1 w-1 rounded-full bg-white' />
          <div className='absolute top-8 right-[15%] h-0.5 w-0.5 rounded-full bg-white' />
          <div className='absolute top-20 left-[40%] h-0.5 w-0.5 rounded-full bg-white' />
          <div className='absolute top-14 left-[10%] h-1 w-1 rounded-full bg-purple-300' />
          <div className='absolute top-4 right-[40%] h-0.5 w-0.5 rounded-full bg-purple-200' />
        </div>
        <DashboardHeader />
        
      </div>
      <div className="-mt-8 relative z-10">
            <StatsCards />
      </div>
      <Reminders />
      <BottomNav />
    </div>
  );
}
