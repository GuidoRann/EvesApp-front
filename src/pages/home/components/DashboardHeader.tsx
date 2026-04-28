import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { supabase } from '@/lib/supabaseClient';
import { useMaestraStore } from '@/stores/Maestra.store';
import { LogOut } from 'lucide-react';

// Obtener la fecha actual
const today = new Date();

const timeOprions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  timeZone: 'America/Argentina/Buenos_Aires'
};

const formatter = new Intl.DateTimeFormat('es-AR', timeOprions);
let formatterDate = formatter.format( today );
formatterDate = formatterDate.charAt( 0 ).toUpperCase() + formatterDate.slice( 1 );

// Funcion para cerrar sesion en supabase y el listener borra el store
const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();

  if ( error ) {
    console.error( error.message );
    return;
  }
  alert("Sesion Cerrada")
}

export function DashboardHeader() {
  const maestra = useMaestraStore( ( state ) => state.maestra );

  const { nombre = "nombre", apellido = "apellido" } = maestra ?? {};

  return (
    <div className="flex flex-col justify-between px-5 pt-26 pb-2">
      <div className="flex items-center gap-3">
        <Avatar className="size-13 ring-4 ring-primary/30">
          <AvatarImage src={ maestra?.avatar_url } alt={ nombre } />
          <AvatarFallback className="bg-primary text-primary-foreground text-md font-semibold">
            { nombre.split( "" )[ 0 ] + apellido.split( "" )[ 0 ] }
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-lg font-bold text-foreground">
            Hola, { nombre }!
          </h1>
          <p className="text-xs text-muted-foreground">{ formatterDate }</p>
        </div>
        <button 
          className="ml-auto relative w-6 h-6 rounded-full cursor-pointer text-gray-500 hover:text-red-600 transition-all duration-75"
          onClick={ () => handleLogout() }>
            <LogOut />
        </button>
      </div>
    </div>
  )
}
