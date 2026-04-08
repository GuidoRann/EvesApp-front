import { User, Home, LayoutGrid, School } from 'lucide-react'
import { NavLink } from "react-router-dom";

interface NavItemProps {
  icon: React.ReactNode
  label: string
  to: string
  active?: boolean
}

function NavItem({ icon, label, to }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1 flex-1 py-2.5 transition-colors ${
          isActive ? 'text-[#8b5cf6]' : 'text-[#5a4f78]'
        }`
      }
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </NavLink>
  );
}

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#1a1035] border-t border-[#2a1f4e]"
      aria-label="Navegacion principal"
    >
      <div className="flex items-center justify-around px-2 py-1 pb-[env(safe-area-inset-bottom,8px)]">
        <NavItem
          to="/home"
          icon={ <Home className="h-6 w-6" /> }
          label="Inicio"
        />
        <NavItem
          to="/profile"
          icon={ <User className="h-6 w-6" /> }
          label="Perfil"
          active
        />
        <NavItem
          to="/grades"
          icon={ <LayoutGrid className="h-6 w-6" /> }
          label="Mis Grados"
          active
        />
        <NavItem
          to="/schools"
          icon={ <School className="h-6 w-6" /> }
          label="Escuela"
        />
      </div>
    </nav>
  )
}
