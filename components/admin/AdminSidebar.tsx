"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LayoutDashboard, Calendar, Users, LogOut, Package, Settings, UserCircle, Menu, X } from "lucide-react";
import Image from "next/image";
import { getImageUrl } from "@/lib/image-url";
import { handleSignOut } from "@/lib/actions-auth";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);

    const links = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/events", label: "Événements", icon: Calendar },
        { href: "/admin/partners", label: "Partenaires", icon: Users },
        { href: "/admin/stock", label: "Confiserie", icon: Package },
        { href: "/admin/team", label: "Équipe", icon: UserCircle },
        { href: "/admin/settings", label: "Paramètres", icon: Settings },
    ];

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-40">
                <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8">
                        <Image
                            src={getImageUrl("assets/Logo simple couleur.png")}
                            alt="Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="font-bold font-spartan text-brand-black">Admin BDE</span>
                </div>
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 z-50 transition-transform duration-300 md:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-grad-secondary h-20 md:h-auto">
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

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeSidebar}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all group border",
                                    isActive
                                        ? "bg-brand-red/5 text-brand-red border-brand-red/10"
                                        : "text-gray-700 hover:bg-brand-red/5 hover:text-brand-red border-transparent hover:border-brand-red/10"
                                )}
                            >
                                <Icon className={cn(
                                    "w-5 h-5 transition-colors",
                                    isActive ? "text-brand-red" : "text-gray-400 group-hover:text-brand-red"
                                )} />
                                <span className="font-spartan">{link.label}</span>
                            </Link>
                        );
                    })}
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

                    <form action={handleSignOut}>
                        <Button type="submit" variant="outline" className="w-full justify-start text-gray-600 hover:text-brand-red hover:bg-brand-red/5 border-gray-200 hover:border-brand-red/20">
                            <LogOut className="w-4 h-4 mr-2" />
                            Déconnexion
                        </Button>
                    </form>
                </div>
            </aside>
        </>
    );
}
