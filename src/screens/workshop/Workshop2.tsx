import React, { useState } from "react";
import moment, { Moment } from "moment";
import "moment/locale/pt-br";
import Navbar from "../shared_components/Navbar";
import Modal from "../shared_components/Modal";

const Workshop: React.FC = () => {
  moment.locale("pt-br");

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const today = moment();
  const startOfMonth = today.clone().startOf("month");
  const endOfMonth = today.clone().endOf("month");
  const startOfCalendar = startOfMonth.clone().startOf("week");

  const days: Moment[] = [];
  let day = startOfCalendar.clone();

  while (day.isBefore(endOfMonth.clone().add(1, "week"))) {
    days.push(day.clone());
    day.add(1, "day");
  }

  // Horários por dia da semana
  const slotsByDay: { [key: string]: string[] } = {
    Dom: [],
    Seg: ["07:00 - 08:00", "08:00 - 09:00", "09:00 - 10:00"],
    Ter: ["07:00 - 08:00", "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00"],
    Qua: ["07:00 - 08:00", "08:00 - 09:00", "09:00 - 10:00"],
    Qui: [
      "07:00 - 08:00",
      "08:00 - 09:00",
      "09:00 - 10:00",
      "10:00 - 11:00",
      "11:00 - 12:00",
    ],
    Sex: ["07:00 - 08:00", "08:00 - 09:00", "09:00 - 10:00"],
    Sab: ["08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00"],
  };

  // Reservas por dia (datas específicas com horários já reservados)
  const reservesByDay: { [key: string]: string[] } = {
    "2024-09-01": ["07:00 - 08:00"], // Exemplo: reserva para o dia 01 de setembro
    "2024-09-05": ["07:00 - 08:00"], // Exemplo: reserva para o dia 05 de setembro
  };

  const handleDayClick = (day: Moment) => {
    setSelectedDate(day.format("YYYY-MM-DD"));
    setSelectedSlot(null);
    setIsModalOpen(true);
  };

  // Função que combina os slots disponíveis para o dia da semana com as reservas para a data selecionada
  const getSlotsForDate = (
    date: string
  ): { time: string; reserved: boolean }[] => {
    const dayOfWeek = moment(date).format("dddd"); // Dia da semana completo (ex: Segunda-feira)
    const availableSlots = slotsByDay[dayOfWeek.substring(0, 3)] || []; // Pega os 3 primeiros caracteres (Seg, Ter)
    const reservedSlots = reservesByDay[date] || [];

    return availableSlots.map((slot) => ({
      time: slot,
      reserved: reservedSlots.includes(slot),
    }));
  };

  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedSlot) {
      alert(
        `Você confirmou o horário ${selectedSlot} para ${moment(
          selectedDate
        ).format("DD MMMM YYYY")}`
      );
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <div className="w-1/4 bg-gray-100 p-4 border-r border-gray-300">
          <h2 className="text-2xl font-bold mb-4">Detalhes da Oficina</h2>
          <p className="text-lg mb-2">Nome da Oficina</p>
          <p className="text-md mb-4">
            Descrição da oficina vai aqui. Adicione detalhes importantes sobre o
            workshop, como horário, local, e outros detalhes relevantes.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mb-2">
            Agendar
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Verificar Horários
          </button>
        </div>

        <div className="flex-1 p-4">
          <div className="text-center text-2xl font-bold mb-4">
            {today.format("MMMM YYYY")}
          </div>

          <div className="grid grid-cols-7 gap-2 text-center mb-4">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map(
              (day, index) => (
                <div key={index} className="font-bold">
                  {day}
                </div>
              )
            )}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => (
              <div
                key={index}
                className={`flex items-center justify-center p-2 ${
                  day.isSame(today, "day")
                    ? "bg-blue-500 text-white"
                    : day.isSame(startOfMonth.clone().startOf("month"), "month") // Verifica se o dia pertence ao mês atual
                    ? "bg-gray-200"
                    : "bg-slate-600" // Dias fora do mês atual
                } rounded`}
              >
                <button
                  onClick={() => handleDayClick(day)}
                  className="flex items-center justify-center w-full h-full"
                >
                  {day.format("D")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedDate && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={`Horários disponíveis para ${moment(selectedDate).format(
            "DD MMMM YYYY"
          )}`}
          slots={getSlotsForDate(selectedDate)} // Passa os slots disponíveis com as reservas marcadas
          selectedSlot={selectedSlot}
          onSelectSlot={handleSlotClick}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};

export default Workshop;
