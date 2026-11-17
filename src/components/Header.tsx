import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useLang } from '../i18n'

export default function Header() {
  const { lang, toggle } = useLang()
  return (
    <header className="shrink-0 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3 bg-white border-b border-[#7A5230]/10 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 outline-none">
        <div className="bg-[#2F5D3A] p-1.5 rounded-lg">
          <Icon icon="lucide:leaf" className="text-white text-xl" />
        </div>
        <h1 id="brand-logo" className="text-[#2F5D3A] font-bold text-xl tracking-tight">
          KisanBazar
        </h1>
      </Link>
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          id="lang-toggle"
          aria-label="Toggle language"
          className="text-xs font-semibold bg-[#E0A526]/10 text-[#7A5230] px-3 py-1.5 rounded-full border border-[#E0A526]/30"
        >
          {lang === 'en' ? 'हिन्दी / EN' : 'EN / हिन्दी'}
        </button>
        <button id="menu-btn" aria-label="Menu" className="text-[#2F5D3A] text-2xl flex items-center">
          <Icon icon="lucide:menu" />
        </button>
      </div>
    </header>
  )
}
