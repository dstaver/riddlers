import { list, unique } from 'radash'
import { createStore } from 'zustand-x'
import {
  combinations,
  combinationsBySumAndLength,
  digits,
  type Combo,
} from './constants'

export type ComboState = {
  /** All possible combinations */
  combinations: Combo[]
  /** Combo must be one of these sums, all if empty */
  sums: number[]
  /** Combo must be one of these lengths, all if empty */
  lengths: number[]
  /** Combo include all of these digits */
  numberFilters: NumberFilterState[]
  /** Combo must not include any of these digits */
  verticalLayout: boolean
  colors: boolean
  excludeSumFromCombo: boolean
}
export type ComboActions = {
  toggleColors: () => void
  toggleLayout: () => void
  toggleRequiredSum: (n: number) => void
  toggleRequiredLength: (n: number) => void
  toggleRequiredDigit: (n: number) => void
  toggleExcludedDigit: (n: number) => void
}

type NumberFilterState = 'disabled' | 'required' | 'excluded'

export const comboStore = createStore('combostore')(
  {
    combinations: combinations.all,
    sums: [] as number[],
    lengths: [] as number[],
    numberFilters: list<NumberFilterState>(0, 8, () => 'disabled'),
    colors: true as boolean,
    verticalLayout: false as boolean,
    excludeSumFromCombo: false as boolean,
  },
  {
    devtools: {
      enabled: true,
    },
  },
)
  .extendSelectors((_, get) => ({
    filtered: () => getFiltered(get.state()),
    requiredDigits: () =>
      digits.filter((n, i) => get.numberFilters()[i] === 'required'),
    excludedDigits: () =>
      digits.filter((n, i) => get.numberFilters()[i] === 'excluded'),
  }))
  .extendSelectors((_, get) => ({
    items: () => combinationsBySumAndLength(get.filtered()),
    commonNumbers: () =>
      digits.filter(n => get.filtered().every(v => v.numbers.includes(n))),
  }))
  .extendActions(set => {
    function reset() {
      set.state(state => {
        state.sums = [] as number[]
        state.lengths = [] as number[]
        state.numberFilters = list<NumberFilterState>(0, 8, () => 'disabled')
      }, 'reset')
    }
    function toggleColors() {
      set.state(state => {
        state.colors = !state.colors
      }, 'toggleColors')
    }
    function toggleLayout() {
      set.state(state => {
        state.verticalLayout = !state.verticalLayout
      }, 'toggleLayout')
    }
    function excludeSumFromCombo() {
      set.state(state => {
        state.excludeSumFromCombo = !state.excludeSumFromCombo
      }, 'excludeSumFromCombo')
    }
    function toggleRequiredSum(n: number) {
      set.state(state => {
        const index = state.sums.findIndex(sum => sum === n)
        if (index === -1) {
          state.sums.push(n)
        } else {
          state.sums.splice(index, 1)
        }
      }, 'toggleRequiredSum')
    }
    function toggleRequiredLength(n: number) {
      set.state(state => {
        const index = state.lengths.findIndex(length => length === n)
        if (index === -1) {
          state.lengths.push(n)
        } else {
          state.lengths.splice(index, 1)
        }
      }, 'toggleRequiredLength')
    }
    function toggleRequiredDigit(n: number) {
      set.state(state => {
        const index = n - 1
        const currentState = state.numberFilters[index]

        switch (currentState) {
          // Current state is required, switch to excluded
          case 'required':
            state.numberFilters[index] = 'excluded'
            break
          // Current state is excluded, switch to disabled
          case 'excluded':
            state.numberFilters[index] = 'disabled'
            break
          // Current state is disabled, switch to required
          case 'disabled':
            state.numberFilters[index] = 'required'
            break
        }
      }, 'toggleRequiredDigit')
    }
    return {
      reset,
      toggleColors,
      toggleLayout,
      toggleRequiredSum,
      toggleRequiredLength,
      toggleRequiredDigit,
      excludeSumFromCombo,
    }
  })
export const useComboStore = comboStore.useStore
export const useComboStoreTracked = () => comboStore.useTracked

function getFiltered({
  sums,
  lengths,
  numberFilters,
  excludeSumFromCombo,
}: ComboState) {
  const requiredDigits = digits.filter(
    (n, i) => numberFilters[i] === 'required',
  )
  const excludedDigits = digits.filter(
    (n, i) => numberFilters[i] === 'excluded',
  )
  return combinations.all.filter(item => {
    if (sums.length && !sums.includes(item.sum)) {
      return false
    }
    if (lengths.length && !lengths.includes(item.length)) {
      return false
    }
    if (
      requiredDigits.length &&
      !requiredDigits.every(n => item.numbers.includes(n))
    ) {
      return false
    }
    const excludes = excludeSumFromCombo
      ? unique([...excludedDigits, ...item.sumArray])
      : excludedDigits

    if (excludes.length && item.numbers.some(n => excludes.includes(n))) {
      return false
    }
    return true
  })
}
