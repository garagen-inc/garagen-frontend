import React, { useState } from 'react'
import moment, { Moment } from 'moment'
import 'moment/locale/pt-br'
import Navbar from '../shared_components/Navbar'
import Modal from './assets/Modal'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QueryKeys } from '../../constants/enums'
import { GaragerApi } from '../../services/api'
import toast from 'react-hot-toast'
import workshopimg from '../../assets/images/workshop.jpg'
import { AvailableSlotDTO } from '../../interfaces/availableSlot/available-slot.dto'
import { useAuth } from '../../contexts/AuthContext'
import ManageAvailableSlotModal from './assets/ManageAvailableSlotModal'
import { CreateAvailableSlotDTO } from '../../interfaces/availableSlot/create-available-slot.dto'
import { CreateAppointmentDTO } from '../../interfaces/appointment/create-appointment.dto'
import { dayMap } from '../shared_components/shared_assets/constants'
import { digestApiError } from '../../utils/functions'

const Workshop: React.FC = () => {
  const { workshopId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const availableSlotMutation = useMutation({
    mutationKey: [QueryKeys.AVAILABLE_SLOTS],
    mutationFn: async (data: CreateAvailableSlotDTO) => {
      return await GaragerApi.createAvailableSlot(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AVAILABLE_SLOTS] })
      setIsOpenManageAvailableSlotsModal(false)
      toast.success('Agenda criada com sucesso!')
    },
  })

  const queryClient = useQueryClient()

  const appointmentMutation = useMutation({
    mutationKey: [QueryKeys.APPOINTMENT],
    mutationFn: async (data: CreateAppointmentDTO) => {
      return await GaragerApi.createAppointment(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.LIST_APPOINTMENT] })
      toast.success('Agendamento criado com sucesso!')
    },
    onError: (e) => {
      toast.error(digestApiError(e))
    },
  })

  const {
    data: workshop,
    error,
    isLoading: isLoadingWorkshop,
  } = useQuery({
    queryKey: [QueryKeys.WORKSHOP, workshopId],
    queryFn: async () => {
      if (!workshopId) throw new Error('No workshopId provided')
      return await GaragerApi.findWorkshop(workshopId)
    },
  })

  const { data: appointments, isLoading: isLoadingAppointments } = useQuery({
    queryKey: [QueryKeys.LIST_APPOINTMENT, workshopId],
    queryFn: async () => {
      if (!workshopId) throw new Error('No workshopId provided')
      return await GaragerApi.listAppointments(workshopId)
    },
  })

  const getAppointmentsByDate = (date: string) => {
    if (!appointments) return

    return appointments?.filter(
      (a) => a.appointment_date === moment(date).format('DD/MM/yyyy')
    )
  }

  const isUserOwnerOfThisWorkshop =
    user &&
    user.isWorkshopOwner &&
    String(user.workshop_id) === String(workshopId)

  const { data: available_slots, isLoading: isLoadingAvailableSlots } =
    useQuery({
      queryKey: [QueryKeys.AVAILABLE_SLOTS, workshopId],
      queryFn: async () => {
        if (!workshopId) throw new Error('No workshopId provided')
        return await GaragerApi.findWorkshopAvailableSlots(workshopId)
      },
    })

  if (error) {
    navigate('/')
    toast.error('Falha ao encontrar oficina')
  }

  moment.locale('pt-br')

  const [calendarDate, setCalendarDate] = useState(moment()) // Estado para a data do calendário

  const goToNextMonth = () => {
    setCalendarDate(calendarDate.clone().add(1, 'month'))
  }

  const canNavigateToPreviousMonth = calendarDate
    .clone()
    .subtract(1, 'month')
    .isSameOrAfter(moment(), 'month')
  const goToPreviousMonth = () => {
    const newDate = calendarDate.clone().subtract(1, 'month')

    if (newDate.isSameOrAfter(moment(), 'month')) {
      setCalendarDate(newDate)
    }
  }

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const startOfMonth = calendarDate.clone().startOf('month')
  const endOfMonth = calendarDate.clone().endOf('month')
  const startOfCalendar = startOfMonth.clone().startOf('week')
  const currentDate = moment()

  const days: Moment[] = []
  let day = startOfCalendar.clone()

  while (day.isBefore(endOfMonth.clone().add(1, 'week'))) {
    days.push(day.clone())
    day.add(1, 'day')
  }

  const handleDayClick = (day: Moment) => {
    setSelectedDate(day.format('YYYY-MM-DD'))
    setIsModalOpen(true)
  }

  const getSlotsForDate = (date: string): AvailableSlotDTO | undefined => {
    const dayOfWeek = moment(date).format('ddd')

    if (!available_slots) return undefined

    return available_slots.find((as) => as.day === dayMap[dayOfWeek])
  }

  const isDayNotAvailable = (date: string): boolean => {
    if (!available_slots) return true
    return !available_slots.find((as) => as.day === dayMap[date])
  }

  const handleConfirm = (data: CreateAppointmentDTO) => {
    appointmentMutation.mutateAsync(data)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedDate(null)
  }

  const [isOpenManageAvailableSlotsModal, setIsOpenManageAvailableSlotsModal] =
    useState(false)

  return (
    <>
      <Navbar />
      <div className="flex flex-1">
        <div className="w-1/4 bg-gray-100 p-4 border-r border-gray-300 ">
          {workshop && !isLoadingWorkshop ? (
            <>
              <img
                src={workshopimg}
                alt="Imagem da oficina"
                className="my-2"
              ></img>

              <h2 className="text-2xl font-bold mb-4">{workshop.name}</h2>
              <p className="text-lg mb-2">{workshop.description}</p>

              {!isUserOwnerOfThisWorkshop ? (
                <></>
              ) : (
                <>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
                    onClick={() => setIsOpenManageAvailableSlotsModal(true)}
                  >
                    Gerenciar Agenda
                  </button>
                </>
              )}
            </>
          ) : (
            <h1>Carregando...</h1>
          )}
        </div>

        {isLoadingAvailableSlots ? (
          <div className="flex-1 p-4 flex items-center justify-center">
            <h1>Carregando...</h1>
          </div>
        ) : (
          <div className="flex-1 p-4">
            <div className="flex items-center justify-center mb-4">
              <button
                disabled={!canNavigateToPreviousMonth}
                onClick={goToPreviousMonth}
                className={`text-xl font-bold p-2 hover:bg-gray-200 rounded ${
                  !canNavigateToPreviousMonth &&
                  ' hover:bg-transparent text-gray-300 '
                }`}
              >
                &lt;
              </button>
              <div className="text-center text-2xl font-bold mx-4 w-[300px]">
                {calendarDate.format('MMMM YYYY')}
              </div>
              <button
                onClick={goToNextMonth}
                className="text-xl font-bold p-2 hover:bg-gray-200 rounded"
              >
                &gt;
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center mb-4">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(
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
                    day.isBefore(currentDate, 'day')
                      ? 'bg-blue-100'
                      : day.isSame(currentDate, 'day') // verifica se é o dia atual
                      ? 'bg-blue-50 border-blue-500 border-2'
                      : !day.isSame(
                          startOfMonth.clone().startOf('month'),
                          'month'
                        )
                      ? 'bg-gray-300'
                      : isDayNotAvailable(day.format('ddd'))
                      ? 'bg-red-100'
                      : 'bg-gray-200'
                  } rounded`}
                >
                  <button
                    disabled={
                      day.isBefore(calendarDate, 'day') ||
                      isDayNotAvailable(day.format('ddd'))
                    }
                    onClick={() => handleDayClick(day)}
                    className={`flex items-center justify-center w-full h-full flex-col ${
                      isDayNotAvailable(day.format('ddd')) &&
                      'text-red-600 font-bold'
                    }`}
                  >
                    {day.format('D')}
                    {isDayNotAvailable(day.format('ddd')) && (
                      <p className="relative text-[10px] font-bold text-red-600">
                        {'Fechado'}
                      </p>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isOpenManageAvailableSlotsModal && (
        <ManageAvailableSlotModal
          onClose={() => setIsOpenManageAvailableSlotsModal(false)}
          isLoading={availableSlotMutation.isPending}
          onConfirm={(createAvailableSlot) => {
            availableSlotMutation.mutateAsync({
              ...createAvailableSlot,
              workshopId: Number(workshopId),
            })
          }}
        />
      )}

      {selectedDate && workshop && (
        <Modal
          workshop_id={workshop.id}
          isOpen={isModalOpen}
          selectedDate={selectedDate}
          onClose={handleCloseModal}
          appointments={getAppointmentsByDate(selectedDate)}
          title={`Horários disponíveis para ${moment(selectedDate).format(
            'DD'
          )} de ${moment(selectedDate).format('MMMM')} de ${moment(
            selectedDate
          ).format('YYYY')}`}
          availableSlot={getSlotsForDate(selectedDate)}
          isLoading={appointmentMutation.isPending || isLoadingAppointments}
          onConfirm={handleConfirm}
        />
      )}
    </>
  )
}

export default Workshop
