import { AvailableSlotDay } from '../availableSlot/available-slot.dto'

export interface CreateAppointmentDTO {
  start_time: string
  final_time: string
  user_id: number
  day: AvailableSlotDay
  workshop_id: number
  appointment_date: string
}
