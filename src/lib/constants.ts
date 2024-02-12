import { group, list, mapValues, sum } from 'radash'
export const sums = list(1, 45)
export const digits = list(1, 9)

export type Combo = {
  /** Sum of numbers in this combination */
  sum: number
  /** Number of digits in this combination */
  length: number
  /** Numbers as array */
  numbers: number[]
  /** Numbers as string */
  numberString: string
  /** Numbers as string of length 9, with '.' for every missing number */
  numberStringFull: string
}

const initial = digits.map<Combo>(d => createCombo([d]))
const all = combine(initial, digits)
const bySum = group(all, v => v.sum) as Record<number, Combo[]>
const byLength = group(all, v => v.length) as Record<number, Combo[]>
export const combinations = {
  /** Array of all combinations */
  all,
  /** Grouped by sum */
  bySum,
  /** Grouped by length */
  byLength,
}

export function combinationsBySum(items: Combo[]) {
  return Object.entries(
    group(items, item => item.sum) as Record<number, Combo[]>,
  )
}
export function combinationsByLength(items: Combo[]) {
  return Object.entries(
    group(items, item => item.length) as Record<number, Combo[]>,
  )
}
export function combinationsBySumAndLength(items: Combo[]) {
  return Object.entries(
    mapValues(group(items, item => item.sum) as Record<number, Combo[]>, v =>
      combinationsByLength(v),
    ),
  )
}

function combine(
  arr: Combo[],
  digits: number[],
  current = 1,
  max = 9,
): Combo[] {
  const combined = arr.flatMap<Combo>(combo =>
    digits
      .filter(
        d =>
          !combo.numbers.includes(d) &&
          d > combo.numbers[combo.numbers.length - 1],
      )
      .map(d => createCombo([...combo.numbers, d])),
  )

  return [
    ...arr,
    ...(current < max ? combine(combined, digits, current + 1, max) : combined),
  ]
}
function createCombo(numbers: number[]): Combo {
  return {
    sum: sum(numbers),
    length: numbers.length,
    numbers,
    numberString: numbers.join(''),
    numberStringFull: digits
      .map(n => (numbers.includes(n) ? String(n) : '.'))
      .join(''),
  }
}
