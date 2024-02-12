import { Fragment } from 'react'
import { useComboStore } from '../lib/ComboState'
import { ComboGrid } from './ComboGrid'
import { LengthFilter, RequiredDigitsFilter } from './Filters'
import { Toggles } from './Toggles'

export function Combinations() {
  const verticalLayout = useComboStore().verticalLayout
  const filtered = useComboStore().items
  return (
    <Fragment>
      <Toggles />
      <LengthFilter />
      <RequiredDigitsFilter />
      <h2>Possible combinations</h2>
      <div className="grid grid-cols-[max-content_1fr] gap-x-4">
        {filtered.map(([sum, lengthItems]) => (
          <Fragment key={sum}>
            <h3 className="text-right text-2xl">{sum}</h3>
            <div className="grid grid-cols-[max-content_1fr] gap-x-2">
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
