import { supabase } from "@/lib/supabaseClient";
import { useMaestraStore } from "@/stores/Maestra.store";

supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_OUT") {
    useMaestraStore.getState().clearAll();

    localStorage.clear();

    window.location.href = "/login";
  }
});