import { Fragment } from 'react'
import { Separator } from 'react-aria-components'
import { useComboStore, useComboStoreTracked } from '../lib/ComboState'
import { ComboGrid } from './ComboGrid'
import { Filters } from './Filters/Filters'

export function Combinations() {
  const { selectedOptions } = useComboStore()
  const verticalLayout = selectedOptions.includes('verticalLayout')
  const filtered = useComboStoreTracked().filtered()
  const items = useComboStoreTracked().items()
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_2fr]">
      <Filters />
      <h2>
        <strong>{filtered.length}</strong> Possible combinations:
      </h2>
      {items.length && (
        <div className="grid grid-cols-[2em_4em_1fr] gap-x-4 gap-y-1 pt-4">
          <div className="text-right font-bold">Sum</div>
          <div className="border-r-2 border-r-gray-300 pr-4 text-right font-bold">
            Size
          </div>
          <div />
          {items.map(([sum, lengthItems]) => (
            <Fragment key={sum}>
              <Separator className="col-span-full col-start-1" />
              <div className="text-right">{sum}</div>
              {lengthItems.map(([length, items]) => (
                <Fragment key={length}>
                  <div className="text-md col-start-2 border-r-2 border-r-gray-300 pr-4 text-right">
                    {length}
                  </div>
                  <ComboGrid items={items} vertical={verticalLayout} />
                </Fragment>
              ))}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  )
}
