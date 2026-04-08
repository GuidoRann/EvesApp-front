import { Button } from "@/components/ui/button"
import { supabase } from '@/lib/supabaseClient';

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={ className } viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

const loginWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:5173/auth/callback"
    },
  });

  if ( error ) {
    console.error( error );
  }
};


export function AuthLogin() {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col bg-background">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-32 top-1/4 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8">
        <div className="mb-16 flex flex-col items-center gap-6">

          {/* App icon */}
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-linear-to-br from-primary to-primary/60 shadow-lg shadow-primary/30">
              <svg
                className="h-12 w-12 text-primary-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-2 -z-10 rounded-3xl bg-primary/20 blur-xl" />
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Bienvenido a
            </h1>
            <span className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-4xl font-extrabold text-transparent">
              EvesApp
            </span>
          </div>

          <p className="max-w-xs text-center text-sm leading-relaxed text-muted-foreground">
            Gestiona tus clases, estudiantes y recordatorios en un solo lugar
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex w-full items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">Continuar con</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Google button */}
          <Button
            onClick={ loginWithGoogle }
            variant="outline"
            size="lg"
            className="h-14 w-full gap-3 rounded-2xl border-border/60 bg-card/50 text-base font-medium text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card hover:shadow-lg hover:shadow-primary/10"
          >
            <GoogleIcon className="h-5 w-5" />
            Iniciar sesion con Google
          </Button>

          <p className="max-w-xs text-center text-xs leading-relaxed text-muted-foreground/70">
            Al continuar, aceptas nuestros{" "}
            <span className="text-primary/80">Terminos de servicio</span> y{" "}
            <span className="text-primary/80">Politica de privacidad</span>
          </p>
        </div>
      </div>

      <div className="relative z-10 pb-8 pt-4">
        <p className="text-center text-xs text-muted-foreground/50">
          Version 0.1.0
        </p>
        <p className="text-center text-xs text-muted-foreground/50">
          Evelyn Motkoski por las escuelas.
        </p>
      </div>
    </div>
  )
}
