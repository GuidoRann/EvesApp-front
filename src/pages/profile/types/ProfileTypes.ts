import type { MaestraDTO } from '@/types/MaestraTypes';

export interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  data: MaestraDTO
  onSave: ( data: MaestraDTO ) => void
};

