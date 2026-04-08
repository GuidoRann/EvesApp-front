import TopNav from '@/components/TopNav';
import { BottomNav } from '../../components/BottomNav';
import { DashboardHeader } from './components/DashboardHeader';
import { Reminders } from './components/Reminders';
import { StatsCards } from './components/StatsCards';

export default function Home() {
  return (
    <div className='min-h-screen bg-background max-w-md mx-auto relative flex flex-col gap-5'>
      <div className='h-48 relative overflow-hidden bg-linear-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24]'>
        {/* Subtle sparkles */}
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
