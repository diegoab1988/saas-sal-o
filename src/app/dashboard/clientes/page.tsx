"use client";
import { Users } from "lucide-react";

export default function ClientesPage() {
  return (
    <div className="w-full min-h-screen bg-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-[#222] flex items-center gap-3 drop-shadow text-left">
          <Users className="w-8 h-8 text-[#007bff]" /> Clientes
        </h1>
        <div className="bg-white rounded-xl shadow p-10 flex flex-col items-center justify-center min-h-[180px]">
          <span className="text-[#333838] text-base">Nenhum cliente cadastrado ainda.</span>
          {/* Aqui futuramente vai a lista de clientes */}
        </div>
      </div>
    </div>
  );
} 