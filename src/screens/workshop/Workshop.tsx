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
  const days: Moment[] = [];

  for (let i = 0; i < 8; i++) {
    days.push(today.clone().add(i, "days"));
  }

  // Horários por dia da semana em inglês
  const slotsByDay: { [key: string]: string[] } = {
    Sun: ["07:00 - 08:00", "08:00 - 09:00", "09:00 - 10:00"],
    Mon: ["07:00 - 08:00", "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00"],
    Tue: ["07:00 - 08:00", "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00"],
    Wed: ["07:00 - 08:00", "08:00 - 09:00", "09:00 - 10:00"],
    Thu: [
      "07:00 - 08:00",
      "08:00 - 09:00",
      "09:00 - 10:00",
      "10:00 - 11:00",
      "11:00 - 12:00",
    ],
    Fri: ["07:00 - 08:00", "08:00 - 09:00", "09:00 - 10:00"],
    Sat: ["08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00"],
  };

  // Exemplo de reservas por dia
  const reservesByDay: { [key: string]: string[] } = {
    "2024-09-08": ["07:00 - 08:00"],
    "2024-09-09": ["07:00 - 08:00"],
  };

  // Função para traduzir dias da semana para português
  const translateDayOfWeek = (dayOfWeek: string): string => {
    const translations: { [key: string]: string } = {
      Sun: "Dom",
      Mon: "Seg",
      Tue: "Ter",
      Wed: "Qua",
      Thu: "Qui",
      Fri: "Sex",
      Sat: "Sab",
    };
    return translations[dayOfWeek] || dayOfWeek;
  };

  const handleDayClick = (day: Moment) => {
    setSelectedDate(day.format("YYYY-MM-DD"));
    setSelectedSlot(null);
    setIsModalOpen(true);
  };

  const getSlotsForDate = (
    date: string
  ): { time: string; reserved: boolean }[] => {
    // Formata o dia da semana para inglês (abreviado)
    const dayOfWeek = moment(date).locale("en").format("ddd");
    console.log(`Dia da semana (inglês): ${dayOfWeek}`);

    // Obtém os horários disponíveis para o dia da semana
    const availableSlots = slotsByDay[dayOfWeek] || [];
    console.log(`Horários disponíveis: ${availableSlots}`);

    // Formata a data para YYYY-MM-DD para verificar as reservas
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const reservedSlots = reservesByDay[formattedDate] || [];
    console.log(`Horários reservados: ${reservedSlots}`);

    // Cria a lista de slots com a indicação se estão reservados ou não
    return availableSlots.map((slot) => ({
      time: slot,
      reserved: reservedSlots.includes(slot), // Marca como reservado se estiver na lista de horários reservados
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

          <div className="grid grid-cols-8 gap-2 text-center mb-4">
            {days.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <button
                  onClick={() => handleDayClick(day)}
                  className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded"
                >
                  {day.format("D")}
                </button>
                <span className="text-sm">{day.format("MMM")}</span>
                <span className="text-xs">
                  {translateDayOfWeek(day.format("ddd"))}
                </span>
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
          slots={getSlotsForDate(selectedDate)}
          selectedSlot={selectedSlot}
          onSelectSlot={handleSlotClick}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};

export default Workshop;
