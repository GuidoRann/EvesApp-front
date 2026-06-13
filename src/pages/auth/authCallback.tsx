import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {supabase} from "@/lib/supabaseClient";
import axios from "axios";
import {useMaestraStore} from "@/stores/Maestra.store";
import Loading from '@/components/Loading';
import MaestraService from '@/services/MaestraService';

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

        const perfil = await MaestraService.obtenerPerfil(token);

        setMaestra(perfil.body);

        navigate( "/home" );
      } catch ( error ) {
        console.error( error );
        navigate( "/login" );
      }
    };

    syncUser();
  }, []);

  return <Loading />;
};

export default AuthCallback;
