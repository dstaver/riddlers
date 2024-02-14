import { isArray, list, unique } from 'radash'
import type { Selection } from 'react-aria-components'
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
  selectedOptions: OptionKey[]
}
export type ComboActions = {
  toggleColors: () => void
  toggleLayout: () => void
  toggleRequiredSum: (n: number) => void
  toggleRequiredLength: (n: number) => void
  toggleRequiredNumber: (n: number) => void
  toggleExcludedNumber: (n: number) => void
}

export type SudokuNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type NumberFilterState = 'disabled' | 'required' | 'excluded'
export const optionKeys = [
  'colors',
  'verticalLayout',
  'excludeSumFromCombo',
] as const
export type OptionKey = (typeof optionKeys)[number]
export function isOptionKey(value: unknown): value is OptionKey {
  return optionKeys.includes(value as OptionKey)
}
export function isOptionKeys(value: unknown): value is OptionKey[] {
  return isArray(value) && value.every(isOptionKey)
}
export const comboStore = createStore('combostore')(
  {
    combinations: combinations.all,
    sums: [] as number[],
    lengths: [] as number[],
    numberFilters: list<NumberFilterState>(0, 8, () => 'disabled'),
    selectedOptions: ['colors'] as OptionKey[],
  },
  {
    devtools: {
      enabled: true,
    },
  },
)
  .extendSelectors((_, get) => ({
    colorsEnabled: () => get.state().selectedOptions.includes('colors'),
    verticalLayoutEnabled: () =>
      get.state().selectedOptions.includes('verticalLayout'),
    excludeSumFromComboEnabled: () =>
      get.state().selectedOptions.includes('excludeSumFromCombo'),
    filtered: () => getFiltered(get.state()),
    filteredNumbers: () =>
      digits
        .filter((_, i) => get.numberFilters()[i] !== 'disabled')
        .map(n => [n, get.numberFilters()[n - 1] === 'required'] as const),
    requiredNumbers: () =>
      digits.filter((_, i) => get.numberFilters()[i] === 'required'),
    requiredSumsString: () => get.sums().toSorted().join(),
    excludedNumbers: () =>
      digits.filter((_, i) => get.numberFilters()[i] === 'excluded'),
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
    function setSelectedOptions(value: string[]) {
      set.state(state => {
        if (isOptionKeys(value)) {
          state.selectedOptions = value
        }
      }, 'setSelectedOptions')
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
    function onSumsSelectionChange(selection: Selection) {
      console.log('onSumsSelectionChange', selection)
      set.state(state => {
        if (selection === 'all') {
          state.sums = []
        } else {
          state.sums = [...selection].map(n =>
            typeof n === 'number' ? n : parseInt(n, 10),
          )
        }
      }, 'onSumsSelectionChange')
    }
    function clearRequiredSums() {
      set.state(state => {
        state.sums = []
      }, 'clearRequiredSums')
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
    function toggleRequiredNumber(n: number) {
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
      }, 'toggleRequiredNumber')
    }
    return {
      reset,
      toggleRequiredSum,
      clearRequiredSums,
      onSumsSelectionChange,
      toggleRequiredLength,
      toggleRequiredNumber,
      setSelectedOptions,
    }
  })
export const useComboStore = comboStore.useStore
export const useComboStoreTracked = () => comboStore.useTracked

function getFiltered({
  sums,
  lengths,
  numberFilters,
  selectedOptions,
}: ComboState) {
  const requiredNumbers = digits.filter(
    (_, i) => numberFilters[i] === 'required',
  )
  const excludedNumbers = digits.filter(
    (_, i) => numberFilters[i] === 'excluded',
  )
  return combinations.all.filter(item => {
    if (sums.length && !sums.includes(item.sum)) {
      return false
    }
    if (lengths.length && !lengths.includes(item.length)) {
      return false
    }
    if (
      requiredNumbers.length &&
      !requiredNumbers.every(n => item.numbers.includes(n))
    ) {
      return false
    }
    const excludes = selectedOptions.includes('excludeSumFromCombo')
      ? unique([...excludedNumbers, ...item.sumArray])
      : excludedNumbers

    if (excludes.length && item.numbers.some(n => excludes.includes(n))) {
      return false
    }
    return true
  })
}
