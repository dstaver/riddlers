import { Label, ListBox, ListBoxItem } from 'react-aria-components'
import { comboStore, useComboStoreTracked } from '../../lib/ComboState'
import { sumCollection } from '../../lib/constants'

export function RequiredSumsFilter() {
  const requiredSums = useComboStoreTracked().sums()
  const requiredSumsString = useComboStoreTracked().requiredSumsString()
  const { onSumsSelectionChange, clearRequiredSums } = comboStore.set

  const id = 'required-sums-label'
  return (
    <div className="collapse collapse-arrow rounded-none">
      <input type="checkbox" />
      <Label id={id} className="btn collapse-title ">
        Required sums:{' '}
        {<span className="text-success">{requiredSumsString}</span> || (
          <span className="text-gray-400">None selected</span>
        )}
      </Label>
      <div className="collapse-content mt-2 flex flex-col gap-2 rounded-lg bg-base-100 p-0">
        <ListBox
          aria-labelledby={id}
          layout="grid"
          items={sumCollection}
          selectedKeys={requiredSums}
          onSelectionChange={onSumsSelectionChange}
          selectionMode="multiple"
        >
          {item => (
            <ListBoxItem
              textValue={item.name}
              className="btn btn-sm ring-offset-2 selected:btn-success"
            >
              {item.name}
            </ListBoxItem>
          )}
        </ListBox>
        <button
          disabled={!requiredSums.length}
          onClick={() => clearRequiredSums()}
          className="btn btn-error"
        >
          Clear
        </button>
      </div>
    </div>
  )
}
