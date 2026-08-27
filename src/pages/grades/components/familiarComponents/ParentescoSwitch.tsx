import { Check } from "lucide-react";

const parentescos = ["Madre", "Padre", "Abuela", "Abuelo", "Tutor"] as const;

interface ParentescoSwitchProps {
  value: string;
  onChange: ( value: string ) => void;
}

export default function ParentescoSwitch({ value, onChange }: ParentescoSwitchProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-purple-200/70">Parentesco</span>
      </div>

      <div role="radiogroup" aria-label="Seleccionar parentesco" className="grid grid-cols-2 gap-2 rounded-xl border border-purple-500/20 bg-purple-950/30 p-2">
        {parentescos.map(( parentesco ) => {
          const selected = value === parentesco;
          return (
            <button key={ parentesco } type="button" role="radio" aria-checked={ selected } onClick={() => onChange( parentesco )} className={`flex min-h-11 items-center justify-between rounded-lg px-3 text-sm font-medium transition-all ${selected ? "bg-emerald-500 text-[#101322] shadow-lg shadow-emerald-500/15" : "bg-white/4 text-purple-100/70 hover:bg-white/8 hover:text-white"}`}>
              { parentesco } 
              { selected && <Check className="h-4 w-4" aria-hidden="true" /> }
            </button>
          );
        })}
      </div>

      <p className="text-xs text-purple-200/40">Selecciona el vínculo con el alumno</p>
    </div>
  );
}

export { parentescos };
export type Parentesco = ( typeof parentescos )[ number ];
