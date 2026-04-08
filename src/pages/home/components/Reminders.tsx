"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"

interface Reminder {
  id: string
  text: string
  done: boolean
  tag?: string
  tagVariant?: "destructive" | "default" | "secondary" | "outline"
}

const initialReminders: Reminder[] = [
  {
    id: "1",
    text: "Subir calificaciones finales",
    done: false,
    tag: "URGENTE",
    tagVariant: "destructive",
  },
  {
    id: "2",
    text: "Revisar tareas de Ciencias",
    done: true,
    tag: "HECHO",
    tagVariant: "secondary",
  },
  {
    id: "3",
    text: "Preparar examen mensual",
    done: false,
    tag: "Manana",
    tagVariant: "outline",
  },
]

export function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders)

  function toggleReminder(id: string) {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r))
    )
  }

  return (
    <div className="px-5 pb-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold text-foreground">Recordatorios</h2>
        <button
          className="flex size-8 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md shadow-accent/20 transition-transform hover:scale-105 active:scale-95"
          aria-label="Agregar recordatorio"
        >
          <Plus className="size-4.5" />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
          >
            <Checkbox
              checked={reminder.done}
              onCheckedChange={() => toggleReminder(reminder.id)}
              className="size-5 rounded-full border-2 border-muted-foreground/40 data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
            />
            <span
              className={`flex-1 text-sm ${
                reminder.done
                  ? "text-muted-foreground line-through"
                  : "text-foreground"
              }`}
            >
              {reminder.text}
            </span>
            {reminder.tag && (
              <Badge
                variant={reminder.tagVariant}
                className={`text-[10px] font-bold uppercase tracking-wide ${
                  reminder.tagVariant === "destructive"
                    ? "bg-destructive/15 text-destructive border border-destructive/20"
                    : reminder.tagVariant === "secondary"
                      ? "bg-secondary text-muted-foreground border border-border"
                      : "border border-border text-muted-foreground bg-card"
                }`}
              >
                {reminder.tag}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
