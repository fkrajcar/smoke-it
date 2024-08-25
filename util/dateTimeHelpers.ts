import { addSeconds, format, parseISO } from 'date-fns'

export const getTargetDateTimeIsoString = (timestamp: string) => {
  const date = parseISO(timestamp)

  return addSeconds(date, 179).toISOString()
}

export const isoToFormat = (
  dateString: string,
  customFormat = 'dd/MM/yy HH:mm'
) => {
  const utcDate = parseISO(dateString)

  return format(utcDate, customFormat)
}
