#!/usr/bin/env yarn node --import=tsx/esm

import { group, sum } from 'radash'
import { digits } from './src/lib/constants'

type Combo = {
  sum: number
  digits: number
  numbers: number[]
  numberString: string
}
const initial = digits.map<Combo>(d => createCombo([d]))
const combinations = combine(initial, digits)
const result = {
  combinations,
  bySum: group(combinations, v => v.sum),
  byLength: group(combinations, v => v.digits),
}
console.log(result.byLength)

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
    digits: numbers.length,
    numbers,
    numberString: numbers.join(),
  }
}
