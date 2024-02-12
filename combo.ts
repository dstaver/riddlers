#!/usr/bin/env yarn node --import=tsx/esm

import { flat, listify } from 'radash'
import { combinations } from './src/lib/constants'
const data = flat(
  listify(combinations.bySum, (k, v) =>
    v.map(c => `${c.sum  } - ${  c.numberString}`),
  ),
).join('\n')

console.log(data)
