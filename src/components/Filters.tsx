import { comboStore, useComboStore } from '../lib/ComboState'
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
  const requiredDigits = useComboStore().requiredDigits
  const excludedDigits = useComboStore().excludedDigits
  const onClick = comboStore.set.toggleRequiredDigit
  return (
    <>
      <h2>Required digits: {requiredDigits.toSorted().join()}</h2>
      <div className="flex w-full gap-1">
        {digits.map(n => (
          <DigitButton
            key={n}
            n={n}
            disabled={excludedDigits.includes(n)}
            onClick={onClick}
            isSelected={requiredDigits.includes(n)}
          />
        ))}
      </div>
    </>
  )
}
export function ExcludedDigitsFilter() {
  const requiredDigits = useComboStore().requiredDigits
  const excludedDigits = useComboStore().excludedDigits
  const onClick = comboStore.set.toggleExcludedDigit
  return (
    <>
      <h2>Excluded digits: {excludedDigits.toSorted().join()}</h2>
      <div className="flex w-full gap-1">
        {digits.map(n => (
          <DigitButton
            key={n}
            n={n}
            disabled={requiredDigits.includes(n)}
            onClick={onClick}
            isSelected={excludedDigits.includes(n)}
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
    <>
      <h2>Required sums: {requiredSums.toSorted().join()}</h2>
      <div className="flex w-full flex-wrap justify-start gap-1">
        {sums.map(sum => (
          <SumButton
            key={sum}
            sum={sum}
            onClick={onClick}
            isSelected={requiredSums.includes(sum)}
          />
        ))}
      </div>
    </>
  )
}
