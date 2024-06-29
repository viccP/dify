import type { FC } from 'react'
import { CheckCircle } from '@/app/components/base/icons/src/vender/solid/general'

type InputProps = {
  value?: string
  onChange: (v: string) => void
  onFocus?: () => void
  placeholder?: string
  validated?: boolean
  className?: string
  disabled?: boolean
  type?: string
  min?: number
  max?: number
}
const Input: FC<InputProps> = ({
  value,
  onChange,
  onFocus,
  placeholder,
  validated,
  className,
  disabled,
  type = 'text',
  min,
  max,
}) => {
  const toLimit = (v: string) => {
    const minNum = parseFloat(`${min}`)
    const maxNum = parseFloat(`${max}`)
    if (!isNaN(minNum) && parseFloat(v) < minNum) {
      onChange(`${min}`)
      return
    }

    if (!isNaN(maxNum) && parseFloat(v) > maxNum)
      onChange(`${max}`)
  }
  return (
    <div className='relative'>
      <input
        tabIndex={0}
        className={`
          block px-3 w-full h-9 bg-dark-101 text-sm rounded-lg border border-transparent
          appearance-none outline-none caret-dark-0 text-gray-100

          placeholder:text-sm placeholder:text-dark-500
          ${validated && 'pr-[30px]'}
          ${className}
        `}
        // hover:border-[rgba(0,0,0,0.08)] hover:bg-gray-50
        // focus:bg-white focus:border-gray-300 focus:shadow-xs
        placeholder={placeholder || ''}
        onChange={e => onChange(e.target.value)}
        onBlur={e => toLimit(e.target.value)}
        onFocus={onFocus}
        value={value || ''}
        disabled={disabled}
        type={type}
        min={min}
        max={max}
      />
      {
        validated && (
          <div className='absolute top-2.5 right-2.5'>
            <CheckCircle className='w-4 h-4 text-[#039855]' />
          </div>
        )
      }
    </div>
  )
}

export default Input
