import React from "react";

interface Slot {
  time: string;
  reserved: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  slots: Slot[];
  selectedSlot: string | null;
  onSelectSlot: (slot: string) => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  slots,
  selectedSlot,
  onSelectSlot,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <div className="mb-4">
          {slots.length > 0 ? (
            slots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => !slot.reserved && onSelectSlot(slot.time)}
                disabled={slot.reserved}
                className={`block w-full text-left p-2 my-1 rounded ${
                  slot.reserved
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : selectedSlot === slot.time
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {slot.time} {slot.reserved && "(Reservado)"}
              </button>
            ))
          ) : (
            <p>Nenhum horário disponível.</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onConfirm}
            disabled={!selectedSlot}
            className={`mr-2 px-4 py-2 rounded ${
              selectedSlot ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Confirmar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
