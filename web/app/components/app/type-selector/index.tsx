import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'
import cn from 'classnames'
import {
  PortalToFollowElem,
  PortalToFollowElemContent,
  PortalToFollowElemTrigger,
} from '@/app/components/base/portal-to-follow-elem'
import { ChevronDown } from '@/app/components/base/icons/src/vender/line/arrows'
import { Check, DotsGrid } from '@/app/components/base/icons/src/vender/line/general'
import { XCircle } from '@/app/components/base/icons/src/vender/solid/general'
import { ChatBot, CuteRobote } from '@/app/components/base/icons/src/vender/solid/communication'
import { Route } from '@/app/components/base/icons/src/vender/solid/mapsAndTravel'
export type AppSelectorProps = {
  value: string
  onChange: (value: string) => void
}

const AppTypeSelector = ({ value, onChange }: AppSelectorProps) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <PortalToFollowElem
      open={open}
      onOpenChange={setOpen}
      placement='bottom-start'
      offset={4}
    >
      <div className='relative'>
        <PortalToFollowElemTrigger
          onClick={() => setOpen(v => !v)}
          className='block'
        >
          <div className={cn(
            'flex items-center gap-1 h-8 text-dark-0 text-[13px] leading-[18px] cursor-pointer px-2 rounded-lg bg-dark-15 shadow-xs',
            open && !value && '!bg-dark-15 hover:!bg-dark-15',
            !!value && '!bg-dark-15  hover:!bg-dark-15 ',
          )}>
            {!value && (
              <>
                <div className='w-4 h-4 p-[1px]'>
                  <DotsGrid className='w-3.5 h-3.5' />
                </div>
                <div className=''>{t('app.typeSelector.all')}</div>
                <div className='w-4 h-4 p-[1px]'>
                  <ChevronDown className='w-3.5 h-3.5 text-dark-0' />
                </div>
              </>
            )}
            {value === 'chatbot' && (
              <>
                <div className='w-4 h-4 p-[1px]'>
                  <ChatBot className='w-3.5 h-3.5 text-dark-0' />
                </div>
                <div className=''>{t('app.typeSelector.chatbot')}</div>
                <div className='w-4 h-4 p-[1px]' onClick={(e) => {
                  e.stopPropagation()
                  onChange('')
                }}>
                  <XCircle className='w-3.5 h-3.5 text-dark-0 cursor-pointer  hover:text-dark-0' />
                </div>
              </>
            )}
            {value === 'agent' && (
              <>
                <div className='w-4 h-4 p-[1px]'>
                  <CuteRobote className='w-3.5 h-3.5 text-dark-0' />
                </div>
                <div className=''>{t('app.typeSelector.agent')}</div>
                <div className='w-4 h-4 p-[1px]' onClick={(e) => {
                  e.stopPropagation()
                  onChange('')
                }}>
                  <XCircle className='w-3.5 h-3.5 text-dark-0 cursor-pointer  hover:text-dark-0' />
                </div>
              </>
            )}
            {value === 'workflow' && (
              <>
                <div className='w-4 h-4 p-[1px]'>
                  <Route className='w-3.5 h-3.5 text-dark-0' />
                </div>
                <div className=''>{t('app.typeSelector.workflow')}</div>
                <div className='w-4 h-4 p-[1px]' onClick={(e) => {
                  e.stopPropagation()
                  onChange('')
                }}>
                  <XCircle className='w-3.5 h-3.5 text-dark-0 cursor-pointer  hover:text-dark-0' />
                </div>
              </>
            )}
          </div>
        </PortalToFollowElemTrigger>
        <PortalToFollowElemContent className='z-[1002]'>
          <div className='relative p-1 w-[180px] bg-dark-200 rounded-lg shadow-xl'>
            <div className='flex items-center pl-3 py-[6px] pr-2 rounded-lg cursor-pointer hover:bg-dark-120' onClick={() => {
              onChange('chatbot')
              setOpen(false)
            }}>
              <ChatBot className='mr-2 w-4 h-4 text-[#1570EF]' />
              <div className='grow text-dark-0 text-[13px] font-medium leading-[18px]'>{t('app.typeSelector.chatbot')}</div>
              {value === 'chatbot' && <Check className='w-4 h-4 text-primary-600' />}
            </div>
            <div className='flex items-center pl-3 py-[6px] pr-2 rounded-lg cursor-pointer hover:bg-dark-120' onClick={() => {
              onChange('agent')
              setOpen(false)
            }}>
              <CuteRobote className='mr-2 w-4 h-4 text-indigo-600' />
              <div className='grow text-dark-0 text-[13px] font-medium leading-[18px]'>{t('app.typeSelector.agent')}</div>
              {value === 'agent' && <Check className='w-4 h-4 text-primary-600' />}
            </div>
            <div className='flex items-center pl-3 py-[6px] pr-2 rounded-lg cursor-pointer hover:bg-dark-120' onClick={() => {
              onChange('workflow')
              setOpen(false)
            }}>
              <Route className='mr-2 w-4 h-4 text-[#F79009]' />
              <div className='grow text-dark-0 text-[13px] font-medium leading-[18px]'>{t('app.typeSelector.workflow')}</div>
              {value === 'workflow' && <Check className='w-4 h-4 text-primary-600' />}
            </div>
          </div>
        </PortalToFollowElemContent>
      </div>
    </PortalToFollowElem>
  )
}

export default React.memo(AppTypeSelector)
