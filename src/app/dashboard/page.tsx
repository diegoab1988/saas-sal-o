"use client";
import { useEffect, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import toast, { Toaster } from "react-hot-toast";
import { Plus, Save, Trash2 } from "lucide-react";

const EVENT_COLORS = ["#c7d2fe", "#fcd5ce", "#a5f3fc", "#f0abfc"];

function EventModal({ open, onClose, onSave, initialData }: any) {
  const [title, setTitle] = useState(initialData?.title || "");
  useEffect(() => { setTitle(initialData?.title || ""); }, [initialData]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60 transition-opacity">
      <div className="bg-[#2a0845]/90 rounded-2xl shadow-xl p-6 w-full max-w-md transition-all border border-white/10">
        <h2 className="text-xl font-bold mb-4 text-white">{initialData ? "Editar Evento" : "Novo Evento"}</h2>
        <input
          className="border border-white/20 bg-white/10 text-white placeholder:text-white/60 rounded-xl px-3 py-2 w-full mb-4 focus:ring-2 focus:ring-indigo-400"
          placeholder="Título do evento"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div className="flex gap-2 justify-end">
          <button className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition border border-white/10" onClick={onClose}>
            Cancelar
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md flex items-center gap-2 hover:from-indigo-600 hover:to-purple-600 transition" onClick={() => onSave({ title })}>
            <Save className="w-4 h-4" /> Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [modal, setModal] = useState<{ open: boolean, event?: any, info?: any }>({ open: false });
  const calendarRef = useRef<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else {
      fetchEvents(token);
    }
  }, []);

  async function fetchEvents(token: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        let data = await res.json();
        // Adiciona cor suave a cada evento
        data = data.map((ev: any, idx: number) => ({ ...ev, backgroundColor: EVENT_COLORS[idx % EVENT_COLORS.length], borderColor: EVENT_COLORS[idx % EVENT_COLORS.length], textColor: "#3730a3" }));
        setEvents(data);
      } else {
        setError("Erro ao carregar eventos");
      }
    } catch {
      setError("Erro ao carregar eventos");
    }
    setLoading(false);
  }

  function openCreateModal(info: any) {
    setModal({ open: true, info });
  }
  function openEditModal(event: any) {
    setModal({ open: true, event });
  }
  function closeModal() {
    setModal({ open: false });
  }

  async function handleSaveEvent(data: any) {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      if (modal.event) {
        await fetch("/api/events", {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ ...modal.event, ...data }),
        });
        toast.success("Evento atualizado!");
      } else {
        await fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            title: data.title,
            start: modal.info.startStr,
            end: modal.info.endStr,
            allDay: modal.info.allDay,
          }),
        });
        toast.success("Evento criado!");
      }
      closeModal();
      fetchEvents(token);
    } catch {
      toast.error("Erro ao salvar evento");
    }
  }

  async function handleEventRemove(eventInfo: any) {
    if (window.confirm(`Remover evento '${eventInfo.event.title}'?`)) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await fetch("/api/events", {
            method: "DELETE",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ id: eventInfo.event.id }),
          });
          fetchEvents(token);
          toast.success("Evento removido!");
        } catch {
          toast.error("Erro ao remover evento");
        }
      }
    }
  }

  if (loading) return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;

  return (
    <div className="w-full h-full flex-1 p-0">
      <Toaster position="top-right" />
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        selectable={true}
        select={openCreateModal}
        eventClick={e => openEditModal(e.event)}
        eventContent={renderEventContent}
        height="100%"
        locale="pt-br"
        dayMaxEvents={2}
      />
      <EventModal
        open={modal.open}
        onClose={closeModal}
        onSave={handleSaveEvent}
        initialData={modal.event}
      />
    </div>
  );
}

function renderEventContent(eventInfo: any) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold text-indigo-700">{eventInfo.event.title}</span>
      <button
        className="ml-2 px-2 py-1 text-xs bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-md hover:from-indigo-600 hover:to-purple-600 transition flex items-center gap-1"
        onClick={e => {
          e.stopPropagation();
          eventInfo.event.remove();
        }}
        title="Excluir evento"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
} 