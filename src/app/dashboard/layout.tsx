"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarIcon, SettingsIcon, LogOut, UserCircle, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Simulação de nome do salão (em produção, buscar do usuário logado)
  const salonName = "Salão Bella";
  const pathname = usePathname();
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLogo = localStorage.getItem("salao_logo");
      if (storedLogo) setLogo(storedLogo);
    }
  }, []);

  let breadcrumb = "Dashboard";
  if (pathname === "/dashboard/configuracoes") breadcrumb = "Dashboard > Configurações";

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 min-h-screen bg-[#F8F8F8] border-r border-[#e5e5e5] shadow-xl flex flex-col px-6 py-8">
        <div className="flex flex-col items-center mb-10">
          {logo ? (
            <img src={logo} alt="Logo do salão" className="w-16 h-16 rounded-full object-cover border-4 border-[#3383F8] mb-3 shadow" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#3383F8] flex items-center justify-center shadow-lg border-4 border-white/30 mb-3">
              <UserCircle className="w-10 h-10 text-white" />
            </div>
          )}
          <h1 className="text-2xl font-extrabold tracking-wider text-[#333838] text-center drop-shadow">Salão Bella</h1>
          <p className="mt-2 text-sm text-[#374151] font-medium leading-tight text-left whitespace-pre-line">
            Bem-vindo(a) ao seu novo normal.
            <br />Aqui, você tem controle,
            <br />mesmo quando tudo está automático.
          </p>
        </div>
        <nav className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 p-3 rounded-xl font-semibold text-lg transition-all duration-200 ease-in-out hover:scale-105 hover:bg-[#E5E5E5] ${pathname === "/dashboard" ? "bg-[#3383F8] text-white" : "text-[#333838]"}`}
            aria-current={pathname === "/dashboard" ? "page" : undefined}
          >
            <CalendarIcon className="w-6 h-6" />
            Agenda
          </Link>
          <Link
            href="/dashboard/clientes"
            className={`flex items-center gap-3 p-3 rounded-xl font-semibold text-lg transition-all duration-200 ease-in-out hover:scale-105 hover:bg-[#E5E5E5] ${pathname === "/dashboard/clientes" ? "bg-[#3383F8] text-white" : "text-[#333838]"}`}
            aria-current={pathname === "/dashboard/clientes" ? "page" : undefined}
          >
            <Users className="w-6 h-6" />
            Clientes
          </Link>
          <Link
            href="/dashboard/perfil"
            className={`flex items-center gap-3 p-3 rounded-xl font-semibold text-lg transition-all duration-200 ease-in-out hover:scale-105 hover:bg-[#E5E5E5] ${pathname === "/dashboard/perfil" ? "bg-[#3383F8] text-white" : "text-[#333838]"}`}
            aria-current={pathname === "/dashboard/perfil" ? "page" : undefined}
          >
            <UserCircle className="w-6 h-6" />
            Perfil
          </Link>
          <Link
            href="/dashboard/configuracoes"
            className={`flex items-center gap-3 p-3 rounded-xl font-semibold text-lg transition-all duration-200 ease-in-out hover:scale-105 hover:bg-[#E5E5E5] ${pathname === "/dashboard/configuracoes" ? "bg-[#3383F8] text-white" : "text-[#333838]"}`}
            aria-current={pathname === "/dashboard/configuracoes" ? "page" : undefined}
          >
            <SettingsIcon className="w-6 h-6" />
            Configurações
          </Link>
        </nav>
        <form action="/login" method="get" className="mt-10">
          <button type="submit" className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-[#E5E5E5] hover:bg-[#e0e0e0] text-[#333838] font-medium transition-all">
            <LogOut className="w-5 h-5" /> Sair
          </button>
        </form>
      </aside>
      <main className="flex-1 flex flex-col min-h-screen px-0 py-0 bg-transparent">
        <div className="w-full h-full flex-1 flex flex-col p-0 m-0">
          {children}
        </div>
      </main>
    </div>
  );
} 