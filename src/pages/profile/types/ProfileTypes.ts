import type { MaestraType } from '@/types/MaestraTypes';

export interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  data: MaestraType
  onSave: ( data: MaestraType ) => void
};

