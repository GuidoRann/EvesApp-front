import { useState } from 'react';
import { BottomNav } from '../../components/BottomNav';
import { EditProfileModal } from './components/EditProfileModal';
import { ProfileDetails } from './components/ProfileDetails';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileInfo } from './components/ProfileInfo';
import { useMaestraStore } from '@/stores/Maestra.store';
import { useManagementProfile } from './hooks/useManagementProfile';

export default function Perfil() {
  const [ isEditOpen, setIsEditOpen ] = useState( false )
  const { updateMaestra } = useManagementProfile();

  const maestra = useMaestraStore( ( state ) => state.maestra! );

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <main className="pb-24">
        <ProfileHeader imageUrl={ maestra?.avatar_url ?? "" } />
        <ProfileInfo
          nombre={ maestra?.nombre ?? "nombre" }
          apellido={ maestra?.apellido ?? "apellido" }
          onEditClick={ () => setIsEditOpen( true ) }
        />
        <ProfileDetails />
      </main>
      <BottomNav />
      <EditProfileModal
        isOpen={ isEditOpen }
        onClose={ () => setIsEditOpen( false ) }
        data={ maestra }
        onSave={ 
          ( data ) => {
            updateMaestra( data.maestraId, data );
          }
         }
      />
    </div>
  )
}
