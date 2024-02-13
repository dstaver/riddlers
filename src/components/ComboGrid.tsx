import clsx from 'clsx'
import { Fragment } from 'react'
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
      className={clsx('flex flex-wrap gap-px pb-px', {
        'flex-col items-start': vertical,
      })}
    >
      {items.map((item, i) => (
        <Fragment key={item.numberString}>
          <ComboItem item={item} last={i === items.length - 1} />
        </Fragment>
      ))}
    </div>
  )
}
