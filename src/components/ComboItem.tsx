import { useComboStore } from '../lib/ComboState'
import { digits, type Combo } from '../lib/constants'
import { NumberItem } from './NumberItem'

export function ComboItem({
  item,
  items,
}: {
  /** Combination to display */
  item: Combo
  /** The group the item is a part of */
  items: Combo[]
}) {
  const verticalLayout = useComboStore().verticalLayout
  const colors = useComboStore().colors

  if (verticalLayout) {
    return (
      <div className="flex items-start justify-start">
        {colors ? (
          digits.map(n => (
            <NumberItem
              key={n}
              disabled={!item.numbers.includes(n)}
              n={n}
              items={items}
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
        item.numbers.map(n => <NumberItem key={n} n={n} items={items} />)
      ) : (
        <div>{item.numberString}</div>
      )}
    </div>
  )
}
