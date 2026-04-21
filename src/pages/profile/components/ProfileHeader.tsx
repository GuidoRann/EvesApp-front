import { useState } from 'react';

interface ProfileHeaderProps {
  imageUrl: string
}

export function ProfileHeader( { imageUrl }: ProfileHeaderProps ) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative">
      {/* Gradient background */}
      <div className="h-48 relative overflow-hidden bg-linear-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24]">
        {/* Subtle sparkles */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-6 left-[20%] h-1 w-1 rounded-full bg-white" />
          <div className="absolute top-10 right-[30%] h-0.5 w-0.5 rounded-full bg-white" />
          <div className="absolute top-16 left-[60%] h-1 w-1 rounded-full bg-white" />
          <div className="absolute top-8 right-[15%] h-0.5 w-0.5 rounded-full bg-white" />
          <div className="absolute top-20 left-[40%] h-0.5 w-0.5 rounded-full bg-white" />
          <div className="absolute top-14 left-[10%] h-1 w-1 rounded-full bg-purple-300" />
          <div className="absolute top-4 right-[40%] h-0.5 w-0.5 rounded-full bg-purple-200" />
        </div>
      </div>

      {/* Profile picture */}
      <div className="flex justify-center -mt-20 relative z-10">
        <div className="rounded-full p-0.75 bg-linear-to-b from-[#8b5cf6] to-[#4c1d95] shadow-lg shadow-purple-900/40">
          <div className="relative rounded-full overflow-hidden h-32 w-32 border-[3px] border-[#1a0a3e]">
            <img
              src={ imageUrl }
              loading="eager"
              fetchPriority="high"
              alt="Foto de perfil"
              className={`object-cover h-full w-full transition-opacity duration-300 ${
                loading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={ () => setLoading( false ) }
              />

              { loading && (
                <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-full" style={{ opacity: loading ? 1 : 0 }} />
              )}
          </div>
        </div>
      </div>
    </div>
  )
}
