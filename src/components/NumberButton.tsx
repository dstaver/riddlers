import clsx from 'clsx'
import SvgExcluded from '../icons/x.svg'
export function NumberButton({
  n,
  isSelected = false,
  isExcluded = false,
  disabled = false,
  onClick,
}: {
  /** Number to display */
  n: number
  isSelected?: boolean
  isExcluded?: boolean
  disabled?: boolean
  /** Click handler */
  onClick: (n: number) => void
}) {
  return (
    <button
      aria-selected={isSelected}
      disabled={disabled}
      className={clsx('btn flex-auto px-0', {
        'btn-outline': !isSelected && !isExcluded,
        'opacity-40 grayscale': isExcluded,
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
      {isExcluded && (
        <img className="absolute size-10" src={SvgExcluded.src} alt="" />
      )}
    </button>
  )
}
