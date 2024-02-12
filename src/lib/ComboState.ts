import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
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
}
export type ComboActions = {
  toggleLayout: () => void
  toggleRequiredSum: (n: number) => void
  toggleRequiredLength: (n: number) => void
  toggleRequiredDigit: (n: number) => void
  toggleExcludedDigit: (n: number) => void
}

export const useComboStore = create<ComboState & ComboActions>()(
  immer(set => {
    const result = {
      items: combinationsBySumAndLength(combinations.all),
      sums: [],
      lengths: [],
      requiredDigits: [],
      excludedDigits: [],
      verticalLayout: false,
      toggleLayout: () =>
        set(state => {
          state.verticalLayout = !state.verticalLayout
        }),
      toggleRequiredSum: n =>
        set(state => {
          const index = state.sums.findIndex(sum => sum === n)
          if (index === -1) {
            state.sums.push(n)
          } else {
            state.sums.splice(index, 1)
          }
          state.items = getFiltered(state)
        }),
      toggleRequiredLength: n =>
        set(state => {
          const index = state.lengths.findIndex(length => length === n)
          if (index === -1) {
            state.lengths.push(n)
          } else {
            state.lengths.splice(index, 1)
          }
          state.items = getFiltered(state)
        }),
      toggleRequiredDigit: n =>
        set(state => {
          const index = state.requiredDigits.findIndex(sum => sum === n)
          if (index === -1 && !state.excludedDigits.includes(n)) {
            state.requiredDigits.push(n)
          } else {
            state.requiredDigits.splice(index, 1)
          }
          state.items = getFiltered(state)
        }),
      toggleExcludedDigit: n =>
        set(state => {
          const index = state.excludedDigits.findIndex(sum => sum === n)
          if (index === -1 && !state.requiredDigits.includes(n)) {
            state.excludedDigits.push(n)
          } else {
            state.excludedDigits.splice(index, 1)
          }
          state.items = getFiltered(state)
        }),
    } as const satisfies ComboState & ComboActions
    return result
  }),
)

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
