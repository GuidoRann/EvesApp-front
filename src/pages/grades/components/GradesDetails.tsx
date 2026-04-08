import { BottomNav } from '@/components/BottomNav';
import TopNav from '@/components/TopNav';

export default function GradesDetails( gradeName: string ) {
  return (
    <div className='mx-auto flex h-dvh bg-background max-w-md flex-col'>
      <div className='h-48 relative overflow-hidden bg-linear-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24]'>
        <div className='absolute inset-0 opacity-30'>
          <div className='absolute top-6 left-[20%] h-1 w-1 rounded-full bg-white' />
          <div className='absolute top-10 right-[30%] h-0.5 w-0.5 rounded-full bg-white' />
          <div className='absolute top-16 left-[60%] h-1 w-1 rounded-full bg-white' />
          <div className='absolute top-8 right-[15%] h-0.5 w-0.5 rounded-full bg-white' />
          <div className='absolute top-20 left-[40%] h-0.5 w-0.5 rounded-full bg-white' />
          <div className='absolute top-14 left-[10%] h-1 w-1 rounded-full bg-purple-300' />
          <div className='absolute top-4 right-[40%] h-0.5 w-0.5 rounded-full bg-purple-200' />
        </div>
        <TopNav />
        <h1 className='text-4xl font-bold text-center pt-8 pb-4'> { gradeName } </h1>
      </div>

      <main className='flex-1 overflow-y-auto px-4 scrollbar-hide'>
        {/* Aca va todo el contenido de los alumnos */}
      </main>
      <BottomNav />
    </div>
  );
}
