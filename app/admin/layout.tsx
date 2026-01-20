import { signOut } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LayoutDashboard, Calendar, Users, LogOut, Package, Settings, UserCircle } from "lucide-react";
import { Toaster } from "sonner";
import Image from "next/image";
import { getImageUrl } from "@/lib/image-url";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 z-50">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-grad-secondary">
          <div className="relative w-8 h-8 bg-white rounded-full p-1">
             <Image
              src={getImageUrl("assets/Logo simple couleur.png")}
              alt="Logo"
              fill
              className="object-contain p-1"
            />
          </div>
          <h1 className="text-lg font-bold font-spartan text-white">Admin BDE</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-brand-red/5 hover:text-brand-red rounded-xl transition-all group border border-transparent hover:border-brand-red/10"
          >
            <LayoutDashboard className="w-5 h-5 text-gray-400 group-hover:text-brand-red transition-colors" />
            <span className="font-spartan">Dashboard</span>
          </Link>
          <Link
            href="/admin/events"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-brand-red/5 hover:text-brand-red rounded-xl transition-all group border border-transparent hover:border-brand-red/10"
          >
            <Calendar className="w-5 h-5 text-gray-400 group-hover:text-brand-red transition-colors" />
            <span className="font-spartan">Événements</span>
          </Link>
          <Link
            href="/admin/partners"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-brand-red/5 hover:text-brand-red rounded-xl transition-all group border border-transparent hover:border-brand-red/10"
          >
            <Users className="w-5 h-5 text-gray-400 group-hover:text-brand-red transition-colors" />
            <span className="font-spartan">Partenaires</span>
          </Link>
          <Link
            href="/admin/stock"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-brand-red/5 hover:text-brand-red rounded-xl transition-all group border border-transparent hover:border-brand-red/10"
          >
            <Package className="w-5 h-5 text-gray-400 group-hover:text-brand-red transition-colors" />
            <span className="font-spartan">Confiserie</span>
          </Link>
          <Link
            href="/admin/team"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-brand-red/5 hover:text-brand-red rounded-xl transition-all group border border-transparent hover:border-brand-red/10"
          >
            <UserCircle className="w-5 h-5 text-gray-400 group-hover:text-brand-red transition-colors" />
            <span className="font-spartan">Équipe</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-brand-red/5 hover:text-brand-red rounded-xl transition-all group border border-transparent hover:border-brand-red/10"
          >
            <Settings className="w-5 h-5 text-gray-400 group-hover:text-brand-red transition-colors" />
            <span className="font-spartan">Paramètres</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 px-4 py-3 mb-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white font-bold font-spartan text-sm shadow-md">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 font-spartan truncate">Administrateur</p>
              <p className="text-xs text-gray-500 truncate font-medium">admin@suprennes.me</p>
            </div>
          </div>
          
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit" variant="outline" className="w-full justify-start text-gray-600 hover:text-brand-red hover:bg-brand-red/5 border-gray-200 hover:border-brand-red/20">
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
