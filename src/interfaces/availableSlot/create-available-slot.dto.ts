import { AvailableSlotDay } from './available-slot.dto'

export interface CreateAvailableSlotDTO {
  startTime: string
  finalTime: string
  workshopId: number
  recurrence: AvailableSlotDay[]
}
