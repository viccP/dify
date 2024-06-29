import classNames from 'classnames'
import type { FC, ReactNode } from 'react'

type ModelBadgeProps = {
  className?: string
  children?: ReactNode
}
const ModelBadge: FC<ModelBadgeProps> = ({
  className,
  children,
}) => {
  return (
    <div className={classNames(
      'flex items-center px-1 h-[18px] rounded-[5px] border border-dark-500 border-black/8 text-[10px] font-medium text-dark-500 cursor-default',
      className,
    )}>
      {children}
    </div>
  )
}

export default ModelBadge
