import { comboStore, useComboStore } from '../lib/ComboState'

export function VerticalLayout() {
  const verticalLayout = useComboStore().verticalLayout
  const setVerticalLayout = comboStore.set.toggleLayout
  const reset = comboStore.set.reset
  const colors = useComboStore().colors
  const toggleColors = comboStore.set.toggleColors

  return (
    <div className="flex justify-start gap-4">
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
      <button className="btn btn-warning btn-wide" onClick={reset}>
        Reset
      </button>
    </div>
  )
}
