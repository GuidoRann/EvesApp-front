export interface TeacherData {
  name: string
  lastname: string
  email: string
};

export interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  data: TeacherData
  onSave: ( data: TeacherData ) => void
};

