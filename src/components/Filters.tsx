import clsx from 'clsx'
import { useState } from 'react'
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
  const [open, setOpen] = useState(false)
  const requiredSums = useComboStore().sums
  const onClick = comboStore.set.toggleRequiredSum
  return (
    <>
      <button
        className="btn btn-success"
        onClick={() => setOpen(open => !open)}
      >
        Required sums: {requiredSums.toSorted().join()}
      </button>
      <div className="relative">
        <div
          className={clsx(
            'absolute left-0 top-full z-10 grid grid-cols-9 gap-1 bg-base-200 p-4 shadow-xl',
            {
              hidden: !open,
            },
          )}
        >
          {sums.map(sum => (
            <SumButton
              key={sum}
              sum={sum}
              onClick={onClick}
              isSelected={requiredSums.includes(sum)}
            />
          ))}
          <button className="btn btn-sm" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
      </div>
    </>
  )
}
