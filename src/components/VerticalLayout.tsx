import { comboStore, useComboStore } from '../lib/ComboState'

export function VerticalLayout() {
  const verticalLayout = useComboStore().verticalLayout
  const setVerticalLayout = comboStore.set.toggleLayout
  const colors = useComboStore().colors
  const toggleColors = comboStore.set.toggleColors

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Vertical layout</span>
          <input
            className="toggle toggle-success"
            type="checkbox"
            checked={verticalLayout}
            onChange={() => setVerticalLayout()}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Colors</span>
          <input
            className="toggle toggle-success"
            type="checkbox"
            checked={colors}
            onChange={() => toggleColors()}
          />
        </label>
      </div>
    </div>
  )
}
