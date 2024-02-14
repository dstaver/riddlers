import { Fragment } from 'react'
import { comboStore, useComboStoreTracked } from '../../lib/ComboState'
import { digits } from '../../lib/constants'
import { NumberButton } from '../NumberButton'

export function RequiredNumbersFilter() {
  const filteredNumbers = useComboStoreTracked().filteredNumbers()
  const requiredNumbers = useComboStoreTracked().requiredNumbers()
  const excludedNumbers = useComboStoreTracked().excludedNumbers()
  const onClick = comboStore.set.toggleRequiredNumber
  return (
    <div>
      <h2>
        <strong>Filter numbers: </strong>
        {filteredNumbers.map(([n, isEnabled], i) => {
          const separator = i < filteredNumbers.length - 1 ? ',' : ''
          return (
            <Fragment key={n}>
              {isEnabled ? (
                <span key={n} className="join-item">
                  {n}
                </span>
              ) : (
                <span key={n} className="join-item text-error line-through">
                  {n}
                </span>
              )}
              <span>{separator}</span>
            </Fragment>
          )
        })}
      </h2>
      <div className="flex w-full gap-1">
        {digits.map(n => (
          <NumberButton
            key={n}
            n={n}
            isExcluded={excludedNumbers.includes(n)}
            onClick={onClick}
            isSelected={requiredNumbers.includes(n)}
          />
        ))}
      </div>
    </div>
  )
}
