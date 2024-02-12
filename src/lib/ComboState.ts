import { list } from 'radash'
import { createStore } from 'zustand-x'
import {
  combinations,
  combinationsBySumAndLength,
  digits,
  type Combo,
} from './constants'

export type ComboState = {
  /** All possible combinations */
  items: [string, [string, Combo[]][]][]
  /** Combo must be one of these sums, all if empty */
  sums: number[]
  /** Combo must be one of these lengths, all if empty */
  lengths: number[]
  /** Combo include all of these digits */
  numberFilters: NumberFilterState[]
  /** Combo must not include any of these digits */
  verticalLayout: boolean
  colors: boolean
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
    items: combinationsBySumAndLength(combinations.all),
    sums: [] as number[],
    lengths: [] as number[],
    numberFilters: list<NumberFilterState>(0, 8, () => 'disabled'),
    colors: true as boolean,
    verticalLayout: false as boolean,
  },
  {
    devtools: {
      enabled: true,
    },
  },
)
  .extendSelectors((_, get) => ({
    requiredDigits: () =>
      digits.filter((n, i) => get.numberFilters()[i] === 'required'),
    excludedDigits: () =>
      digits.filter((n, i) => get.numberFilters()[i] === 'excluded'),
  }))
  .extendActions(set => {
    function reset() {
      set.state(state => {
        state.sums = [] as number[]
        state.lengths = [] as number[]
        state.numberFilters = list<NumberFilterState>(0, 8, () => 'disabled')
        state.items = getFiltered(state)
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
    function toggleRequiredSum(n: number) {
      set.state(state => {
        const index = state.sums.findIndex(sum => sum === n)
        if (index === -1) {
          state.sums.push(n)
        } else {
          state.sums.splice(index, 1)
        }
        state.items = getFiltered(state)
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
        state.items = getFiltered(state)
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
        state.items = getFiltered(state)
      }, 'toggleRequiredDigit')
    }
    return {
      reset,
      toggleColors,
      toggleLayout,
      toggleRequiredSum,
      toggleRequiredLength,
      toggleRequiredDigit,
    }
  })
export const useComboStore = comboStore.useStore
export const useComboStoreTracked = () => comboStore.useTracked

function getFiltered({ sums, lengths, numberFilters }: ComboState) {
  const requiredDigits = digits.filter(
    (n, i) => numberFilters[i] === 'required',
  )
  const excludedDigits = digits.filter(
    (n, i) => numberFilters[i] === 'excluded',
  )
  return combinationsBySumAndLength(
    combinations.all.filter(item => {
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
      if (
        excludedDigits.length &&
        item.numbers.some(n => excludedDigits.includes(n))
      ) {
        return false
      }
      return true
    }),
  )
}
