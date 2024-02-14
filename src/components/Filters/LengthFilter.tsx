import { comboStore, useComboStore } from '../../lib/ComboState'
import { digits } from '../../lib/constants'
import { NumberButton } from '../NumberButton'

export function LengthFilter() {
  const lengths = useComboStore().lengths
  const onClick = comboStore.set.toggleRequiredLength
  return (
    <div>
      <h2>
        <strong>Number of digits:</strong> {lengths.toSorted().join()}
      </h2>
      <div className="flex w-full gap-1">
        {digits.map(n => (
          <NumberButton
            key={n}
            n={n}
            onClick={onClick}
            isSelected={lengths.includes(n)}
          />
        ))}
      </div>
    </div>
  )
}
