export interface AvailableSlotDTO {
  id: number
  startTime: string
  finalTime: string
  workshopId: number
  day: AvailableSlotDay
}

export type AvailableSlotDay =
  | 'sun'
  | 'mon'
  | 'tue'
  | 'wed'
  | 'thu'
  | 'fri'
  | 'sat'
