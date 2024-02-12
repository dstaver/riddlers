import clsx from 'clsx'

export function DigitButton({
  n,
  isSelected,
  disabled,
  onClick,
}: {
  /** Number to display */
  n: number
  isSelected?: boolean
  disabled?: boolean
  /** Click handler */
  onClick: (n: number) => void
}) {
  return (
    <button
      aria-selected={isSelected}
      disabled={disabled}
      className={clsx('btn flex-auto px-0', {
        'btn-outline': !isSelected,
        'btn-primary': n === 1,
        'btn-secondary': n === 2,
        'btn-accent': n === 3,
        'btn-warning': n === 4,
        'btn-info': n === 5,
        'btn-success': n === 6,
        'btn-error': n === 7,
        'btn-neutral': n === 8,
        btn: n === 8,
      })}
      key={n}
      onClick={() => onClick(n)}
    >
      {n}
    </button>
  )
}
