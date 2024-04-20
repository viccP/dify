import type { FC } from 'react'
import classNames from 'classnames'

type LogoSiteProps = {
  className?: string
}

const LogoSite: FC<LogoSiteProps> = ({
  className,
}) => {
  return (
    <img
      src='/logo/logo-site-dark.png'
      // className={classNames('block w-auto h-10', className)}
      className={classNames('block ', className)}
      alt='logo'
    />
  )
}

export default LogoSite
