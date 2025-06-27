"use client";
import { UserCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function PerfilPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    // Carrega logo do localStorage se existir
    const storedLogo = localStorage.getItem("salao_logo");
    if (storedLogo) setLogo(storedLogo);
  }, []);

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        const result = ev.target?.result as string;
        setLogo(result);
        localStorage.setItem("salao_logo", result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Aqui você pode implementar a lógica de atualização
    alert("Perfil atualizado! (simulação)");
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col md:flex-row items-stretch">
      <div className="flex-1 flex flex-col px-8 pt-10 max-w-4xl">
        <h1 className="text-3xl font-extrabold mb-8 text-[#222] flex items-center gap-3 drop-shadow text-left">
          <UserCircle className="w-8 h-8 text-[#007bff]" /> Perfil do Salão
        </h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-10 flex flex-col gap-6 w-full max-w-2xl">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Avatar e upload */}
            <div className="flex flex-col items-center md:items-start gap-4 pt-1 min-w-[120px]">
              {logo ? (
                <img src={logo} alt="Logo do salão" className="w-20 h-20 rounded-full object-cover border-2 border-[#007bff] shadow" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#e5e5e5] flex items-center justify-center">
                  <UserCircle className="w-10 h-10 text-[#aaa]" />
                </div>
              )}
              <label className="block text-[#333838] font-semibold text-sm" htmlFor="logo-upload">Logo do salão</label>
              <label htmlFor="logo-upload" className="cursor-pointer bg-[#007bff] text-white px-3 py-1.5 rounded font-medium shadow hover:bg-[#0056b3] transition text-sm">
                Escolher arquivo
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </label>
            </div>
            {/* Campos do formulário */}
            <div className="flex-1 flex flex-col gap-4 w-full">
              <div>
                <label className="block text-[#333838] font-semibold mb-1 text-sm">Nome do salão</label>
                <input
                  type="text"
                  className="border border-[#e5e5e5] rounded px-3 py-2 w-full text-[#333838] bg-white focus:ring-2 focus:ring-[#007bff] text-base"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  placeholder="Nome do salão"
                />
              </div>
              <div>
                <label className="block text-[#333838] font-semibold mb-1 text-sm">E-mail</label>
                <input
                  type="email"
                  className="border border-[#e5e5e5] rounded px-3 py-2 w-full text-[#333838] bg-white focus:ring-2 focus:ring-[#007bff] text-base"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="E-mail"
                />
              </div>
              <div>
                <label className="block text-[#333838] font-semibold mb-1 text-sm">Nova senha</label>
                <input
                  type="password"
                  className="border border-[#e5e5e5] rounded px-3 py-2 w-full text-[#333838] bg-white focus:ring-2 focus:ring-[#007bff] text-base"
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  placeholder="Nova senha"
                />
              </div>
              <button
                type="submit"
                className="bg-[#007bff] text-white rounded-lg px-6 py-2 font-bold shadow hover:bg-[#0056b3] transition text-base self-start mt-2"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* Espaço para garantir alinhamento à esquerda */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
} 