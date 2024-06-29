import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import { SearchLg } from '@/app/components/base/icons/src/vender/line/general'
import { XCircle } from '@/app/components/base/icons/src/vender/solid/general'

type SearchInputProps = {
  placeholder?: string
  className?: string
  value: string
  onChange: (v: string) => void
  white?: boolean
}
const SearchInput: FC<SearchInputProps> = ({
  placeholder,
  className,
  value,
  onChange,
  white,
}) => {
  const { t } = useTranslation()
  const [focus, setFocus] = useState<boolean>(false)

  return (
    <div className={cn(
      'group flex items-center px-2 h-8 rounded-lg bg-gray-201 hover:bg-dark-200 border border-transparent overflow-hidden',
      focus && '!bg-white hover:bg-white shawdow-xs !border-dark-200',
      !focus && value && 'hover:!bg-gray-200 hover:!shawdow-xs hover:!border-black/5',
      white && '!bg-white hover:!bg-white shawdow-xs !border-gray-300 hover:!border-gray-300',
      className,
    )}>
      <div className="pointer-events-none shrink-0 flex items-center mr-1.5 justify-center w-4 h-4">
        <SearchLg className="h-3.5 w-3.5 text-gray-701" aria-hidden="true" />
      </div>
      <input
        type="text"
        name="query"
        className={cn(
          'grow block h-[18px] bg-gray-201 rounded-md border-0 text-gray-701 text-[13px] placeholder:text-gray-701 appearance-none outline-none group-hover:bg-dark-200 caret-dark-10',
          focus && '!bg-white hover:bg-white group-hover:bg-white placeholder:!text-gray-701',
          !focus && value && 'hover:!bg-gray-201 group-hover:!bg-gray-200',
          white && '!bg-white hover:!bg-white group-hover:!bg-white placeholder:!text-gray-701',
        )}
        placeholder={placeholder || t('common.operation.search')!}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        autoComplete="off"
      />
      {value && (
        <div
          className='shrink-0 flex items-center justify-center w-4 h-4 cursor-pointer group/clear'
          onClick={() => onChange('')}
        >
          <XCircle className='w-3.5 h-3.5 text-gray-400 group-hover/clear:text-gray-600' />
        </div>
      )}
    </div>
  )
}

export default SearchInput
