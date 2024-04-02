'use client'

import { forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CreateAppDialog from '@/app/components/app/create-app-dialog'
import CreateFromDSLModal from '@/app/components/app/create-from-dsl-modal'
import { useProviderContext } from '@/context/provider-context'
import { Plus } from '@/app/components/base/icons/src/vender/line/general'
import { ArrowUpRight } from '@/app/components/base/icons/src/vender/line/arrows'

export type CreateAppCardProps = {
  onSuccess?: () => void
}

// eslint-disable-next-line react/display-name
const CreateAppCard = forwardRef<HTMLAnchorElement, CreateAppCardProps>(({ onSuccess }, ref) => {
  const { t } = useTranslation()
  const { onPlanInfoChanged } = useProviderContext()

  const [showNewAppDialog, setShowNewAppDialog] = useState(false)
  const [showCreateFromDSLModal, setShowCreateFromDSLModal] = useState(false)
  return (
    <a
      ref={ref}
      className='relative col-span-1 flex flex-col justify-between min-h-[160px] bg-gray-200 rounded-xl cursor-pointer duration-200 ease-in-out hover:bg-gray-50 hover:shadow-lg transition-all'
    >
      <div className='grow rounded-t-xl group transition-all hover:bg-white' onClick={() => setShowNewAppDialog(true)}>
        <div className='flex pt-4 px-4 pb-3 h-[66px] items-center gap-3 grow-0 shrink-0'>
          <span className='w-10 h-10 p-3 bg-gray-100 rounded-lg border border-gray-200 group-hover:bg-primary-50 group-hover:border-primary-100'>
            <Plus className='w-4 h-4 text-gray-500 group-hover:text-primary-600'/>
          </span>
          <div className='relative grow h-8 text-sm font-medium leading-8 transition-colors duration-200 ease-in-out group-hover:text-primary-600'>
            {t('app.createApp')}
          </div>
        </div>
      </div>
      <div
        className='flex items-center px-4 py-3 border-t-[0.5px] border-black/[.05] rounded-b-xl text-xs leading-[18px] text-gray-500 transition-all hover:bg-white hover:text-primary-600'
        onClick={() => setShowCreateFromDSLModal(true)}
      >
        {t('app.createFromConfigFile')}
        <ArrowUpRight className='ml-1 w-3 h-3'/>
      </div>
      <CreateFromDSLModal
        show={showCreateFromDSLModal}
        onClose={() => setShowCreateFromDSLModal(false)}
        onSuccess={() => {
          onPlanInfoChanged()
          if (onSuccess)
            onSuccess()
        }}
      />
      <CreateAppDialog
        show={showNewAppDialog}
        onClose={() => setShowNewAppDialog(false)}
        onSuccess={() => {
          onPlanInfoChanged()
          if (onSuccess)
            onSuccess()
        }}
      />
    </a>
  )
})

export default CreateAppCard
