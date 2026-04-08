import { useState } from 'react';
import { BottomNav } from '../../components/BottomNav';
import { EditProfileModal } from './components/EditProfileModal';
import { ProfileDetails } from './components/ProfileDetails';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileInfo } from './components/ProfileInfo';
import type { TeacherData } from './types/ProfileTypes';

export default function Perfil() {
  const [isEditOpen, setIsEditOpen] = useState( false )
  const [teacher, setTeacher] = useState<TeacherData>({
    name: 'Evelyn',
    lastname: 'Motkoski',
    email: 'eve.mot@escuela.com',
  })

  function handleSave( data: TeacherData ) {
    setTeacher( data ) 
  }

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <main className="pb-24">
        <ProfileHeader imageUrl="/public/photo.jpg"/>
        <ProfileInfo
          nombre={ teacher.name }
          apellido={ teacher.lastname }
          onEditClick={() => setIsEditOpen(true)}
        />
        <ProfileDetails />
      </main>
      <BottomNav />
      <EditProfileModal
        isOpen={ isEditOpen }
        onClose={ () => setIsEditOpen( false ) }
        data={ teacher }
        onSave={ handleSave }
      />
    </div>
  )
}
