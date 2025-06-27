"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const dias = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

function DiaConfig({ dia, value, onChange }: any) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col gap-3">
      <h3 className="text-lg font-bold text-[#222] mb-1">{dia}</h3>
      <label className="flex items-center gap-2 text-[#333838] text-sm mb-2">
        <input
          type="checkbox"
          className="accent-[#007bff] w-4 h-4 rounded focus:ring-2 focus:ring-[#007bff] border border-[#e5e5e5]"
          checked={value.disponivel}
          onChange={e => onChange({ ...value, disponivel: e.target.checked })}
        />
        Disponível neste dia
      </label>
      {value.intervalos && value.intervalos.map((intervalo: any, intIdx: number) => (
        <div key={intIdx} className="flex gap-2 mt-1 items-center">
          <input
            type="time"
            className="border border-[#e5e5e5] bg-white text-[#333838] placeholder:text-[#aaa] rounded px-3 py-1.5 focus:ring-2 focus:ring-[#007bff] text-sm w-28"
            value={intervalo.inicio}
            onChange={e => {
              const novos = value.intervalos.map((itv: any, j: number) => j === intIdx ? { ...itv, inicio: e.target.value } : itv);
              onChange({ ...value, intervalos: novos });
            }}
            title="Horário de início"
            placeholder="Início"
          />
          <span className="text-[#333838] text-sm">até</span>
          <input
            type="time"
            className="border border-[#e5e5e5] bg-white text-[#333838] placeholder:text-[#aaa] rounded px-3 py-1.5 focus:ring-2 focus:ring-[#007bff] text-sm w-28"
            value={intervalo.fim}
            onChange={e => {
              const novos = value.intervalos.map((itv: any, j: number) => j === intIdx ? { ...itv, fim: e.target.value } : itv);
              onChange({ ...value, intervalos: novos });
            }}
            title="Horário de fim"
            placeholder="Fim"
          />
          <button
            className="text-red-400 hover:text-red-600 transition text-sm px-2 py-1 rounded"
            onClick={() => {
              onChange({ ...value, intervalos: value.intervalos.filter((_: any, j: number) => j !== intIdx) });
            }}
            type="button"
            title="Remover intervalo"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      ))}
      {value.disponivel && (
        <button
          className="mt-1 flex items-center gap-1 text-[#007bff] hover:text-[#0056b3] text-sm px-2 py-1 rounded"
          onClick={() => onChange({ ...value, intervalos: [...value.intervalos, { inicio: "", fim: "" }] })}
          type="button"
        >
          <Plus className="w-4 h-4" /> Adicionar intervalo
        </button>
      )}
    </div>
  );
}

export default function ConfiguracoesPage() {
  const [horarios, setHorarios] = useState(() =>
    dias.map(() => ({ disponivel: false, intervalos: [{ inicio: "", fim: "" }] }))
  );

  function handleDiaChange(idx: number, novo: any) {
    setHorarios(horarios => horarios.map((h, i) => i === idx ? novo : h));
  }

  function salvar() {
    alert("Configurações salvas! (simulação)");
  }

  return (
    <div className="w-full min-h-screen bg-white py-10 px-4">
      <h1 className="text-3xl font-extrabold mb-8 text-[#222] text-center drop-shadow">Configurações de Horários</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {dias.map((dia, idx) => (
          <DiaConfig
            key={dia}
            dia={dia}
            value={horarios[idx]}
            onChange={novo => handleDiaChange(idx, novo)}
          />
        ))}
      </div>
      <button
        className="bg-[#007bff] text-white rounded-lg px-8 py-2 font-bold shadow hover:bg-[#0056b3] transition mt-10 flex items-center gap-2 mx-auto block text-base"
        onClick={salvar}
        type="button"
      >
        <Plus className="w-5 h-5" /> Salvar Configurações
      </button>
    </div>
  );
} 