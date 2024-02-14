import clsx from 'clsx'
import { useState } from 'react'
import { SvgCloseIcon } from '../Icons/SvgCloseIcon'
import { SvgFilterIcon } from '../Icons/SvgFilterIcon'
import { Options } from '../Options'
import { LengthFilter } from './LengthFilter'
import { RequiredNumbersFilter } from './RequiredNumbersFilter'
import { RequiredSumsFilter } from './RequiredSumsFilter'

export function Filters() {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={clsx(
        'fixed inset-x-0 bottom-20 bg-white shadow-2xl duration-200',
        {
          'translate-y-full animate-in slide-in-from-bottom-full': !open,
          'translate-y-20 animate-in slide-in-from-bottom-full': open,
        },
      )}
    >
      <div className="flex flex-col gap-4 rounded-none bg-white p-4 pb-12">
        <button
          onClick={() => setOpen(v => !v)}
          className="btn btn-circle btn-success absolute right-4 top-4 text-white"
        >
          {open ? <SvgCloseIcon /> : <SvgFilterIcon />}
        </button>
        <Options />
        <LengthFilter />
        <RequiredNumbersFilter />
        <RequiredSumsFilter />
      </div>
    </div>
  )
}
