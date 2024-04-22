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
    <div className={`
      flex items-center px-1 h-[18px] rounded-[5px] border border-dark-500 bg-dark-0
      ${className}
      text-[10px] font-medium !text-dark-500
    `}>
      {children}
    </div>
  )
}

export default ModelBadge
