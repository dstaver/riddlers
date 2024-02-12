import clsx from 'clsx'
import { type Combo } from '../lib/constants'

export function NumberItem({
  n,
  items,
  disabled,
}: {
  /** Number to display */
  n: number
  /** The group the item is a part of */
  items: Combo[]
  disabled?: boolean
}) {
  const nInEveryItem =
    !disabled && items.every(item => item.numbers.includes(n))
  return (
    <div
      className={clsx('flex-auto px-1', {
        'bg-gray-200': !nInEveryItem,
        'opacity-10': disabled,
        'bg-primary text-primary-content': nInEveryItem && n === 1,
        'bg-secondary text-secondary-content': nInEveryItem && n === 2,
        'bg-accent text-accent-content': nInEveryItem && n === 3,
        'bg-warning text-warning-content': nInEveryItem && n === 4,
        'bg-info text-info-content': nInEveryItem && n === 5,
        'bg-success text-success-content': nInEveryItem && n === 6,
        'bg-error text-error-content': nInEveryItem && n === 7,
        'bg-black text-white': nInEveryItem && n === 8,
        'bg-gray-500 text-white': nInEveryItem && n === 9,
      })}
    >
      {n}
    </div>
  )
}
