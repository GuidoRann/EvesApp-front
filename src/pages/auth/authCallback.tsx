import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import axios from 'axios';
import { useMaestraStore } from '@/stores/Maestra.store';

const AuthCallback = () => {
  const { setMaestra } = useMaestraStore();

  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = async () => {
      const { data } = await supabase.auth.getSession();

      const session = data.session;

      if (!session) {
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
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if ( !response ) {
          throw new Error("Error al sincronizar usuario");
        }

        // revisar como llegan los datos para obtener la maestra
        const maestra = response.data.body;


        // acá poner la logica de zustand para guardar el usuario
        setMaestra( maestra );
        navigate("/home");

      } catch ( error ) {
        console.error( error );
        navigate( "/login" );
      }
    };

    syncUser();
  }, []);

  return <div>Cargando...</div>;
};

export default AuthCallback;