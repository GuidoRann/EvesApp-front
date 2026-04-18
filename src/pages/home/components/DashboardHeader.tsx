import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useMaestraStore } from '@/stores/Maestra.store';

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

export function DashboardHeader() {
  const maestra = useMaestraStore( ( state ) => state.maestra );
  if ( !maestra ) return null;
  const [ nombre, apellido ] = maestra?.nombre.split(" ");

  return (
    <div className="flex items-center justify-between px-5 pt-26 pb-2">
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
      </div>
    </div>
  )
}
