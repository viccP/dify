'use client'
import type { FC } from 'react'
import React from 'react'
import cn from 'classnames'
import s from './style.module.css'

type Props = {
  className?: string
  title: string
  description: string
  isChosen: boolean
  onChosen: () => void
  chosenConfig?: React.ReactNode
  icon?: JSX.Element
}

const RadioCard: FC<Props> = ({
  title,
  description,
  isChosen,
  onChosen,
  icon,
}) => {
  return (
    <div
      className={cn(s.item, isChosen && s.active, 'flex !bg-dark-120 hover:border-dark-15')}
      onClick={onChosen}
    >
      {icon}
      <div>
        <div className='flex justify-between items-center'>
          <div className='leading-5 text-sm font-medium text-gray-100'>{title}</div>
          <div className={s.radio}></div>
        </div>
        <div className='leading-[18px] text-xs font-normal text-gray-501'>{description}</div>
      </div>
    </div>
  )
}
export default React.memo(RadioCard)
