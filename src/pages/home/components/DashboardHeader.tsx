import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useState } from 'react';

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
  const [ teacherName, setTeacherName ] = useState("Evelyn")

  return (
    <div className="flex items-center justify-between px-5 pt-12 pb-2">
      <div className="flex items-center gap-3">
        <Avatar className="size-13 ring-4 ring-primary/30">
          <AvatarImage src="/public/photo.jpg" alt="Evelyn" />
          <AvatarFallback className="bg-primary text-primary-foreground text-md font-semibold">
            EM
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-lg font-bold text-foreground">
            Hola, { teacherName }!
          </h1>
          <p className="text-xs text-muted-foreground">{ formatterDate }</p>
        </div>
      </div>
    </div>
  )
}
