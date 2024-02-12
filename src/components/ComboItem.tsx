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
  const verticalLayout = useComboStore(state => state.verticalLayout)

  if (verticalLayout) {
    return (
      <div className="flex items-start justify-start">
        {digits.map(n => (
          <NumberItem
            key={n}
            disabled={!item.numbers.includes(n)}
            n={n}
            items={items}
          />
        ))}
      </div>
    )
  }
  return (
    <div className="flex items-start justify-start">
      {item.numbers.map(n => (
        <NumberItem key={n} n={n} items={items} />
      ))}
    </div>
  )
}
