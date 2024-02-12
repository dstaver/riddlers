import clsx from 'clsx'
import { type Combo } from '../lib/constants'
import { ComboItem } from './ComboItem'

export function ComboGrid({
  items,
  vertical = false,
}: {
  items: Combo[]
  vertical?: boolean
}) {
  return (
    <div
      className={clsx('flex flex-wrap gap-x-4 gap-y-1', {
        'flex-col items-start': vertical,
      })}
    >
      {items.map(item => (
        <ComboItem key={item.numberString} item={item} />
      ))}
    </div>
  )
}
