import { AvailableSlotDay } from '../../../interfaces/availableSlot/available-slot.dto'

export const navElements = [
  { label: 'Features', href: '#' },
  { label: 'Uso', href: '#' },
  { label: 'Comentários', href: '#' },
  { label: 'Contato', href: '#' },
]

export const dayMap: { [key: string]: AvailableSlotDay } = {
  dom: 'sun',
  seg: 'mon',
  ter: 'tue',
  qua: 'wed',
  qui: 'thu',
  sex: 'fri',
  sab: 'sat',
  sáb: 'sat',
}
