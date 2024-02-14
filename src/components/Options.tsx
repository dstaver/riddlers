import { Fragment, type ReactNode } from 'react'
import { Checkbox, CheckboxGroup } from 'react-aria-components'
import { comboStore, useComboStore, type OptionKey } from '../lib/ComboState'

export function Options() {
  const options = useComboStore().selectedOptions
  const { setSelectedOptions } = comboStore.set
  return (
    <CheckboxGroup
      className="flex flex-col gap-2"
      value={options}
      onChange={setSelectedOptions}
      aria-label="Options"
    >
      <OptionItem value="verticalLayout">Vertical</OptionItem>
      <OptionItem value="colors">Colors</OptionItem>
      <OptionItem value="excludeSumFromCombo">Exclude own sum</OptionItem>
    </CheckboxGroup>
  )
}

function OptionItem({
  value,
  children,
}: {
  value: OptionKey
  children: ReactNode
}) {
  return (
    <Checkbox className="flex gap-2" value={value}>
      {({ isSelected }) => (
        <Fragment>
          <div
            className="checkbox-primary checkbox"
            aria-checked={isSelected}
            aria-hidden={true}
          ></div>
          {children}
        </Fragment>
      )}
    </Checkbox>
  )
}
