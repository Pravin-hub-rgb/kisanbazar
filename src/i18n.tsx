import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type Lang = 'en' | 'hi'

const LangContext = createContext<{ lang: Lang; toggle: () => void }>({
  lang: 'en',
  toggle: () => {},
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const toggle = () => setLang((l) => (l === 'en' ? 'hi' : 'en'))
  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

export function useT() {
  const { lang } = useLang()
  return (en: string, hi: string) => (lang === 'en' ? en : hi)
}

export function Pair({ en, hi, className = 'ml-1' }: { en: string; hi: string; className?: string }) {
  const t = useT()
  return (
    <>
      {t(en, hi)}
      <span className={`hindi-text font-normal opacity-60 ${className}`}>({t(hi, en)})</span>
    </>
  )
}
