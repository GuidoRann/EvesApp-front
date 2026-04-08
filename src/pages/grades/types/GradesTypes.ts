export interface GradeItem {
  grade: string
  letter: string
  shift: string
  teacher: string
}

export interface GradeSectionProps {
  title: string
  grades: GradeItem[]
}