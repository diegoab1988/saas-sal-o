"use client";
import { UserCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/app/generated/ThemeContext";

export default function PerfilPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [logo, setLogo] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Carrega logo e nome do localStorage se existirem
    const storedLogo = localStorage.getItem("salao_logo");
    if (storedLogo) setLogo(storedLogo);
    const storedName = localStorage.getItem("salao_nome");
    if (storedName) setNome(storedName);
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
    localStorage.setItem("salao_nome", nome);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      window.location.reload();
    }, 1500);
  }

  // Estilos dinâmicos conforme tema global
  const isNeon = theme === "neon";
  const bgClass = isNeon
    ? "min-h-screen w-full flex flex-col md:flex-row items-stretch bg-gradient-to-br from-black via-[#1a1446] to-[#0a0a23] font-sans"
    : "w-full min-h-screen bg-white flex flex-col md:flex-row items-stretch font-sans";
  const cardClass = isNeon
    ? "backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 flex flex-col gap-6 w-full max-w-2xl"
    : "bg-white rounded-xl shadow p-10 flex flex-col gap-6 w-full max-w-2xl";
  const inputClass = isNeon
    ? "rounded-lg px-4 py-2 bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#ff00cc] transition font-sans"
    : "border border-[#e5e5e5] rounded px-3 py-2 w-full text-[#333838] bg-white focus:ring-2 focus:ring-[#007bff] text-base font-sans";
  const labelClass = isNeon
    ? "block text-white font-semibold mb-1 text-sm font-sans"
    : "block text-[#333838] font-semibold mb-1 text-sm font-sans";
  const buttonClass = isNeon
    ? "mt-2 bg-gradient-to-r from-[#ff00cc] via-[#3331ff] to-[#00eaff] text-white font-bold py-2 rounded-lg shadow-lg hover:brightness-125 transition text-base tracking-wide drop-shadow-[0_2px_16px_#ff00cc] font-sans self-start"
    : "bg-[#007bff] text-white rounded-lg px-6 py-2 font-bold shadow hover:bg-[#0056b3] transition text-base self-start mt-2 font-sans";
  const titleClass = isNeon
    ? "text-3xl font-extrabold mb-8 text-white flex items-center gap-3 drop-shadow text-left font-sans"
    : "text-3xl font-extrabold mb-8 text-[#222] flex items-center gap-3 drop-shadow text-left font-sans";

  return (
    <div className={bgClass} style={isNeon ? { fontFamily: 'Poppins, Arial, sans-serif' } : {}}>
      <div className="flex-1 flex flex-col px-8 pt-10 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className={titleClass}>
            <UserCircle className={isNeon ? "w-8 h-8 text-[#ff00cc]" : "w-8 h-8 text-[#007bff]"} /> Perfil do Salão
          </h1>
        </div>
        <form onSubmit={handleSubmit} className={cardClass} style={isNeon ? { fontFamily: 'Poppins, Arial, sans-serif' } : {}}>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Avatar e upload */}
            <div className="flex flex-col items-center md:items-start gap-4 pt-1 min-w-[120px]">
              {logo ? (
                <img src={logo} alt="Logo do salão" className={isNeon ? "w-20 h-20 rounded-full object-cover border-2 border-[#ff00cc] shadow" : "w-20 h-20 rounded-full object-cover border-2 border-[#007bff] shadow"} />
              ) : (
                <div className={isNeon ? "w-20 h-20 rounded-full bg-[#222] flex items-center justify-center" : "w-20 h-20 rounded-full bg-[#e5e5e5] flex items-center justify-center"}>
                  <UserCircle className={isNeon ? "w-10 h-10 text-[#ff00cc]" : "w-10 h-10 text-[#aaa]"} />
                </div>
              )}
              <label className={labelClass} htmlFor="logo-upload">Logo do salão</label>
              <label htmlFor="logo-upload" className={isNeon ? "cursor-pointer bg-gradient-to-r from-[#ff00cc] to-[#00eaff] text-white px-3 py-1.5 rounded font-medium shadow hover:brightness-125 transition text-sm" : "cursor-pointer bg-[#007bff] text-white px-3 py-1.5 rounded font-medium shadow hover:bg-[#0056b3] transition text-sm"}>
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
                <label className={labelClass}>Nome do salão</label>
                <input
                  type="text"
                  className={inputClass}
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  placeholder="Nome do salão"
                />
              </div>
              <div>
                <label className={labelClass}>E-mail</label>
                <input
                  type="email"
                  className={inputClass}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="E-mail"
                />
              </div>
              <div>
                <label className={labelClass}>Nova senha</label>
                <input
                  type="password"
                  className={inputClass}
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  placeholder="Nova senha"
                />
              </div>
              <button
                type="submit"
                className={buttonClass}
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </form>
        {success && (
          <div className="mt-4 text-center text-white">
            Perfil atualizado com sucesso!
          </div>
        )}
      </div>
      {/* Espaço para garantir alinhamento à esquerda */}
      <div className="flex-1 hidden md:block" />
      {/* Glow efeito neon no fundo */}
      {isNeon && <>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#ff00cc]/30 rounded-full blur-3xl z-0 animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#00eaff]/20 rounded-full blur-3xl z-0 animate-pulse" />
      </>}
    </div>
  );
} 