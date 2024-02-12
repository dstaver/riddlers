import { comboStore, useComboStore } from '../lib/ComboState'
import { RequiredSumsFilter } from './Filters'

export function Toggles() {
  const verticalLayout = useComboStore().verticalLayout
  const setVerticalLayout = comboStore.set.toggleLayout
  const excludeSumFromCombo = useComboStore().excludeSumFromCombo
  const setExcludeSumFromCombo = comboStore.set.excludeSumFromCombo
  const reset = comboStore.set.reset
  const colors = useComboStore().colors
  const toggleColors = comboStore.set.toggleColors

  return (
    <div className="flex flex-wrap justify-start gap-4">
      <div className="form-control">
        <label className="label gap-2">
          <span className="label-text">Vertical</span>
          <input
            className="toggle toggle-success"
            type="checkbox"
            checked={verticalLayout}
            onChange={() => setVerticalLayout()}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label gap-2">
          <span className="label-text">Colors</span>
          <input
            className="toggle toggle-success"
            type="checkbox"
            checked={colors}
            onChange={() => toggleColors()}
          />
        </label>
      </div>
      <button className="btn btn-warning" onClick={reset}>
        Reset
      </button>
      <div className="form-control">
        <label className="label gap-2">
          <span className="label-text">
            Combination can't contain its own sum
          </span>
          <input
            className="toggle toggle-success"
            type="checkbox"
            checked={excludeSumFromCombo}
            onChange={() => setExcludeSumFromCombo()}
          />
        </label>
      </div>
      <div className="w-full">
        <RequiredSumsFilter />
      </div>
    </div>
  )
}
