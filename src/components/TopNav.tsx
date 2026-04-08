import { ArrowLeft, Settings } from 'lucide-react'
import { Link } from 'react-router-dom';

export default function TopNav() {
  return (
    <div className="flex items-center justify-between px-5 pt-8 relative z-10">
        <Link 
          className="text-white/90 hover:text-white transition-colors" 
          aria-label="Volver"
          to="/profile">
          <ArrowLeft className="h-7 w-7" strokeWidth={ 2.5 } />
        </Link>
        <Link to="/config" className="text-white/90 hover:text-white transition-colors" aria-label="Configuracion">
          <Settings className="h-7 w-7" />
        </Link>
     </div>
  )
}
