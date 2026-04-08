import { supabase } from '@/lib/supabaseClient';
import { type Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [ loading, setLoading ] = useState( true );
  const [ session, setSession ] = useState<Session | null>( null );

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession( data.session );
      setLoading( false );

    });
  }, []);

  if ( loading ) return <div>Cargando...</div>;

  if ( !session ) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
