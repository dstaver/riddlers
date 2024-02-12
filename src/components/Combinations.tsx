import clsx from 'clsx'
import { Fragment } from 'react'
import { useComboStore } from '../lib/ComboState'
import { ComboGrid } from './ComboGrid'
import {
  ExcludedDigitsFilter,
  LengthFilter,
  RequiredDigitsFilter,
  RequiredSumsFilter,
} from './LengthFilter'
import { VerticalLayout } from './VerticalLayout'

export function Combinations() {
  const verticalLayout = useComboStore(state => state.verticalLayout)
  const filtered = useComboStore(state => state.items)
  return (
    <Fragment>
      <VerticalLayout />
      <LengthFilter />
      <RequiredDigitsFilter />
      <ExcludedDigitsFilter />
      <RequiredSumsFilter />
      <h2>Possible combinations</h2>
      <div
        className={clsx({
          'grid grid-cols-[max-content_1fr] gap-4': !verticalLayout,
          'grid grid-cols-[max-content_1fr_max-content_1fr] gap-4':
            verticalLayout,
        })}
      >
        {filtered.map(([sum, lengthItems]) => (
          <Fragment key={sum}>
            <h3 className="text-right text-2xl">{sum}</h3>
            <div className="grid grid-cols-[max-content_1fr] gap-2">
              {lengthItems.map(([length, items]) => (
                <Fragment key={length}>
                  <h3 className="border-r-4 border-r-gray-300 pr-4 text-right text-xl">
                    {length}
                  </h3>
                  <ComboGrid items={items} vertical={verticalLayout} />
                </Fragment>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </Fragment>
  )
}
