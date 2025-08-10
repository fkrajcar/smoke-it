import { addSeconds, format, fromUnixTime, parseISO } from 'date-fns'

export const getTargetDateTimeIsoString = (timestamp: string) => {
  const date = parseISO(timestamp)

  return addSeconds(date, 179).toISOString()
}

export const isoToFormat = (
  dateString: number,
  customFormat = 'dd/MM/yy HH:mm'
) => {
  const utcDate = fromUnixTime(dateString)

  return format(utcDate, customFormat)
}
