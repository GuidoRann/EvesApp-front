import { useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Check } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface DateOfBirthPickerProps {
  value?: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  // Año mínimo seleccionable. Por defecto: hace 50 años.
  minYear?: number;
  // Año máximo seleccionable. Por defecto: año actual.
  maxYear?: number;
}

const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const DIAS = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function DateOfBirthPicker({
  value,
  onChange,
  placeholder = "Selecciona una fecha",
  minYear,
  maxYear,
}: DateOfBirthPickerProps) {
  const today = new Date();
  const resolvedMaxYear = maxYear ?? today.getFullYear();
  const resolvedMinYear = minYear ?? today.getFullYear() - 50;

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"days" | "years">("days");
  
  // Mes/año que se está visualizando en el calendario
  const [viewDate, setViewDate] = useState<Date>(value ?? new Date(resolvedMaxYear, today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const years = useMemo(() => {
    const arr: number[] = [];
    for (let y = resolvedMaxYear; y >= resolvedMinYear; y--) arr.push(y);
    return arr;
  }, [resolvedMaxYear, resolvedMinYear]);

  const grid = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }, [year, month]);

  const goToPrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const handleSelectDay = (day: number) => {
    const selected = new Date(year, month, day);
    onChange(selected);
    // setOpen(false);
  };

  const handleSelectYear = (y: number) => {
    setViewDate(new Date(y, month, 1));
    setMode("days");
  };

  const formatted = value
    ? `${value.getDate()} de ${MESES[value.getMonth()]} de ${value.getFullYear()}`
    : null;

  const isNextDisabled =
    year === resolvedMaxYear && month >= today.getMonth() && year === today.getFullYear();

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-3 rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-3.5 text-left transition-colors hover:bg-purple-900/30 focus:border-purple-400 focus:outline-none"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600/30">
          <CalendarDays className="h-5 w-5 text-purple-300" />
        </div>
        <span className={formatted ? "text-white" : "text-purple-300/50"}>
          {formatted ?? placeholder}
        </span>
      </button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="mx-auto max-w-md border-purple-500/30 bg-[#110a24]">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-white">Fecha de nacimiento</DrawerTitle>
            <DrawerDescription className="text-purple-200/60">
              {mode === "days"
                ? "Selecciona el día"
                : "Selecciona el año"}
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-2 overflow-hidden">
            {/* Barra de navegación mes/año */}
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={goToPrevMonth}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-purple-200 transition-colors hover:bg-white/10"
                aria-label="Mes anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => setMode(mode === "years" ? "days" : "years")}
                className="rounded-lg px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
              >
                {MESES[month]} {year}
              </button>

              <button
                type="button"
                onClick={goToNextMonth}
                disabled={isNextDisabled}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-purple-200 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Mes siguiente"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {mode === "days" ? (
              <>
                {/* Encabezado de días */}
                <div className="mb-2 grid grid-cols-7 gap-1">
                  {DIAS.map((d) => (
                    <div
                      key={d}
                      className="flex h-8 items-center justify-center text-xs font-medium text-purple-300/50"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Grilla de días */}
                <div className="grid grid-cols-7 gap-1 pb-4">
                  {grid.map((day, idx) => {
                    if (day === null) return <div key={`empty-${idx}`} />;
                    const cellDate = new Date(year, month, day);
                    const selected = value ? isSameDay(cellDate, value) : false;
                    const isToday = isSameDay(cellDate, today);
                    const isFuture = cellDate > today;
                    return (
                      <button
                        key={day}
                        type="button"
                        disabled={isFuture}
                        onClick={() => handleSelectDay(day)}
                        className={[
                          "flex h-10 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                          selected
                            ? "bg-purple-500 text-white"
                            : isToday
                              ? "bg-white/5 text-emerald-400"
                              : "text-purple-100 hover:bg-white/10",
                          isFuture ? "cursor-not-allowed opacity-25 hover:bg-transparent" : "",
                        ].join(" ")}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              /* Selector de año */
              <div className="grid max-h-70 grid-cols-4 gap-2 overflow-y-auto pb-4 scrollbar-hide">
                {years.map((y) => {
                  const selected = y === year;
                  return (
                    <button
                      key={y}
                      type="button"
                      onClick={() => handleSelectYear(y)}
                      className={[
                        "flex items-center justify-center rounded-lg py-2.5 text-sm font-medium transition-colors",
                        selected
                          ? "bg-purple-500 text-white"
                          : "bg-purple-900/20 text-purple-100 hover:bg-white/10",
                      ].join(" ")}
                    >
                      {y}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer con fecha seleccionada */}
          <div className="border-t border-purple-500/20 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-emerald-400" />
              <span className="text-purple-200/70">
                {formatted ?? "Ninguna fecha seleccionada"}
              </span>
            </div>
            <Button
              onClick={() => setOpen(false)}
              className="h-11 w-full bg-purple-500 font-semibold text-white hover:bg-purple-600"
            >
              Confirmar
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}