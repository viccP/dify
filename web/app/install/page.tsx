import React from 'react'
import classNames from 'classnames'
import Header from '../signin/_header'
import style from '../signin/page.module.css'
import InstallForm from './installForm'

const Install = () => {
  return (
    <div className={classNames(
      style.background,
      'flex w-full min-h-screen',
      'p-4 lg:p-8',
      'gap-x-20',
      'justify-center lg:justify-start',
    )}>
      <div className={
        classNames(
          'flex w-full ml-auto bg-dark-1000 flex-col  shadow shrink-0',
          'md:w-[608px] space-between',
        )
      }>
        <Header />
        <InstallForm />
        <div className='px-8 py-6 text-sm text-center font-normal text-dark-10'>
          © {new Date().getFullYear()} Bonc Lops, Inc. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default Install
