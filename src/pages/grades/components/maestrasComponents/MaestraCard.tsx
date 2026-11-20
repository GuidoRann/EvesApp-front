import type { MaestraType } from '@/types/MaestraTypes';

export interface MaestraCardProps {
  maestra: MaestraType;
  onClick?: () => void;
  alreadyJoined?: boolean;
}

export default function MaestraCard( { maestra, onClick, alreadyJoined }: MaestraCardProps ) {
  return (
    <button
      onClick={ onClick }
      disabled={ alreadyJoined }
      className={`w-full flex flex-col bg-[#1a1025] hover:bg-[#201328] active:scale-[0.98] border border-purple-500/10 rounded-2xl transition-all duration-200 overflow-hidden ${
        alreadyJoined ? "cursor-not-allowed border-gray-600 bg-gray-800/50 opacity-70" : ""
      }`}>
      <div className='px-4 py-2 flex gap-2'>
        {/* Info de la maestra */}
        <div className='flex-1 flex flex-col items-start text-left min-w-0 py-1'>
          <span className='text-white font-semibold truncate w-full text-left'>{maestra.nombre} {maestra.apellido}</span>
          
          <div className='flex items-center gap-3 mt-0.5'>
            <div className='flex items-center gap-1 text-purple-200/50 text-xs'>
              <span className='truncate'>{ maestra.email }</span>
            </div>
          </div>
        
        </div>
      </div>
      { alreadyJoined && <span className='text-gray-400/70 text-s font-medium'>Ya pertenece a este grado</span>}
    </button>
  )
}
