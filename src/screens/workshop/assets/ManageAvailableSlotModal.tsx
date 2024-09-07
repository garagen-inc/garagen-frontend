import moment from 'moment'
import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { AvailableSlotDay } from '../../../interfaces/availableSlot/available-slot.dto'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CreateAvailableSlotDTO } from '../../../interfaces/availableSlot/create-available-slot.dto'

interface ModalProps {
  isLoading: boolean
  onClose: () => void
  onConfirm: (createAvailableSlot: CreateAvailableSlotDTO) => void
}

const daysOfWeek: AvailableSlotDay[] = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
]

const dayMap: { [key: string]: string } = {
  sun: 'Domingo',
  mon: 'Segunda-feira',
  tue: 'Terça-feira',
  wed: 'Quarta-feira',
  thu: 'Quinta-feira',
  fri: 'Sexta-feira',
  sat: 'Sábado',
}

const ManageAvailableSlotModal: React.FC<ModalProps> = ({
  isLoading,
  onClose,
  onConfirm,
}) => {
  const localizer = momentLocalizer(moment)
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null)
  const [recurrence, setRecurrence] = useState<AvailableSlotDay[]>([])

  const startTime = moment('00:00', 'HH:mm').toDate()
  const finalTime = moment('23:59', 'HH:mm').toDate()

  const handleSlotSelection = (slotInfo: any) => {
    const start = moment(slotInfo.start).format('HH:mm')
    const end = moment(slotInfo.end).format('HH:mm')

    const newSlot = {
      startTime: start,
      finalTime: end,
      recurrence: recurrence,
    }

    setSelectedSlot(newSlot)
  }

  const events = selectedSlot
    ? [
        {
          start: moment(selectedSlot.startTime, 'HH:mm').toDate(),
          end: moment(selectedSlot.finalTime, 'HH:mm').toDate(),
          title: `Horário de atendimento`,
        },
      ]
    : []

  const handleRecurrenceChange = (day: AvailableSlotDay) => {
    if (recurrence.includes(day)) {
      setRecurrence(recurrence.filter((d) => d !== day))
    } else {
      setRecurrence([...recurrence, day])
    }
  }

  const onSubmit = () => {
    onConfirm({ ...selectedSlot, recurrence })
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
        <div className="bg-white p-6 rounded-lg shadow-lg xl:w-[1200px] w-[1200px] sm:w-[600px] sm:overflow-auto xl:overflow-hidden sm:h-[600px] xl:h-auto">
          <h2 className="text-xl font-bold mb-4">Gerenciar Agenda</h2>
          <p className="text-sm font-normal mb-4">
            Selecione a data de operação da sua oficina.
          </p>

          <div className="my-4 gap-4 flex flex-row xl:flex-row sm:flex-col">
            <Calendar
              className="w-1/2 xl:w-1/2 sm:w-full"
              localizer={localizer}
              defaultView="day"
              views={['day']}
              step={30}
              events={events}
              min={startTime}
              max={finalTime}
              selectable
              onSelectSlot={handleSlotSelection}
              style={{ height: 500 }}
              toolbar={false}
              defaultDate={new Date()}
            />
            <div className="flex flex-col gap-2">
              <h4>Selecionar Recorrência:</h4>
              <div className="flex flex-col gap-2 ">
                {daysOfWeek.map((day) => (
                  <label key={day} className="flex flex-row gap-1">
                    <input
                      type="checkbox"
                      value={day}
                      checked={recurrence.includes(day)}
                      onChange={() => handleRecurrenceChange(day)}
                    />
                    {dayMap[day]}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Fechar
            </button>
            <button
              onClick={onSubmit}
              disabled={!selectedSlot || isLoading || !recurrence.length}
              className={`px-4 py-2 rounded ${
                recurrence.length !== 0 && selectedSlot && !isLoading
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300'
              }`}
            >
              {isLoading ? 'Carregando...' : 'Confirmar'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageAvailableSlotModal
