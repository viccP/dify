'use client'

import type { FC } from 'react'
import { useContext } from 'use-context-selector'
import TemplateEn from './template/template.en.mdx'
import TemplateZh from './template/template.zh.mdx'
import I18n from '@/context/i18n'
import { LanguagesSupported } from '@/i18n/language'
import cn from 'classnames'
import style from '../list.module.css'
type DocProps = {
  apiBaseUrl: string
}
const Doc: FC<DocProps> = ({
  apiBaseUrl,
}) => {
  const { locale } = useContext(I18n)
  return (
    <article className={cn('mx-1 px-4 sm:mx-12 pt-16 bg-dark-120 text-dark-0 rounded-t-xl prose prose-xl', style.template)}>
      {
        locale !== LanguagesSupported[1]
          ? <TemplateEn apiBaseUrl={apiBaseUrl} />
          : <TemplateZh apiBaseUrl={apiBaseUrl} />
      }
    </article>
  )
}

export default Doc
