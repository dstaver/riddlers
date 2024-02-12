import {
  comboStore,
  useComboStore,
  useComboStoreTracked,
} from '../lib/ComboState'
import { digits, sums } from '../lib/constants'
import { DigitButton } from './DigitButton'
import { SumButton } from './SumButton'

export function LengthFilter() {
  const lengths = useComboStore().lengths
  const onClick = comboStore.set.toggleRequiredLength
  return (
    <>
      <h2>Number of digits: {lengths.toSorted().join()}</h2>
      <div className="flex w-full gap-1">
        {digits.map(n => (
          <DigitButton
            key={n}
            n={n}
            onClick={onClick}
            isSelected={lengths.includes(n)}
          />
        ))}
      </div>
    </>
  )
}
export function RequiredDigitsFilter() {
  const requiredDigits = useComboStoreTracked().requiredDigits()
  const excludedDigits = useComboStoreTracked().excludedDigits()
  const onClick = comboStore.set.toggleRequiredDigit
  const requiredStr = requiredDigits.toSorted().join()
  const excludedStr = excludedDigits.toSorted().join()
  return (
    <>
      <h2>
        Required digits: {requiredStr}{' '}
        {excludedStr && <span>Exclude {excludedStr}</span>}
      </h2>
      <div className="flex w-full gap-1">
        {digits.map(n => (
          <DigitButton
            key={n}
            n={n}
            isExcluded={excludedDigits.includes(n)}
            onClick={onClick}
            isSelected={requiredDigits.includes(n)}
          />
        ))}
      </div>
    </>
  )
}
export function RequiredSumsFilter() {
  const requiredSums = useComboStore().sums
  const onClick = comboStore.set.toggleRequiredSum
  return (
    <div
      tabIndex={0}
      className="collapse collapse-plus relative border border-base-300 bg-base-200"
    >
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">
        Required sums: {requiredSums.toSorted().join()}
      </div>
      <div className="collapse-content grid grid-cols-9 gap-1">
        {sums.map(sum => (
          <SumButton
            key={sum}
            sum={sum}
            onClick={onClick}
            isSelected={requiredSums.includes(sum)}
          />
        ))}
      </div>
    </div>
  )
}
