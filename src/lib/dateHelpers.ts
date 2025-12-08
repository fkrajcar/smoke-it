import { format, fromUnixTime } from 'date-fns'

/**
 * Converts Unix timestamp to formatted date string
 * @param timestamp - Unix timestamp in seconds
 * @param formatString - Date format string (default: 'dd/MM/yyyy HH:mm')
 * @returns Formatted date string
 */
export const formatUnixTimestamp = (
  timestamp: number,
  formatString = 'dd/MM/yyyy HH:mm'
): string => {
  try {
    return format(fromUnixTime(timestamp), formatString)
  } catch (error) {
    console.error('Error formatting timestamp:', error)
    return 'Invalid date'
  }
}

/**
 * Converts ISO string or timestamp to formatted date
 * @param dateInput - ISO string or Unix timestamp
 * @returns Formatted date string
 */
export const isoToFormat = (dateInput: string | number): string => {
  if (typeof dateInput === 'number') {
    return formatUnixTimestamp(dateInput)
  }

  try {
    const date = new Date(dateInput)
    return format(date, 'dd/MM/yyyy HH:mm')
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Invalid date'
  }
}
