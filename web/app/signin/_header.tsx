'use client'
import React from 'react'
import LogoSite from '@/app/components/base/logo/logo-site'

const Header = () => {
  // if (localStorage?.getItem('console_token'))
  //   localStorage.removeItem('console_token')

  return <div className='flex items-center justify-center p-6 w-full'>
    <LogoSite />
    {/* <Select
      value={locale}
      items={languages.filter(item => item.supported)}
      onChange={(value) => {
        setLocaleOnClient(value as Locale)
      }}
    /> */}

  </div>
}

export default Header
