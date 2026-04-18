import { useState } from 'react';
import { BottomNav } from '../../components/BottomNav';
import { EditProfileModal } from './components/EditProfileModal';
import { ProfileDetails } from './components/ProfileDetails';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileInfo } from './components/ProfileInfo';
import { useMaestraStore } from '@/stores/Maestra.store';

export default function Perfil() {
  const [isEditOpen, setIsEditOpen] = useState( false )

  const maestra = useMaestraStore( ( state ) => state.maestra! );

  console.log("Esta es la data que llega de maestra en Perfil" ,maestra );
  console.log("ESTE ES EL AVATAR URL: ", maestra?.avatar_url);


  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <main className="pb-24">
        <ProfileHeader imageUrl={ maestra?.avatar_url ?? "" } />
        <ProfileInfo
          nombre={ maestra?.nombre ?? "nombre" }
          apellido={ maestra?.apellido ?? "apellido" }
          onEditClick={() => setIsEditOpen(true)}
        />
        <ProfileDetails />
      </main>
      <BottomNav />
      <EditProfileModal
        isOpen={ isEditOpen }
        onClose={ () => setIsEditOpen( false ) }
        data={ maestra }
        onSave={ ( data ) => console.log( data ) } // TODO: Aca poner el update de datos de maestra
      />
    </div>
  )
}
