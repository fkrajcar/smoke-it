interface DateTimeDisplayProps {
  value: number
  type: string
  isDanger?: boolean
}

export const DateTimeDisplay = ({
  value,
  type,
  isDanger,
}: DateTimeDisplayProps) => {
  return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  )
}
