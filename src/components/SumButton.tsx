import clsx from 'clsx'

export function SumButton({
  sum,
  isSelected,
  disabled,
  onClick,
}: {
  /** Number to display */
  sum: number
  isSelected?: boolean
  disabled?: boolean
  /** Click handler */
  onClick: (n: number) => void
}) {
  return (
    <button
      aria-selected={isSelected}
      disabled={disabled}
      className={clsx('btn btn-neutral btn-sm aspect-square flex-auto', {
        'btn-outline': !isSelected,
      })}
      key={sum}
      onClick={() => onClick(sum)}
    >
      {sum}
    </button>
  )
}
