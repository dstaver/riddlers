import { useComboStore } from '../lib/ComboState'

export function VerticalLayout() {
  const verticalLayout = useComboStore(state => state.verticalLayout)
  const setVerticalLayout = useComboStore(state => state.toggleLayout)
  return (
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
  )
}
