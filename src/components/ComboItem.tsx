import { useComboStoreTracked } from '../lib/ComboState'
import { digits, type Combo } from '../lib/constants'
import { NumberItem } from './NumberItem'

export function ComboItem({
  item,
  last = false,
}: {
  /** Combination to display */
  item: Combo
  last?: boolean
}) {
  const verticalLayout = useComboStoreTracked().verticalLayoutEnabled()
  const colors = useComboStoreTracked().colorsEnabled()
  const common = useComboStoreTracked().commonNumbers()
  if (verticalLayout) {
    return (
      <div className="flex items-start justify-start gap-x-px">
        {colors ? (
          digits.map(n => (
            <NumberItem
              key={n}
              colorize={common.includes(n)}
              disabled={!item.numbers.includes(n)}
              n={n}
            />
          ))
        ) : (
          <div>{item.numberStringFull}</div>
        )}
        {!last && <div className="px-1">&nbsp;</div>}
      </div>
    )
  }
  return (
    <div className="flex items-start justify-start gap-x-px">
      {colors ? (
        item.numbers.map(n => (
          <NumberItem key={n} colorize={common.includes(n)} n={n} />
        ))
      ) : (
        <div>{item.numberString}</div>
      )}
      {!last && <div className="px-1">&nbsp;</div>}
    </div>
  )
}
