import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {supabase} from "@/lib/supabaseClient";
import axios from "axios";
import {useMaestraStore} from "@/stores/Maestra.store";

const AuthCallback = () => {
  const { setMaestra } = useMaestraStore();

  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = async () => {
      const { data } = await supabase.auth.getSession();

      const session = data.session;

      if ( !session ) {
        navigate("/login");
        return;
      }

      const token = session.access_token;

      try {
        const response = await axios.post(
          "http://localhost:3000/auth/google",
          {},
          {
            headers: {
              Authorization: `Bearer ${ token }`,
            },
          },
        );

        if ( !response ) {
          throw new Error("Error al sincronizar usuario");
        }

        const maestra = response.data.body;

        setMaestra( maestra );
        navigate( "/home" );
      } catch ( error ) {
        console.error( error );
        navigate( "/login" );
      }
    };

    syncUser();
  }, []);

  return (
    <div>
      <div className='min-h-screen bg-background max-w-md mx-auto relative flex flex-col items-center justify-center overflow-hidden'>
        <div className='absolute inset-0 bg-linear-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24]' />

        {/* Estrellitas */}
        <div className='absolute inset-0'>
          <div className='absolute top-[10%] left-[15%] h-1.5 w-1.5 rounded-full bg-white animate-pulse' />
          <div className='absolute top-[20%] right-[25%] h-1 w-1 rounded-full bg-white animate-pulse [animation-delay:0.2s]' />
          <div className='absolute top-[30%] left-[70%] h-1.5 w-1.5 rounded-full bg-white animate-pulse [animation-delay:0.4s]' />
          <div className='absolute top-[15%] right-[10%] h-1 w-1 rounded-full bg-white animate-pulse [animation-delay:0.6s]' />
          <div className='absolute top-[40%] left-[25%] h-0.5 w-0.5 rounded-full bg-white animate-pulse [animation-delay:0.8s]' />
          <div className='absolute top-[25%] left-[45%] h-1 w-1 rounded-full bg-purple-300 animate-pulse [animation-delay:0.3s]' />
          <div className='absolute top-[35%] right-[35%] h-0.5 w-0.5 rounded-full bg-purple-200 animate-pulse [animation-delay:0.5s]' />
          <div className='absolute bottom-[30%] left-[20%] h-1 w-1 rounded-full bg-white animate-pulse [animation-delay:0.7s]' />
          <div className='absolute bottom-[25%] right-[15%] h-1.5 w-1.5 rounded-full bg-purple-300 animate-pulse [animation-delay:0.1s]' />
          <div className='absolute bottom-[40%] left-[60%] h-0.5 w-0.5 rounded-full bg-white animate-pulse [animation-delay:0.9s]' />
        </div>

        <div className='relative z-10 flex flex-col items-center gap-8'>

          <div className='flex flex-col items-center gap-2'>
            <p className='text-white text-lg font-medium tracking-wide'>Cargando</p>
           
            {/* Puntitos animados */}
            <div className='flex gap-1.5'>
              <div className='w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0s]' />
              <div className='w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.15s]' />
              <div className='w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.3s]' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
