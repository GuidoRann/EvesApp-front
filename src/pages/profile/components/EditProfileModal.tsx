import { useState, useEffect } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/components/ui/drawer'
import type { EditProfileModalProps } from '../types/ProfileTypes';
import type { MaestraType } from '@/types/MaestraTypes';


export function EditProfileModal({ isOpen, onClose, data, onSave }: EditProfileModalProps) {
  const [ form, setForm ] = useState<MaestraType>( data )

  useEffect(() => {
    if ( isOpen ) {
      setForm( data )
    }
  }, [ isOpen, data ])

  if ( !isOpen ) return null

  function handleChange( field: keyof MaestraType, value: string ) {
    setForm( prev => ({ ...prev, [ field ]: value }) )
  }

  function handleSubmit( e: React.FormEvent ) {
    e.preventDefault()
    onSave( form )
    onClose()
  }

  return (
    <Drawer open={ isOpen } onOpenChange={ ( open ) => !open && onClose() }>
      <DrawerContent className="bg-[#1a1035] border-[#2a1f4e] rounded-top-4xl">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-bold flex text-[#f5f5f5]">Editar Perfil</DrawerTitle>
          <DrawerDescription className="text-left">
            Modifica tus datos personales.
          </DrawerDescription>
        </DrawerHeader>

        <form onSubmit={ handleSubmit } className="flex flex-col gap-4 px-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nombre" className="text-sm font-medium text-[#8a7faa]">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              value={ form.nombre }
              onChange={ e => handleChange( 'nombre', e.target.value ) }
              className="w-full rounded-xl bg-[#110a24] border border-[#2a1f4e] px-4 py-3 text-white placeholder-[#5a4f78] outline-none focus:border-[#7c3aed] transition-colors"
              placeholder="Tu nombre"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="apellido" className="text-sm font-medium text-[#8a7faa]">
              Apellido
            </label>
            <input
              id="apellido"
              type="text"
              value={ form.apellido }
              onChange={ e => handleChange( 'apellido', e.target.value ) }
              className="w-full rounded-xl bg-[#110a24] border border-[#2a1f4e] px-4 py-3 text-white placeholder-[#5a4f78] outline-none focus:border-[#7c3aed] transition-colors"
              placeholder="Tu apellido"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-[#8a7faa]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={ form.email }
              onChange={ e => handleChange( 'email', e.target.value ) }
              className="w-full rounded-xl bg-[#110a24] border border-[#2a1f4e] px-4 py-3 text-white placeholder-[#5a4f78] outline-none focus:border-[#7c3aed] transition-colors"
              placeholder="tu@email.com"
            />
          </div>

          <p className="text-xs text-[#5a4f78]">
            La foto de perfil no se puede modificar ya que proviene de tu cuenta de Google.
          </p>

          <DrawerFooter className="flex-row gap-3 px-0">
            <button
              type="button"
              onClick={ onClose }
              className="flex-1 rounded-full border border-[#2a1f4e] py-3 text-[#8a7faa] font-semibold hover:bg-[#2a1f4e]/40 active:bg-[#2a1f4e]/60 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 rounded-full bg-[#7c3aed] py-3 text-white font-semibold hover:bg-[#6d28d9] active:bg-[#5b21b6] transition-colors shadow-lg shadow-purple-900/30"
            >
              Guardar
            </button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
