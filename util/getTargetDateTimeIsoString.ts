import addSeconds from 'date-fns/addSeconds'
import parseISO from 'date-fns/parseISO'

export const getTargetDateTimeIsoString = (timestamp: string) => {
  const date = parseISO(timestamp)

  return addSeconds(date, 299).toISOString()
}
