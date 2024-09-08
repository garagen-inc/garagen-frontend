import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { AvailableSlotDTO } from '../../../interfaces/availableSlot/available-slot.dto'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CreateAppointmentDTO } from '../../../interfaces/appointment/create-appointment.dto'
import { useAuth } from '../../../contexts/AuthContext'
import { dayMap } from '../../shared_components/shared_assets/constants'
import { AppointmentDTO } from '../../../interfaces/appointment/appointment.dto'
import toast from 'react-hot-toast'

interface ModalProps {
  isOpen: boolean
  isUserOwnerOfThisWorkshop: boolean | null
  onClose: () => void
  title: string
  selectedDate: string
  availableSlot?: AvailableSlotDTO
  isLoading: boolean
  onConfirm: (data: CreateAppointmentDTO) => void
  workshop_id: number
  appointments?: AppointmentDTO[]
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  isUserOwnerOfThisWorkshop,
  title,
  availableSlot,
  isLoading,
  appointments,
  selectedDate,
  onConfirm,
  workshop_id,
}) => {
  const { user } = useAuth()
  const [slot, setSlot] = useState<CreateAppointmentDTO | undefined>()

  useEffect(() => {
    if (!isLoading) setSlot(undefined)
  }, [appointments, isLoading])

  if (!isOpen) return <></>
  const localizer = momentLocalizer(moment)
  const startTime = availableSlot
    ? moment(availableSlot.startTime, 'HH:mm').toDate()
    : undefined
  const finalTime = availableSlot
    ? moment(availableSlot.finalTime, 'HH:mm').toDate()
    : undefined

  const isSlotAvailable = (
    start: string,
    end: string,
    events: AppointmentDTO[]
  ): boolean => {
    const startMoment = moment(start, 'HH:mm')
    const endMoment = moment(end, 'HH:mm')

    return events.some((event: AppointmentDTO) => {
      const eventStart = moment(event.start_time, 'HH:mm')
      const eventEnd = moment(event.final_time, 'HH:mm')

      return startMoment.isBefore(eventEnd) && endMoment.isAfter(eventStart)
    })
  }

  const handleSlotSelection = (slotInfo: any) => {
    if (!user) {
      toast.error('Você precisa estar logado para criar um agendamento!')
      return
    }

    const start = moment(slotInfo.start).format('HH:mm')
    const end = moment(slotInfo.end).format('HH:mm')
    const isAvailable = appointments
      ? isSlotAvailable(start, end, appointments)
      : true

    if (isAvailable) {
      toast.error('Esse horário está indisponível!')
      setSlot(undefined)
      return
    }

    const dayOfWeek = moment(selectedDate).format('ddd')
    const day = dayMap[dayOfWeek]

    const appointment_date = moment(selectedDate).format('DD/MM/yyyy')
    const newSlot: CreateAppointmentDTO = {
      start_time: start,
      final_time: end,
      appointment_date,
      day,
      user_id: user.id,
      workshop_id,
    }

    setSlot(newSlot)
  }

  const events = slot
    ? [
        {
          start: moment(slot.start_time, 'HH:mm').toDate(),
          end: moment(slot.final_time, 'HH:mm').toDate(),
          title: `Agendar horário`,
        },
      ]
    : []

  const eventPropGetter = (event: any) => {
    let backgroundColor = '#ffd23f'
    let color = '#000'

    if (event.title === 'Horário indisponível') {
      backgroundColor = '#f4442E'
      color = '#fff'
    }
    if (event.title === 'Agendado por você') {
      backgroundColor = '#06bcc1'
      color = '#fff'
    }

    return {
      style: {
        color,
        backgroundColor,
        border: 'none',
      },
    }
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[800px]">
          <h2 className="text-xl font-bold mb-4">{title}</h2>

          <div className="mb-4">
            {availableSlot ? (
              <Calendar
                localizer={localizer}
                events={[
                  ...events,
                  ...(appointments || []).map((a) => ({
                    start: moment(a.start_time, 'HH:mm').toDate(),
                    end: moment(a.final_time, 'HH:mm').toDate(),
                    title:
                      a.user_id === user?.id
                        ? 'Agendado por você'
                        : isUserOwnerOfThisWorkshop
                        ? `Agendado por ${a.user_name}`
                        : 'Horário indisponível',
                  })),
                ]}
                defaultView="day"
                views={['day']}
                step={30}
                min={startTime}
                max={finalTime}
                selectable
                toolbar={false}
                onSelectSlot={(slotInfo) => handleSlotSelection(slotInfo)}
                style={{ height: 400 }}
                eventPropGetter={eventPropGetter}
              />
            ) : (
              <p>Nenhum horário disponível.</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              disabled={isLoading}
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Fechar
            </button>
            <button
              onClick={() => slot && onConfirm(slot)}
              disabled={!slot || isLoading}
              className={`px-4 py-2 rounded ${
                slot && !isLoading ? 'bg-blue-500 text-white' : 'bg-gray-300'
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

export default Modal
