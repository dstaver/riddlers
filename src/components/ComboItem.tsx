import { useComboStore, useComboStoreTracked } from '../lib/ComboState'
import { digits, type Combo } from '../lib/constants'
import { NumberItem } from './NumberItem'

export function ComboItem({
  item,
}: {
  /** Combination to display */
  item: Combo
}) {
  const verticalLayout = useComboStore().verticalLayout
  const colors = useComboStore().colors
  const common = useComboStoreTracked().commonNumbers()
  if (verticalLayout) {
    return (
      <div className="flex items-start justify-start">
        {colors ? (
          digits.map(n => (
            <NumberItem
              colorize={common.includes(n)}
              key={n}
              disabled={!item.numbers.includes(n)}
              n={n}
            />
          ))
        ) : (
          <div>{item.numberStringFull}</div>
        )}
      </div>
    )
  }
  return (
    <div className="flex items-start justify-start">
      {colors ? (
        item.numbers.map(n => (
          <NumberItem colorize={common.includes(n)} key={n} n={n} />
        ))
      ) : (
        <div>{item.numberString}</div>
      )}
    </div>
  )
}
