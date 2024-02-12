import { createStore } from 'zustand-x'
import {
  combinations,
  combinationsBySumAndLength,
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
  requiredDigits: number[]
  /** Combo must not include any of these digits */
  excludedDigits: number[]
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

export const comboStore = createStore('combostore')(
  {
    items: combinationsBySumAndLength(combinations.all),
    sums: [] as number[],
    lengths: [] as number[],
    requiredDigits: [] as number[],
    excludedDigits: [] as number[],
    colors: true as boolean,
    verticalLayout: false as boolean,
  },
  {
    devtools: {
      enabled: true,
    },
  },
).extendActions(set => {
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
      const index = state.requiredDigits.findIndex(sum => sum === n)
      if (index === -1 && !state.excludedDigits.includes(n)) {
        state.requiredDigits.push(n)
      } else {
        state.requiredDigits.splice(index, 1)
      }
      state.items = getFiltered(state)
    }, 'toggleRequiredDigit')
  }
  function toggleExcludedDigit(n: number) {
    set.state(state => {
      const index = state.excludedDigits.findIndex(sum => sum === n)
      if (index === -1 && !state.requiredDigits.includes(n)) {
        state.excludedDigits.push(n)
      } else {
        state.excludedDigits.splice(index, 1)
      }
      state.items = getFiltered(state)
    }, 'toggleExcludedDigit')
  }
  return {
    toggleColors,
    toggleLayout,
    toggleRequiredSum,
    toggleRequiredLength,
    toggleRequiredDigit,
    toggleExcludedDigit,
  }
})
export const useComboStore = comboStore.useStore
function getFiltered({
  sums,
  lengths,
  requiredDigits,
  excludedDigits,
}: ComboState) {
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
